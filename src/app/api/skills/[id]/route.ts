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
    const skillId = parseInt(id, 10)
    if (isNaN(skillId)) {
      return NextResponse.json({ error: 'Invalid skill ID' }, { status: 400 })
    }

    const body = await request.json()
    const { name, category, level, icon, order } = body

    const updatedSkill = await prisma.skill.update({
      where: { id: skillId },
      data: {
        name,
        category,
        level,
        icon,
        order: order !== undefined ? Number(order) : undefined,
      },
    })

    return NextResponse.json(updatedSkill)
  } catch (error: any) {
    console.error('Update skill error:', error)
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 })
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
    const skillId = parseInt(id, 10)
    if (isNaN(skillId)) {
      return NextResponse.json({ error: 'Invalid skill ID' }, { status: 400 })
    }

    await prisma.skill.delete({
      where: { id: skillId },
    })

    return NextResponse.json({ success: true, message: 'Skill deleted' })
  } catch (error: any) {
    console.error('Delete skill error:', error)
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 })
  }
}
