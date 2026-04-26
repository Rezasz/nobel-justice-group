import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

function getSecret(): string {
  const secret = process.env.ADMIN_JWT_SECRET
  if (!secret) throw new Error('ADMIN_JWT_SECRET env var is not set')
  return secret
}

export function signAdminToken(): string {
  return jwt.sign({ admin: true }, getSecret(), { expiresIn: '7d' })
}

export function verifyAdminToken(token: string): boolean {
  try {
    const payload = jwt.verify(token, getSecret()) as { admin?: boolean }
    return payload.admin === true
  } catch {
    return false
  }
}

export function isAuthenticated(req: NextRequest): boolean {
  const token = req.cookies.get('admin_session')?.value
  if (!token) return false
  return verifyAdminToken(token)
}
