import { useTranslations, useLocale } from 'next-intl'
import { famousClients } from '@/data/clients'
import PageHero from '@/components/shared/PageHero'
import ClientCard from '@/components/shared/ClientCard'
import Container from '@/components/shared/Container'

export default function FamousClientsPage() {
  const t = useTranslations('famousClients')
  const locale = useLocale() as 'fa' | 'en'
  const base = `/${locale}`

  return (
    <>
      <PageHero
        title={t('title')}
        subtitle={t('subtitle')}
        breadcrumb={[
          { label: locale === 'fa' ? 'خانه' : 'Home', href: base },
          { label: t('title'), href: `${base}/famous-clients` },
        ]}
      />
      <section className="py-20 bg-navy">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {famousClients.map((client) => (
              <ClientCard
                key={client.slug}
                name={client.name[locale]}
                photo={client.photo}
                href={`${base}/famous-clients/${client.slug}`}
              />
            ))}
          </div>
        </Container>
      </section>
      <section className="py-12 bg-navy-light border-t border-white/10">
        <Container>
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { value: '۴۰+', label: locale === 'fa' ? 'موکل سیاسی' : 'Political Clients' },
              { value: '۱۰۰+', label: locale === 'fa' ? 'چهره اجتماعی' : 'Social Figures' },
              { value: '1.7%', label: locale === 'fa' ? 'پرونده‌های بین‌المللی' : 'International Cases' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-morabba text-4xl text-gold">{stat.value}</p>
                <p className="text-cream/70 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
