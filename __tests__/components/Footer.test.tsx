import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import Footer from '@/components/layout/Footer'
import faMessages from '@/messages/fa.json'

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/fa',
  useParams: () => ({ locale: 'fa' }),
}))

function renderWithIntl(locale: string, messages: object) {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Footer />
    </NextIntlClientProvider>
  )
}

test('renders Noble Justice Group branding', () => {
  renderWithIntl('fa', faMessages)
  expect(screen.getAllByText(/Noble Justice Group/i).length).toBeGreaterThan(0)
})

test('renders Farsi support hours', () => {
  renderWithIntl('fa', faMessages)
  expect(screen.getByText(/شنبه/)).toBeInTheDocument()
})

test('renders copyright text', () => {
  renderWithIntl('fa', faMessages)
  expect(screen.getByText(/دادگستر نوبل/)).toBeInTheDocument()
})
