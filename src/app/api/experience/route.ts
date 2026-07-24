import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'
import { experience as staticExperience } from '@/data/portfolio'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: 'asc' },
    }).catch(() => [])

    if (!experiences || experiences.length === 0) {
      return NextResponse.json(staticExperience, {
        headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
      })
    }

    return NextResponse.json(experiences, {
      headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
    })
  } catch (error: any) {
    console.error('Fetch experience error:', error)
    return NextResponse.json(staticExperience, {
      headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
    })
  }
}

export async function POST(request: Request) {
  try {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { type, company, position, duration, description, icon, order } = body

    if (!company || !position) {
      return NextResponse.json({ error: 'Company and position required' }, { status: 400 })
    }

    const newExp = await prisma.experience.create({
      data: {
        type: type || 'Internship',
        company,
        position,
        duration: duration || '',
        description: description || '',
        icon: icon || '💼',
        order: order ? Number(order) : 0,
      },
    })

    return NextResponse.json(newExp)
  } catch (error: any) {
    console.error('Create experience error:', error)
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
  }
}
