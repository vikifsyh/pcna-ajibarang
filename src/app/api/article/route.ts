import { PrismaClient } from "@prisma/client";

import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const title = (formData.get("title") as string) || null;
  const content = (formData.get("content") as string) || null;
  const image = (formData.get("image") as File) || null;

  const buffer = Buffer.from(await image.arrayBuffer());
  const relativeUploadDir = `/uploads/${new Date(Date.now())
    .toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-")}`;

  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      // This is for checking the directory is exist (ENOENT : Error No Entry)
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${image.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    const fileUrl = `${relativeUploadDir}/${filename}`;

    // Save to database
    const result = await prisma.article.create({
      data: {
        title,
        content,
        image: fileUrl,
      },
    });

    return NextResponse.json({ user: result });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      // Get single article by ID
      const article = await prisma.article.findUnique({
        where: { id }, // id tetap dalam bentuk string
      });

      if (!article) {
        return NextResponse.json(
          { error: "Article not found." },
          { status: 404 }
        );
      }

      return NextResponse.json({ article });
    }

    // Get all articles
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ articles });
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
    const paslon = await prisma.article.delete({
      where: { id }, // Convert id to a number if necessary
    });
    return NextResponse.json({
      message: "Article deleted successfully",
      paslon,
    });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { error: "Failed to delete Article." },
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

  // If a new image is provided, process the image
  if (image) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const relativeUploadDir = `/uploads/${new Date(Date.now())
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")}`;

    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(
          "Error while trying to create directory when uploading a file\n",
          e
        );
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
    }

    try {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${image.name.replace(
        /\.[^/.]+$/,
        ""
      )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
      imageUrl = `${relativeUploadDir}/${filename}`;
    } catch (e) {
      console.error("Error while trying to upload a file\n", e);
      return NextResponse.json(
        { error: "Something went wrong while uploading the image." },
        { status: 500 }
      );
    }
  }

  try {
    // Update the article in the database
    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        title: title || undefined,
        content: content || undefined,
        image: imageUrl || undefined, // If no image, it remains the same
      },
    });

    return NextResponse.json({
      message: "Article updated successfully",
      article: updatedArticle,
    });
  } catch (error) {
    console.error("Error while updating the article:", error);
    return NextResponse.json(
      { error: "Failed to update the article." },
      { status: 500 }
    );
  }
}
