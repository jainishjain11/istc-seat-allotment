import { NextRequest, NextResponse } from 'next/server'

const ADMIN_EMAIL = 'admin@istc.in'
const ADMIN_PASSWORD = 'admin123'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true })

    // ✅ Set cookie using response.cookies.set
    response.cookies.set('admin-auth-token', 'valid-admin-session', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    })

    return response
  } else {
    return new NextResponse('Invalid credentials', { status: 401 })
  }
}
