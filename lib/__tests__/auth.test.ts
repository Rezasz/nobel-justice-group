process.env.ADMIN_JWT_SECRET = 'test-secret-that-is-32-chars-long!!'

import { signAdminToken, verifyAdminToken, isAuthenticated } from '../auth'
import * as jwt from 'jsonwebtoken'

describe('auth', () => {
  test('signAdminToken returns a non-empty string', () => {
    const token = signAdminToken()
    expect(typeof token).toBe('string')
    expect(token.length).toBeGreaterThan(10)
  })

  test('verifyAdminToken accepts a valid token', () => {
    const token = signAdminToken()
    expect(verifyAdminToken(token)).toBe(true)
  })

  test('verifyAdminToken rejects garbage', () => {
    expect(verifyAdminToken('not.a.jwt')).toBe(false)
  })

  test('verifyAdminToken rejects token signed with wrong secret', () => {
    const token = jwt.sign({ admin: true }, 'wrong-secret')
    expect(verifyAdminToken(token)).toBe(false)
  })

  test('verifyAdminToken rejects token without admin:true', () => {
    const token = jwt.sign({ user: 'someone' }, 'test-secret-that-is-32-chars-long!!')
    expect(verifyAdminToken(token)).toBe(false)
  })

  test('isAuthenticated returns true for valid session cookie', () => {
    const token = signAdminToken()
    const req = {
      cookies: { get: (name: string) => name === 'admin_session' ? { value: token } : undefined },
    } as unknown as import('next/server').NextRequest
    expect(isAuthenticated(req)).toBe(true)
  })

  test('isAuthenticated returns false when cookie is missing', () => {
    const req = {
      cookies: { get: () => undefined },
    } as unknown as import('next/server').NextRequest
    expect(isAuthenticated(req)).toBe(false)
  })
})
