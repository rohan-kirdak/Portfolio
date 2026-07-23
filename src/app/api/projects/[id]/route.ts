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
    const projectId = parseInt(id, 10)
    if (isNaN(projectId)) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
    }

    const body = await request.json()
    const { title, description, features, technologies, image, github, live, featured, order } = body

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        title,
        description,
        features: Array.isArray(features) ? JSON.stringify(features) : features,
        technologies: Array.isArray(technologies) ? JSON.stringify(technologies) : technologies,
        image,
        github,
        live,
        featured: Boolean(featured),
        order: order !== undefined ? Number(order) : undefined,
      },
    })

    return NextResponse.json({
      ...updatedProject,
      features: JSON.parse(updatedProject.features),
      technologies: JSON.parse(updatedProject.technologies),
      tech: JSON.parse(updatedProject.technologies),
    })
  } catch (error: any) {
    console.error('Update project error:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
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
    const projectId = parseInt(id, 10)
    if (isNaN(projectId)) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
    }

    await prisma.project.delete({
      where: { id: projectId },
    })

    return NextResponse.json({ success: true, message: 'Project deleted' })
  } catch (error: any) {
    console.error('Delete project error:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
