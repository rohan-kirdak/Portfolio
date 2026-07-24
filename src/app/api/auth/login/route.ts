import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { hashPassword, createSessionToken, COOKIE_NAME } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 })
    }

    const expectedUsername = process.env.ADMIN_USERNAME || 'admin'
    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123'

    let isValid = false
    let adminName = username

    try {
      let admin = await prisma.adminUser.findFirst()
      
      if (!admin) {
        // Auto-initialize admin user if missing
        const hashedDefault = hashPassword(expectedPassword)
        admin = await prisma.adminUser.create({
          data: { id: 1, username: expectedUsername, password: hashedDefault }
        }).catch(() => null)
      }

      if (admin) {
        const hashedInput = hashPassword(password)
        if (username === admin.username && hashedInput === admin.password) {
          isValid = true
          adminName = admin.username
        }
      }
    } catch (dbError) {
      console.warn('DB check fallback:', dbError)
    }

    // Direct Env/Default Fallback check (for Vercel serverless deployment guarantee)
    if (!isValid) {
      if (username === expectedUsername && password === expectedPassword) {
        isValid = true
        adminName = expectedUsername
      }
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = createSessionToken(adminName)
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
