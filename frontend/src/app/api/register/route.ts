import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password, dob, category, examRank } = body;

  const hash = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.candidate.create({
      data: {
        name,
        email,
        password: hash,
        dob: new Date(dob),
        category,
        examRank: parseInt(examRank),
        eligible: true,
      },
    });
    return NextResponse.json({ message: 'Registration successful', user });
  } catch (e) {
    return NextResponse.json({ message: 'Email already registered or error', error: e }, { status: 500 });
  }
}
