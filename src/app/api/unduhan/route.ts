import { PrismaClient } from "@prisma/client";
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

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = (formData.get("name") as string) || null;
  const file = (formData.get("file") as File) || null;

  if (!file) {
    return NextResponse.json({ error: "File is required." }, { status: 400 });
  }

  // Tentukan tipe MIME file
  const fileType = mime.getType(file.name) || "application/octet-stream";

  // Upload file ke Cloudinary
  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadStream = () =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "raw" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });

  try {
    // Menunggu hasil upload stream ke Cloudinary
    const result = (await uploadStream()) as any;

    // Pastikan file URL yang diterima adalah URL yang valid
    if (!result?.secure_url) {
      throw new Error("Failed to get a valid URL from Cloudinary.");
    }

    const fileUrl = result.secure_url; // Ambil URL yang benar dari hasil upload

    // Simpan URL file dan nama ke database
    const createdFile = await prisma.download.create({
      data: {
        file: fileUrl, // Menyimpan URL Cloudinary yang valid
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
    return NextResponse.json(
      { error: "ID is required to delete the file." },
      { status: 400 }
    );
  }

  try {
    // Cari file berdasarkan ID di database
    const fileToDelete = await prisma.download.findUnique({
      where: { id },
    });

    if (!fileToDelete || !fileToDelete.file) {
      return NextResponse.json(
        { error: "File not found in the database." },
        { status: 404 }
      );
    }

    // Hapus file dari Cloudinary jika file tersebut ada di Cloudinary
    const publicId = fileToDelete.file.split("/").pop()?.split(".")[0]; // Ambil public ID dari URL

    if (publicId) {
      await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
    }

    // Hapus data file dari database
    await prisma.download.delete({
      where: { id },
    });

    return NextResponse.json({ message: "File successfully deleted." });
  } catch (e) {
    console.error("Error while deleting the file:", e);
    return NextResponse.json(
      { error: "Failed to delete file." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const formData = await req.formData();
  const name = (formData.get("name") as string) || null;
  const file = formData.get("file") as File | null;

  if (!id) {
    return NextResponse.json(
      { error: "ID is required to update the file." },
      { status: 400 }
    );
  }

  try {
    // Cari file berdasarkan ID di database
    const fileToUpdate = await prisma.download.findUnique({
      where: { id },
    });

    if (!fileToUpdate) {
      return NextResponse.json({ error: "File not found." }, { status: 404 });
    }

    let fileUrl = fileToUpdate.file;

    // Jika file baru diupload, unggah ke Cloudinary dan dapatkan URL baru
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadStream = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "raw" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          streamifier.createReadStream(buffer).pipe(stream);
        });

      const result = (await uploadStream()) as any;

      if (!result?.secure_url) {
        throw new Error("Failed to upload file to Cloudinary.");
      }

      fileUrl = result.secure_url; // URL baru yang didapatkan dari Cloudinary
    }

    // Perbarui data file di database
    const updatedFile = await prisma.download.update({
      where: { id },
      data: {
        file: fileUrl, // URL file yang baru
        name, // Nama baru jika ada
      },
    });

    return NextResponse.json({ file: updatedFile });
  } catch (e) {
    console.error("Error while updating the file:", e);
    return NextResponse.json(
      { error: "Failed to update file." },
      { status: 500 }
    );
  }
}
