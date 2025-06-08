import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' })

  // 🧹 Clear the cookie by setting it to blank and maxAge to 0
  response.cookies.set('admin-auth-token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  })

  return response
}
