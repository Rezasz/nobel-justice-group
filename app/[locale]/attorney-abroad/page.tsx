import { useTranslations, useLocale } from 'next-intl'
import PageHero from '@/components/shared/PageHero'
import Container from '@/components/shared/Container'
import SectionTitle from '@/components/shared/SectionTitle'
import Button from '@/components/shared/Button'

export default function AttorneyAbroadPage() {
  const t = useTranslations('attorneyAbroad')
  const locale = useLocale() as 'fa' | 'en'
  const base = `/${locale}`
  const isFa = locale === 'fa'

  const topics = isFa
    ? ['حقوق اموال و ارث برای ایرانیان خارج از کشور', 'طلاق و امور خانوادگی در خارج از کشور', 'حقوق تابعیت و شهروندی', 'استرداد اموال از ایران', 'دعاوی تجاری بین‌المللی', 'حقوق کار برای ایرانیان مقیم خارج']
    : ['Property and inheritance rights for Iranians abroad', 'Divorce and family matters outside Iran', 'Citizenship and nationality rights', 'Asset recovery from Iran', 'International commercial disputes', 'Labor rights for Iranians residing abroad']

  return (
    <>
      <PageHero
        title={t('title')}
        subtitle={t('subtitle')}
        breadcrumb={[
          { label: isFa ? 'خانه' : 'Home', href: base },
          { label: t('title'), href: `${base}/attorney-abroad` },
        ]}
      />
      <section className="py-20 bg-navy">
        <Container size="md">
          <p className="text-cream/80 leading-relaxed text-lg mb-8">
            {isFa
              ? 'یکی از تخصص‌های برجسته گروه دادگستر نوبل، نمایندگی و پشتیبانی حقوقی از ایرانیان مقیم خارج از کشور است.'
              : "One of Nobel Justice Group's core specializations is legal representation and support for Iranians residing outside Iran."}
          </p>
        </Container>
      </section>
      <section className="py-16 bg-navy-light">
        <Container>
          <SectionTitle title={isFa ? 'موضوعات حقوقی ایرانیان خارج' : 'Legal Topics for Iranians Abroad'} className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic) => (
              <div key={topic} className="flex items-center gap-3 bg-navy rounded-xl p-4 border border-white/10">
                <span className="text-gold text-xl flex-shrink-0">✓</span>
                <span className="text-cream/80">{topic}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="py-20 bg-navy">
        <Container size="md">
          <SectionTitle title={isFa ? 'وکیل ایرانی خارج از کشور' : 'Iranian Lawyer Abroad'} align="start" className="mb-6" />
          <div className="space-y-4 text-cream/80 leading-relaxed">
            <p>
              {isFa
                ? 'گروه دادگستر نوبل با بیش از یک دهه تجربه در نمایندگی ایرانیان خارج از کشور، یکی از معتبرترین مراجع حقوقی برای هموطنان عزیز مقیم خارج محسوب می‌شود.'
                : 'Nobel Justice Group, with over a decade of experience representing Iranians abroad, is one of the most reputable legal references for our compatriots residing outside Iran.'}
            </p>
            <p>
              {isFa
                ? 'خدمات ما شامل مشاوره آنلاین، تهیه اسناد حقوقی، نمایندگی در دادگاه‌های ایران و ارتباط با وکلای بین‌المللی می‌شود.'
                : 'Our services include online consultation, preparation of legal documents, representation in Iranian courts and liaison with international lawyers.'}
            </p>
          </div>
        </Container>
      </section>
      <section className="py-16 bg-navy-light text-center">
        <Container size="sm">
          <h2 className="font-morabba text-3xl text-cream mb-6">
            {isFa ? 'همین حالا مشاوره بگیرید' : 'Get Consultation Now'}
          </h2>
          <Button variant="gold" href={`${base}/contact`} size="lg">
            {t('consultationCta')}
          </Button>
        </Container>
      </section>
    </>
  )
}
