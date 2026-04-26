import { NextRequest, NextResponse } from 'next/server'
import { readJson, writeJson } from '@/lib/blob'
import { isAuthenticated } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

const VALID_COLLECTIONS = ['team', 'clients', 'blog', 'faq', 'offices', 'partners'] as const
type Collection = (typeof VALID_COLLECTIONS)[number]

function blobPath(collection: Collection): string {
  return `njg/data/${collection}.json`
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { collection } = await params
  if (!VALID_COLLECTIONS.includes(collection as Collection)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  const data = await readJson(blobPath(collection as Collection))
  return NextResponse.json(data ?? [])
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { collection } = await params
  if (!VALID_COLLECTIONS.includes(collection as Collection)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  const data = await req.json()
  await writeJson(blobPath(collection as Collection), data)
  revalidatePath('/', 'layout')
  return NextResponse.json({ ok: true })
}
