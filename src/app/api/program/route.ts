import { PrismaClient } from "@prisma/client";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import _ from "lodash";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await image.arrayBuffer());

    const uploadStream = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "proker", // Folder di Cloudinary
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });

    const result = (await uploadStream()) as any;

    if (!result || !result.secure_url) {
      console.error("Cloudinary upload failed:", result);
      return NextResponse.json(
        { error: "Image upload failed" },
        { status: 500 }
      );
    }

    const fileUrl = result.secure_url;
    console.log("Uploaded image URL:", fileUrl);

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    const article = await prisma.programKerja.create({
      data: {
        title,
        content,
        image: fileUrl,
      },
    });

    return NextResponse.json({ article });
  } catch (error) {
    console.error("Error while uploading the image", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const article = await prisma.programKerja.findUnique({
        where: { id },
      });

      console.log("Single article fetched:", article); // Tambahkan log

      if (!article) {
        return NextResponse.json(
          { error: "Article not found." },
          { status: 404 }
        );
      }

      return NextResponse.json({ article });
    }

    const proker = await prisma.programKerja.findMany({
      orderBy: { createdAt: "desc" },
    });

    console.log("All articles fetched:", proker); // Tambahkan log

    return NextResponse.json({ proker });
  } catch (e) {
    console.error("Error while trying to fetch articles\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url); // Create a URL object from the request URL
  const id = searchParams.get("id"); // Get the 'id' parameter from the query string

  if (!id) {
    return NextResponse.json(
      { error: "ID must be provided." },
      { status: 400 }
    );
  }

  try {
    const proker = await prisma.programKerja.delete({
      where: { id }, // Convert id to a number if necessary
    });
    return NextResponse.json({
      message: "Program deleted successfully",
      proker,
    });
  } catch (error) {
    console.error("Error deleting program:", error);
    return NextResponse.json(
      { error: "Failed to delete Program." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID must be provided." },
      { status: 400 }
    );
  }

  const formData = await req.formData();
  const title = (formData.get("title") as string) || null;
  const content = (formData.get("content") as string) || null;
  const image = (formData.get("image") as File) || null;

  let imageUrl: string | null = null;

  // Jika ada gambar baru, upload ke Cloudinary
  if (image) {
    const buffer = Buffer.from(await image.arrayBuffer());

    // Upload ke Cloudinary
    const uploadStream = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });

    try {
      const result = (await uploadStream()) as any;
      imageUrl = result.secure_url; // Ambil URL gambar dari Cloudinary
    } catch (e) {
      console.error("Error while uploading to Cloudinary:", e);
      return NextResponse.json(
        {
          error:
            "Something went wrong while uploading the image to Cloudinary.",
        },
        { status: 500 }
      );
    }
  }

  // Update artikel dengan gambar baru
  try {
    const updatedProgram = await prisma.programKerja.update({
      where: { id },
      data: {
        title: title || undefined,
        content: content || undefined,
        image: imageUrl || undefined, // Gunakan URL gambar dari Cloudinary
      },
    });

    return NextResponse.json({
      message: "Program updated successfully",
      article: updatedProgram,
    });
  } catch (error) {
    console.error("Error while updating the program:", error);
    return NextResponse.json(
      { error: "Failed to update the program." },
      { status: 500 }
    );
  }
}
