import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  try {
    let profile = await prisma.heroProfile.findUnique({
      where: { id: 1 },
    })

    if (!profile) {
      profile = await prisma.heroProfile.create({
        data: {
          id: 1,
          name: 'Rohan Kirdak',
          tagline: 'Full Stack MERN Developer',
          bio: 'Full Stack MERN & Next.js Developer passionate about crafting modern, scalable, and responsive web applications.',
          yearsExp: '1.5+',
          projectsCount: '8+',
          contributionsCount: '200+',
          techCount: '20+',
          resumeUrl: '/resume.pdf',
        },
      })
    }

    return NextResponse.json(profile)
  } catch (error: any) {
    console.error('Fetch profile error:', error)
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
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
    })

    return NextResponse.json(updatedProfile)
  } catch (error: any) {
    console.error('Update profile error:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
