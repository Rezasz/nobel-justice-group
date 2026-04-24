import { render, screen, fireEvent } from '@testing-library/react'
import Accordion from '@/components/shared/Accordion'

const items = [
  { id: '1', question: 'سوال اول', answer: 'جواب اول' },
  { id: '2', question: 'سوال دوم', answer: 'جواب دوم' },
]

test('renders all questions', () => {
  render(<Accordion items={items} />)
  expect(screen.getByText('سوال اول')).toBeInTheDocument()
  expect(screen.getByText('سوال دوم')).toBeInTheDocument()
})

test('answers are hidden initially', () => {
  render(<Accordion items={items} />)
  const answer = screen.getByText('جواب اول')
  expect(answer.closest('div')).toHaveClass('max-h-0')
})

test('clicking a question reveals the answer', () => {
  render(<Accordion items={items} />)
  fireEvent.click(screen.getByText('سوال اول'))
  const answer = screen.getByText('جواب اول')
  expect(answer.closest('div')).not.toHaveClass('max-h-0')
})
