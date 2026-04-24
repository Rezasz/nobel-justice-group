import { routing } from '@/i18n/routing'

test('routing has fa as default locale', () => {
  expect(routing.defaultLocale).toBe('fa')
})

test('routing includes fa and en locales', () => {
  expect(routing.locales).toContain('fa')
  expect(routing.locales).toContain('en')
})
