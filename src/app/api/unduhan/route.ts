import { PrismaClient } from "@prisma/client";

import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Fungsi POST untuk menangani upload file
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = (formData.get("name") as string) || null;
  const file = (formData.get("file") as File) || null;

  if (!file) {
    return NextResponse.json({ error: "File is required." }, { status: 400 });
  }

  // Mengubah file menjadi buffer untuk diupload ke Cloudinary
  const buffer = Buffer.from(await file.arrayBuffer());

  // Fungsi untuk mengupload ke Cloudinary
  const uploadStream = () =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" }, // 'auto' akan menangani berbagai jenis file (gambar, PDF, dll)
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });

  try {
    const result = (await uploadStream()) as any;
    const fileUrl = result.secure_url; // Mendapatkan URL aman dari Cloudinary

    // Simpan URL file dan nama ke database
    const createdFile = await prisma.download.create({
      data: {
        file: fileUrl,
        name,
      },
    });

    return NextResponse.json({ file: createdFile });
  } catch (e) {
    console.error("Error while uploading to Cloudinary:", e);
    return NextResponse.json(
      { error: "Something went wrong while uploading the file." },
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
