'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import LocaleToggle from './LocaleToggle'
import NavDropdown from './NavDropdown'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [mobileOpen, setMobileOpen] = useState(false)
  const base = `/${locale}`

  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href={base} className="flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 bg-gold rounded flex items-center justify-center flex-shrink-0">
              <span className="text-navy font-bold text-xs">NJG</span>
            </div>
            <div className="leading-tight">
              <p className="text-cream font-bold text-sm">Noble Justice Group</p>
              <p className="text-cream/60 text-xs">Hosein Shahrokhi &amp; partners</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href={base} className="text-sm text-cream/80 hover:text-gold transition-colors">
              {t('home')}
            </Link>
            <NavDropdown
              label={t('about')}
              items={[
                { label: t('about'), href: `${base}/about` },
                { label: t('team'), href: `${base}/team` },
              ]}
            />
            <NavDropdown
              label={t('services')}
              items={[
                { label: t('attorneyAbroad'), href: `${base}/attorney-abroad` },
              ]}
            />
            <Link href={`${base}/famous-clients`} className="text-sm text-cream/80 hover:text-gold transition-colors">
              {t('famousClients')}
            </Link>
            <Link href={`${base}/blog`} className="text-sm text-cream/80 hover:text-gold transition-colors">
              {t('blog')}
            </Link>
            <Link href={`${base}/faq`} className="text-sm text-cream/80 hover:text-gold transition-colors">
              {t('faq')}
            </Link>
            <Link href={`${base}/contact`} className="text-sm text-cream/80 hover:text-gold transition-colors">
              {t('contact')}
            </Link>
            <LocaleToggle />
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-cream p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 space-y-1">
              <span className="block h-0.5 bg-cream" />
              <span className="block h-0.5 bg-cream" />
              <span className="block h-0.5 bg-cream" />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="lg:hidden py-4 border-t border-white/10 flex flex-col gap-1">
            {[
              { label: t('home'), href: base },
              { label: t('about'), href: `${base}/about` },
              { label: t('team'), href: `${base}/team` },
              { label: t('attorneyAbroad'), href: `${base}/attorney-abroad` },
              { label: t('famousClients'), href: `${base}/famous-clients` },
              { label: t('blog'), href: `${base}/blog` },
              { label: t('faq'), href: `${base}/faq` },
              { label: t('contact'), href: `${base}/contact` },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-cream/80 hover:text-gold text-sm py-2 px-1 border-b border-white/5"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <LocaleToggle />
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
