jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/fa',
  useParams: () => ({ locale: 'fa' }),
}))

import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import Navbar from '@/components/layout/Navbar'
import faMessages from '@/messages/fa.json'

function renderWithIntl(locale: string, messages: object) {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
    </NextIntlClientProvider>
  )
}

test('renders Nobel Justice Group logo text', () => {
  renderWithIntl('fa', faMessages)
  expect(screen.getByText(/Noble Justice Group/i)).toBeInTheDocument()
})

test('renders home nav link in Farsi', () => {
  renderWithIntl('fa', faMessages)
  expect(screen.getByText('صفحه اصلی')).toBeInTheDocument()
})

test('renders contact nav link in Farsi', () => {
  renderWithIntl('fa', faMessages)
  expect(screen.getByText('تماس با ما')).toBeInTheDocument()
})
