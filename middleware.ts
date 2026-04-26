import { NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { verifyAdminToken } from './lib/auth'

const intlMiddleware = createIntlMiddleware(routing)

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Admin pages: allow login through, protect everything else
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') return NextResponse.next()
    const token = req.cookies.get('admin_session')?.value
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    return NextResponse.next()
  }

  // Admin API: allow login through, protect everything else
  if (pathname.startsWith('/api/admin')) {
    if (pathname === '/api/admin/login' || pathname === '/api/admin/logout') return NextResponse.next()
    const token = req.cookies.get('admin_session')?.value
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.next()
  }

  // All other routes: next-intl handles locale routing
  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
}
