import { useTranslations, useLocale } from 'next-intl'
import Button from '@/components/shared/Button'

export default function ConsultationCTA() {
  const t = useTranslations('home')
  const locale = useLocale()

  return (
    <section className="relative py-24 overflow-hidden bg-navy-light">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/images/consultation-bg.jpg')" }}
      />
      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        <h2 className="font-morabba text-4xl text-cream mb-8">{t('consultationTitle')}</h2>
        <Button variant="gold" href={`/${locale}/contact`} size="lg">
          {t('consultationCta')}
        </Button>
      </div>
    </section>
  )
}
