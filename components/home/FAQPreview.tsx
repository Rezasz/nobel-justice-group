import { getTranslations, getLocale } from 'next-intl/server'
import { getFaq } from '@/lib/content'
import Accordion from '@/components/shared/Accordion'
import SectionTitle from '@/components/shared/SectionTitle'
import Container from '@/components/shared/Container'
import Button from '@/components/shared/Button'

export default async function FAQPreview() {
  const t = await getTranslations('home')
  const locale = (await getLocale()) as 'fa' | 'en'
  const faqItems = await getFaq()
  const preview = faqItems.slice(0, 4).map((item) => ({
    id: item.id,
    question: item.question[locale],
    answer: item.answer[locale],
  }))

  return (
    <section className="py-20 bg-navy-light">
      <Container size="md">
        <SectionTitle title={t('faqTitle')} className="mb-10" />
        <Accordion items={preview} />
        <div className="text-center mt-8">
          <Button variant="outline" href={`/${locale}/faq`}>
            {t('faqCta')}
          </Button>
        </div>
      </Container>
    </section>
  )
}
