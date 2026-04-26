import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getTeam } from '@/lib/content'
import Container from '@/components/shared/Container'
import Button from '@/components/shared/Button'
import TeamCard from '@/components/shared/TeamCard'

export async function generateStaticParams() {
  const team = await getTeam()
  return team.flatMap((m) =>
    (['fa', 'en'] as const).map((locale) => ({ locale, slug: m.slug }))
  )
}

export default async function TeamDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale: rawLocale } = await params
  const locale = rawLocale as 'fa' | 'en'
  const team = await getTeam()
  const member = team.find((m) => m.slug === slug)
  if (!member) notFound()

  const t = await getTranslations('team')
  const base = `/${locale}`
  const colleagues = team.filter((m) => m.slug !== member.slug).slice(0, 3)

  return (
    <>
      <section className="relative bg-navy-light py-20 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <p className="text-white/5 font-morabba text-[8rem] font-bold whitespace-nowrap">
            {member.name.en}
          </p>
        </div>
        <Container>
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-40 h-40 flex-shrink-0 rounded-full bg-navy border-4 border-gold flex items-center justify-center">
              <span className="text-gold text-4xl font-morabba font-bold">{member.name[locale].charAt(0)}</span>
            </div>
            <div>
              <h1 className="font-morabba text-4xl text-cream mb-2">{member.name[locale]}</h1>
              <p className="text-gold text-lg mb-4">{member.title[locale]}</p>
              <div className="flex flex-wrap gap-2">
                {member.specializations[locale].map((spec) => (
                  <span key={spec} className="bg-gold/20 text-gold text-xs px-3 py-1 rounded-full">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-navy">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="text-cream/80 leading-relaxed text-lg">{member.fullBio[locale]}</p>
              {member.licenseYear && (
                <p className="mt-6 text-gold text-sm">
                  {locale === 'fa' ? `پروانه وکالت: ${member.licenseYear}` : `License Year: ${member.licenseYear}`}
                </p>
              )}
            </div>
            <div className="bg-navy-light rounded-xl p-6 border border-white/10 h-fit">
              <h3 className="font-morabba text-lg text-gold mb-4">
                {locale === 'fa' ? 'اطلاعات تماس' : 'Contact Info'}
              </h3>
              {member.phone && (
                <p className="text-cream/70 text-sm mb-3" dir="ltr">{member.phone}</p>
              )}
              <Button variant="gold" href={`${base}/contact`} className="w-full justify-center">
                {t('contactCta')}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-navy-light">
        <Container>
          <h2 className="font-morabba text-2xl text-cream mb-8">
            {locale === 'fa' ? 'سایر اعضای تیم' : 'Other Team Members'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {colleagues.map((col) => (
              <TeamCard
                key={col.slug}
                name={col.name[locale]}
                title={col.title[locale]}
                bio={col.bio[locale]}
                photo={col.photo}
                href={`${base}/team/${col.slug}`}
                readMoreLabel={t('readMore')}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
