// src/app/api/admin/export/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const allocations = await prisma.allocation.findMany({
      include: { candidate: true },
    });

    // Prepare CSV header
    const header = "Name,Email,Category,Exam Rank,Course ID,Status\n";

    // Prepare rows
    const rows = allocations.map((alloc) => {
      const candidate = alloc.candidate;
      return [
        candidate.name,
        candidate.email,
        candidate.category,
        candidate.examRank,
        alloc.courseId,
        alloc.status,
      ]
        .map((field) => `"${field}"`) // Wrap fields in quotes to avoid commas breaking CSV
        .join(",");
    });

    const csv = header + rows.join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="allocations.csv"',
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
