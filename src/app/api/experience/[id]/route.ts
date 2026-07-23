import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const expId = parseInt(id, 10)
    if (isNaN(expId)) {
      return NextResponse.json({ error: 'Invalid experience ID' }, { status: 400 })
    }

    const body = await request.json()
    const { type, company, position, duration, description, icon, order } = body

    const updated = await prisma.experience.update({
      where: { id: expId },
      data: {
        type,
        company,
        position,
        duration,
        description,
        icon,
        order: order !== undefined ? Number(order) : undefined,
      },
    })

    return NextResponse.json(updated)
  } catch (error: any) {
    console.error('Update experience error:', error)
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 })
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
    const expId = parseInt(id, 10)
    if (isNaN(expId)) {
      return NextResponse.json({ error: 'Invalid experience ID' }, { status: 400 })
    }

    await prisma.experience.delete({
      where: { id: expId },
    })

    return NextResponse.json({ success: true, message: 'Experience entry deleted' })
  } catch (error: any) {
    console.error('Delete experience error:', error)
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 })
  }
}
