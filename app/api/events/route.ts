import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = 12;
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";
  const searchQuery = searchParams.get("search") || "";

  const validSortFields = ["title", "description", "createdAt"];
  const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";

  const events = await prisma.eventList.findMany({
    where: {
      OR: [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
      ],
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { [sortField]: sortOrder },
  });

  const totalEvents = await prisma.eventList.count({
    where: {
      OR: [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
      ],
    },
  });

  return NextResponse.json({
    events,
    totalPages: Math.ceil(totalEvents / pageSize),
    currentPage: page,
  });
}
