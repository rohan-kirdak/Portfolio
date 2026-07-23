import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const inquiryId = parseInt(id, 10)
    if (isNaN(inquiryId)) {
      return NextResponse.json({ error: 'Invalid inquiry ID' }, { status: 400 })
    }

    const body = await request.json()
    const { read } = body

    const updated = await prisma.inquiry.update({
      where: { id: inquiryId },
      data: { read: Boolean(read) },
    })

    return NextResponse.json(updated)
  } catch (error: any) {
    console.error('Update inquiry status error:', error)
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const inquiryId = parseInt(id, 10)
    if (isNaN(inquiryId)) {
      return NextResponse.json({ error: 'Invalid inquiry ID' }, { status: 400 })
    }

    await prisma.inquiry.delete({
      where: { id: inquiryId },
    })

    return NextResponse.json({ success: true, message: 'Inquiry deleted' })
  } catch (error: any) {
    console.error('Delete inquiry error:', error)
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 })
  }
}
