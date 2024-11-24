import { NextRequest, NextResponse } from "next/server";
import { SHA256 as sha256 } from "crypto-js";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const hashPassword = (string: string): string => {
  return sha256(string).toString();
};

export async function POST(req: NextRequest) {
  if (req.headers.get("Content-Type") !== "application/json") {
    return NextResponse.json(
      { message: "Invalid Content-Type. Expected application/json" },
      { status: 400 }
    );
  }

  let body: { name: string; email: string; password: string };
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { errors: ["Password length should be more than 6 characters"] },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashPassword(password),
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json(
          { message: "A user with this email already exists" },
          { status: 400 }
        );
      }
    }
    console.error("Unexpected Error:", e);
    return NextResponse.json(
      { message: "An error occurred while creating the user" },
      { status: 500 }
    );
  }
}
