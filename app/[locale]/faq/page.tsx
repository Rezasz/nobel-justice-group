import { useTranslations, useLocale } from 'next-intl'
import { faqItems } from '@/data/faq'
import PageHero from '@/components/shared/PageHero'
import Accordion from '@/components/shared/Accordion'
import Container from '@/components/shared/Container'
import Button from '@/components/shared/Button'

export default function FaqPage() {
  const t = useTranslations('faq')
  const locale = useLocale() as 'fa' | 'en'
  const base = `/${locale}`
  const items = faqItems.map((item) => ({
    id: item.id,
    question: item.question[locale],
    answer: item.answer[locale],
  }))

  return (
    <>
      <PageHero
        title={t('title')}
        breadcrumb={[
          { label: locale === 'fa' ? 'خانه' : 'Home', href: base },
          { label: t('title'), href: `${base}/faq` },
        ]}
      />
      <section className="py-20 bg-navy">
        <Container size="md">
          <Accordion items={items} />
        </Container>
      </section>
      <section className="py-16 bg-navy-light text-center">
        <Container size="sm">
          <h2 className="font-morabba text-2xl text-cream mb-6">
            {locale === 'fa' ? 'سوال شما اینجا نیست؟ با ما تماس بگیرید' : "Didn't find your question? Contact us"}
          </h2>
          <Button variant="gold" href={`${base}/contact`} size="lg">
            {t('consultationCta')}
          </Button>
        </Container>
      </section>
    </>
  )
}
