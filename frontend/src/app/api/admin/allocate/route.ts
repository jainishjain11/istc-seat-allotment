// src/app/api/admin/allocate/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Step 1: Get all eligible candidates
    const candidates = await prisma.candidate.findMany({
      where: { eligible: true },
      orderBy: { examRank: "asc" },
      include: { preferences: true },
    });

    // Step 2: Track filled seats per courseId
    const seatLimits: Record<string, number> = {
      "Mechanical Engineering (Tool & Die)": 60,
      "Electronics Engineering": 60,
      "Die & Mould Making": 30,
      "Mechatronics & Industrial Automation": 30,
    };

    const allocatedSeats: Record<string, number> = {
      "Mechanical Engineering (Tool & Die)": 0,
      "Electronics Engineering": 0,
      "Die & Mould Making": 0,
      "Mechatronics & Industrial Automation": 0,
    };

    // Step 3: Allocate
    for (const candidate of candidates) {
      const sortedPrefs = candidate.preferences.sort((a, b) => a.priority - b.priority);
      for (const pref of sortedPrefs) {
        const course = pref.courseId;
        if (allocatedSeats[course] < seatLimits[course]) {
          await prisma.allocation.upsert({
            where: { candidateId: candidate.id },
            update: { courseId: course, status: "Tentative" }, // ✅ Fixed
            create: {
              candidateId: candidate.id,
              courseId: course,  // ✅ Fixed
              status: "Tentative",
            },
          });

          allocatedSeats[course]++;
          break; // stop once allocated
        }
      }
    }

    return NextResponse.json({ message: "Seat allocation completed." });
  } catch (error) {
    console.error("Error during allocation:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
