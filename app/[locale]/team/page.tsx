import { useTranslations, useLocale } from 'next-intl'
import { team } from '@/data/team'
import PageHero from '@/components/shared/PageHero'
import TeamCard from '@/components/shared/TeamCard'
import Container from '@/components/shared/Container'

export default function TeamPage() {
  const t = useTranslations('team')
  const locale = useLocale() as 'fa' | 'en'
  const base = `/${locale}`

  return (
    <>
      <PageHero
        title={t('title')}
        breadcrumb={[
          { label: locale === 'fa' ? 'خانه' : 'Home', href: base },
          { label: t('title'), href: `${base}/team` },
        ]}
      />
      <section className="py-20 bg-navy">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <TeamCard
                key={member.slug}
                name={member.name[locale]}
                title={member.title[locale]}
                bio={member.bio[locale]}
                photo={member.photo}
                href={`${base}/team/${member.slug}`}
                readMoreLabel={t('readMore')}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
