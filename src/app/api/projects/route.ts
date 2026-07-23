import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
    })

    const parsedProjects = projects.map((p) => ({
      ...p,
      features: p.features ? JSON.parse(p.features) : [],
      technologies: p.technologies ? JSON.parse(p.technologies) : [],
      tech: p.technologies ? JSON.parse(p.technologies) : [], // Alias for compatibility
    }))

    return NextResponse.json(parsedProjects)
  } catch (error: any) {
    console.error('Fetch projects error:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, features, technologies, image, github, live, featured, order } = body

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 })
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        features: Array.isArray(features) ? JSON.stringify(features) : JSON.stringify([]),
        technologies: Array.isArray(technologies) ? JSON.stringify(technologies) : JSON.stringify([]),
        image: image || '/projects/default.png',
        github: github || '',
        live: live || '',
        featured: Boolean(featured),
        order: order ? Number(order) : 0,
      },
    })

    return NextResponse.json({
      ...newProject,
      features: JSON.parse(newProject.features),
      technologies: JSON.parse(newProject.technologies),
      tech: JSON.parse(newProject.technologies),
    })
  } catch (error: any) {
    console.error('Create project error:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
