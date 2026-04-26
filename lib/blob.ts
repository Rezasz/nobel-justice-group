/* eslint-disable @typescript-eslint/no-explicit-any */

import { put } from '@vercel/blob'

export async function readJson<T>(pathname: string): Promise<T | null> {
  const baseUrl = process.env.BLOB_BASE_URL
  if (!baseUrl) return null
  try {
    const res = await fetch(`${baseUrl}/${pathname}`, {
      next: { revalidate: 60 },
    } as any)
    if (!res.ok) return null
    return res.json() as Promise<T>
  } catch {
    return null
  }
}

export async function writeJson<T>(pathname: string, data: T): Promise<void> {
  await put(pathname, JSON.stringify(data), {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json',
  })
}
