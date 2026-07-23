import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { isAdminAuthenticated } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const type = formData.get('type') as string | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    let publicUrl = ''

    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
      await fs.mkdir(uploadsDir, { recursive: true })

      if (type === 'resume' || file.name.endsWith('.pdf')) {
        const resumePath = path.join(process.cwd(), 'public', 'resume.pdf')
        await fs.writeFile(resumePath, buffer)
        publicUrl = '/resume.pdf'
      } else {
        const ext = path.extname(file.name) || '.png'
        const sanitizedBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_')
        const fileName = `${sanitizedBase}_${Date.now()}${ext}`
        const filePath = path.join(uploadsDir, fileName)
        await fs.writeFile(filePath, buffer)
        publicUrl = `/uploads/${fileName}`
      }
    } catch (fsError) {
      // Fallback for Vercel read-only serverless filesystem
      console.warn('Read-only filesystem detected, converting to Base64 data URL:', fsError)
      const mimeType = file.type || 'image/png'
      const base64 = buffer.toString('base64')
      publicUrl = `data:${mimeType};base64,${base64}`
    }

    return NextResponse.json({ success: true, url: publicUrl })
  } catch (error: any) {
    console.error('File upload error:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
