import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { hashPassword, createSessionToken, COOKIE_NAME } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 })
    }

    const admin = await prisma.adminUser.findFirst()
    if (!admin) {
      return NextResponse.json({ error: 'No admin user configured' }, { status: 500 })
    }

    const hashedInput = hashPassword(password)

    // Match username and hashed password
    if (username !== admin.username || hashedInput !== admin.password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = createSessionToken(admin.username)
    const response = NextResponse.json({ success: true, message: 'Login successful' })

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
