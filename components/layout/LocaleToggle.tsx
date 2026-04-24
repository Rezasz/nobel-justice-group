'use client'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

export default function LocaleToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const toggleLocale = () => {
    const newLocale = locale === 'fa' ? 'en' : 'fa'
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-1 text-cream/80 hover:text-gold transition-colors text-sm font-bold border border-white/20 rounded px-3 py-1"
    >
      {locale === 'fa' ? 'EN' : 'FA'}
    </button>
  )
}
