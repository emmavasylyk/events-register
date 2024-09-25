import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { fullName, email, dateOfBirth, source, eventId } = data;

    const newUser = await prisma.userList.create({
      data: {
        name: fullName,
        email: email,
        dateOfBirth: dateOfBirth,
        source: source,
        eventId: eventId,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ message: "User created successfully", newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
