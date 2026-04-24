import { useTranslations, useLocale } from 'next-intl'
import Button from '@/components/shared/Button'

export default function AttorneyAbroadBanner() {
  const t = useTranslations('home')
  const locale = useLocale()

  return (
    <section className="relative py-24 overflow-hidden bg-[#2D3E50]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/attorney-abroad-bg.jpg')" }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-morabba text-4xl text-cream mb-4">{t('attorneyAbroadTitle')}</h2>
          <p className="text-cream/80 leading-relaxed mb-8">{t('attorneyAbroadText')}</p>
          <Button variant="gold" href={`/${locale}/attorney-abroad`}>
            {t('attorneyAbroadCta')}
          </Button>
        </div>
      </div>
    </section>
  )
}
