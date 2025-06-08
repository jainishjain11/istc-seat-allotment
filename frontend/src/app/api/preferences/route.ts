import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { preferences } = await request.json();

    // TODO: Replace this with authenticated candidate ID from session/auth
    const candidateId = 1;

    if (!preferences || !Array.isArray(preferences) || preferences.length !== 4) {
      return NextResponse.json(
        { message: "Invalid preferences data" },
        { status: 400 }
      );
    }

    // Save or update preferences for candidate
    // For simplicity, assume one preference record per candidate

    // Delete old preferences if any (optional)
    await prisma.preference.deleteMany({
      where: { candidateId },
    });

    // Save new preferences with priority (1 to 4)
    for (let i = 0; i < preferences.length; i++) {
  console.log("Preference being saved:", {
    candidateId,
    courseId: preferences[i],
    priority: i + 1,
    typeOfCourseId: typeof preferences[i]
  });

  await prisma.preference.create({
    data: {
      candidateId,
      courseId: preferences[i],
      priority: i + 1,
    },
  });
}
    return NextResponse.json({ message: "Preferences saved" });
  } catch (error) {
    console.error("Error saving preferences:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
