import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const defaultProfile = {
  id: 1,
  name: 'Rohan Kirdak',
  tagline: 'Full Stack MERN Developer',
  bio: 'Full Stack MERN & Next.js Developer passionate about crafting modern, scalable, and responsive web applications with rich user experiences.',
  yearsExp: '1.5+',
  projectsCount: '8+',
  contributionsCount: '200+',
  techCount: '20+',
  resumeUrl: '/resume.pdf',
  updatedAt: new Date(),
}

export async function GET() {
  try {
    let profile = await prisma.heroProfile.findUnique({
      where: { id: 1 },
    }).catch(() => null)

    if (!profile) {
      profile = defaultProfile
    }

    return NextResponse.json(profile, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    })
  } catch (error: any) {
    console.error('Fetch profile error:', error)
    return NextResponse.json(defaultProfile, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    })
  }
}

export async function PUT(request: Request) {
  try {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, tagline, bio, yearsExp, projectsCount, contributionsCount, techCount, resumeUrl } = body

    const updatedProfile = await prisma.heroProfile.upsert({
      where: { id: 1 },
      update: {
        name,
        tagline,
        bio,
        yearsExp,
        projectsCount,
        contributionsCount,
        techCount,
        resumeUrl,
      },
      create: {
        id: 1,
        name: name || 'Rohan Kirdak',
        tagline: tagline || 'Full Stack MERN Developer',
        bio: bio || '',
        yearsExp: yearsExp || '1.5+',
        projectsCount: projectsCount || '8+',
        contributionsCount: contributionsCount || '200+',
        techCount: techCount || '20+',
        resumeUrl: resumeUrl || '/resume.pdf',
      },
    }).catch(() => ({
      ...defaultProfile,
      ...body,
    }))

    return NextResponse.json(updatedProfile, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    })
  } catch (error: any) {
    console.error('Update profile error:', error)
    return NextResponse.json(defaultProfile)
  }
}
