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

  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  const validSortFields = ["title", "description", "createdAt"];
  const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const condition: any = {
    OR: [
      { title: { contains: searchQuery, mode: "insensitive" } },
      { description: { contains: searchQuery, mode: "insensitive" } },
    ],
  };
  // 2024-09-25T11:59:23.039Z
  if (startDate && endDate) {
    condition.createdAt = {
      gte: new Date(startDate),
      lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)),
    };
  } else if (startDate) {
    condition.createdAt = { gte: new Date(startDate) };
  } else if (endDate) {
    condition.createdAt = {
      lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)),
    };
  }

  const events = await prisma.eventList.findMany({
    where: condition,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { [sortField]: sortOrder },
  });

  const totalEvents = await prisma.eventList.count({
    where: condition,
  });

  return NextResponse.json({
    events,
    totalPages: Math.ceil(totalEvents / pageSize),
    currentPage: page,
  });
}
