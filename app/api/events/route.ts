import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = 12;

  const events = await prisma.eventList.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: "desc" },
  });

  const totalEvents = await prisma.eventList.count();

  return NextResponse.json({
    events,
    totalPages: Math.ceil(totalEvents / pageSize),
    currentPage: page,
  });
}
