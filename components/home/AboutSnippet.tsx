import { useTranslations, useLocale } from 'next-intl'
import Button from '@/components/shared/Button'
import SectionTitle from '@/components/shared/SectionTitle'
import Container from '@/components/shared/Container'

export default function AboutSnippet() {
  const t = useTranslations('home')
  const locale = useLocale()

  return (
    <section className="py-20 bg-navy">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-navy-light"
            style={{ backgroundImage: "url('/images/about-snippet.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
            <blockquote className="absolute bottom-6 start-6 end-6 text-cream font-morabba text-lg border-s-4 border-gold ps-4">
              «حقوق همراه با اتقاء انسانی، بالکه معماری دادل قرار است.»
            </blockquote>
          </div>
          <div>
            <SectionTitle title={t('aboutTitle')} align="start" className="mb-6" />
            <p className="text-cream/80 leading-relaxed mb-6">{t('aboutText')}</p>
            <Button variant="gold" href={`/${locale}/about`}>
              {t('aboutCta')}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
