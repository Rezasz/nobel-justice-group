import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config'

const fullConfig = resolveConfig(tailwindConfig)

test('navy DEFAULT color token is defined', () => {
  expect((fullConfig.theme.colors as any).navy.DEFAULT).toBe('#1B2B3A')
})

test('gold DEFAULT color token is defined', () => {
  expect((fullConfig.theme.colors as any).gold.DEFAULT).toBe('#C9A84C')
})

test('cream color token is defined', () => {
  expect((fullConfig.theme.colors as any).cream).toBe('#F5F0E8')
})
