import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { mkdir, writeFile, stat } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import mime from "mime";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UPLOAD_DIR = join(process.cwd(), "uploads"); // Direktori penyimpanan file lokal

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = (formData.get("name") as string) || null;
  const file = (formData.get("file") as File) || null;

  if (!file) {
    return NextResponse.json({ error: "File is required." }, { status: 400 });
  }

  // Tentukan tipe MIME file
  const fileType = mime.getType(file.name) || "application/octet-stream";

  if (fileType === "application/pdf") {
    try {
      // Pastikan direktori upload tersedia
      try {
        await stat(UPLOAD_DIR);
      } catch {
        await mkdir(UPLOAD_DIR, { recursive: true });
      }

      const filePath = join(UPLOAD_DIR, file.name);
      const buffer = Buffer.from(await file.arrayBuffer());

      // Simpan file PDF ke lokal
      await writeFile(filePath, buffer);

      // Simpan informasi file ke database
      const createdFile = await prisma.download.create({
        data: {
          file: filePath, // Path lokal
          name,
        },
      });

      return NextResponse.json({ file: createdFile });
    } catch (e) {
      console.error("Error while saving PDF locally:", e);
      return NextResponse.json(
        { error: "Failed to save PDF file locally." },
        { status: 500 }
      );
    }
  } else {
    // Jika bukan PDF, upload ke Cloudinary
    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadStream = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });

    try {
      const result = (await uploadStream()) as any;
      const fileUrl = result.secure_url;

      // Simpan URL file dan nama ke database
      const createdFile = await prisma.download.create({
        data: {
          file: fileUrl, // URL Cloudinary
          name,
        },
      });

      return NextResponse.json({ file: createdFile });
    } catch (e) {
      console.error("Error while uploading to Cloudinary:", e);
      return NextResponse.json(
        { error: "Failed to upload file to Cloudinary." },
        { status: 500 }
      );
    }
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const download = await prisma.download.findUnique({
        where: { id },
      });

      if (!download) {
        return NextResponse.json(
          { error: "Article not found." },
          { status: 404 }
        );
      }

      return NextResponse.json({ download });
    }

    const downloads = await prisma.download.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ downloads });
  } catch (e) {
    console.error("Error while trying to fetch downloads\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required." }, { status: 400 });
  }

  try {
    // Cari data berdasarkan ID di database
    const fileRecord = await prisma.download.findUnique({
      where: { id },
    });

    if (!fileRecord) {
      return NextResponse.json({ error: "File not found." }, { status: 404 });
    }

    // Pengecekan jika fileRecord.file tidak ada atau null
    if (!fileRecord.file) {
      return NextResponse.json(
        { error: "File URL is missing in the record." },
        { status: 400 }
      );
    }

    // Ambil public_id dari Cloudinary yang ada di database
    const filePublicId = fileRecord.file.split("/").pop()?.split(".")[0]; // Ambil public_id dari URL

    if (filePublicId) {
      // Hapus file dari Cloudinary
      await cloudinary.uploader.destroy(filePublicId);

      // Hapus data dari database
      await prisma.download.delete({
        where: { id },
      });

      return NextResponse.json({
        message: "File and record deleted successfully.",
      });
    } else {
      return NextResponse.json(
        { error: "Invalid file format or missing public_id." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error while deleting the file:", error);
    return NextResponse.json(
      { error: "Failed to delete the file." },
      { status: 500 }
    );
  }
}
