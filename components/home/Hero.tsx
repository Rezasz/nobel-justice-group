import { useTranslations, useLocale } from 'next-intl'
import Button from '@/components/shared/Button'

export default function Hero() {
  const t = useTranslations('home')
  const locale = useLocale()
  const base = `/${locale}`

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-navy-light">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-e from-navy/95 via-navy/70 to-navy/30" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-xl">
          <p className="text-gold text-sm uppercase tracking-widest mb-4">{t('heroSubtitle')}</p>
          <h1 className="font-morabba text-5xl md:text-7xl font-bold text-cream leading-tight mb-8">
            {t('heroTitle')}
          </h1>
          <div className="flex flex-wrap gap-4">
            <Button variant="gold" href={`${base}/contact`} size="lg">
              {t('heroCtaPrimary')}
            </Button>
            <Button variant="outline" href={`${base}/about`} size="lg">
              {t('heroCtaSecondary')}
            </Button>
          </div>
        </div>
      </div>
      {/* Slide indicator dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        <span className="w-8 h-1 bg-gold rounded-full" />
        <span className="w-2 h-1 bg-white/30 rounded-full" />
        <span className="w-2 h-1 bg-white/30 rounded-full" />
      </div>
    </section>
  )
}
