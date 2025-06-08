import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const candidates = await prisma.candidate.findMany({
      include: {
        preferences: {
          select: {
            courseId: true
          }
        }
      }
    })

    const formatted = candidates.map(c => ({
      id: c.id,
      name: c.name,
      email: c.email,
      preferences: c.preferences.map(p => p.courseId)
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    console.error('Error fetching candidates:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
