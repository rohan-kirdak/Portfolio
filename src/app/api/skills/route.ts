import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'
import { skills as staticSkills } from '@/data/portfolio'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { order: 'asc' },
    }).catch(() => [])

    if (!skills || skills.length === 0) {
      return NextResponse.json({ grouped: staticSkills, skills: [] }, {
        headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
      })
    }

    const grouped: Record<string, string[]> = {}
    skills.forEach((s) => {
      if (!grouped[s.category]) {
        grouped[s.category] = []
      }
      grouped[s.category].push(s.name)
    })

    return NextResponse.json({ grouped, skills }, {
      headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
    })
  } catch (error: any) {
    console.error('Fetch skills error:', error)
    return NextResponse.json({ grouped: staticSkills, skills: [] }, {
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
    const { name, category, level, icon, order } = body

    if (!name || !category) {
      return NextResponse.json({ error: 'Name and Category are required' }, { status: 400 })
    }

    const newSkill = await prisma.skill.create({
      data: {
        name,
        category,
        level: level || 'Advanced',
        icon: icon || null,
        order: order ? Number(order) : 0,
      },
    })

    return NextResponse.json(newSkill)
  } catch (error: any) {
    console.error('Create skill error:', error)
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 })
  }
}
