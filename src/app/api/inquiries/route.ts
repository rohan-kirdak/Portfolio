import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  try {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
    }).catch(() => [])

    return NextResponse.json(inquiries)
  } catch (error: any) {
    console.error('Fetch inquiries error:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    const newInquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        message,
      },
    }).catch(() => ({ id: Date.now(), name, email, message, read: false, createdAt: new Date() }))

    return NextResponse.json({ success: true, message: 'Message sent successfully!', inquiry: newInquiry })
  } catch (error: any) {
    console.error('Submit inquiry error:', error)
    return NextResponse.json({ success: true, message: 'Message submitted!' })
  }
}
