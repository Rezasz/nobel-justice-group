import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { isAuthenticated } from '@/lib/auth'

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const form = await req.formData()
  const file = form.get('file') as File | null
  const rawFolder = (form.get('folder') as string | null) ?? 'misc'
  const folder = rawFolder.replace(/[^a-zA-Z0-9_-]/g, '-')

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF' }, { status: 400 })
  }

  const timestamp = Date.now()
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase()
  const pathname = `njg/images/${folder}/${timestamp}-${safeName}`

  const blob = await put(pathname, file, {
    access: 'public',
    addRandomSuffix: false,
  })

  return NextResponse.json({ url: blob.url })
}
