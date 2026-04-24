import { render, screen } from '@testing-library/react'
import Button from '@/components/shared/Button'

test('renders gold variant with text', () => {
  render(<Button variant="gold">رزرو مشاوره</Button>)
  expect(screen.getByRole('button', { name: 'رزرو مشاوره' })).toBeInTheDocument()
})

test('renders outline variant with correct border class', () => {
  render(<Button variant="outline">بیشتر بدانید</Button>)
  const btn = screen.getByRole('button')
  expect(btn.className).toContain('border-gold')
})

test('renders as anchor link when href is provided', () => {
  render(<Button variant="gold" href="/contact">تماس</Button>)
  expect(screen.getByRole('link')).toHaveAttribute('href', '/contact')
})
