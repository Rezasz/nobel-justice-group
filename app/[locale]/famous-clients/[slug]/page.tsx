import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getClients } from '@/lib/content'
import PageHero from '@/components/shared/PageHero'
import Container from '@/components/shared/Container'
import ClientCard from '@/components/shared/ClientCard'

export async function generateStaticParams() {
  const famousClients = await getClients()
  return famousClients.flatMap((c) =>
    (['fa', 'en'] as const).map((locale) => ({ locale, slug: c.slug }))
  )
}

export default async function FamousClientDetailPage({ params }: { params: { slug: string; locale: string } }) {
  const famousClients = await getClients()
  const client = famousClients.find((c) => c.slug === params.slug)
  if (!client) notFound()

  const locale = params.locale as 'fa' | 'en'
  const base = `/${locale}`
  const t = await getTranslations('famousClients')
  const related = famousClients.filter((c) => c.slug !== client.slug).slice(0, 4)

  return (
    <>
      <PageHero
        title={client.name[locale]}
        subtitle={client.caseSummary[locale]}
        breadcrumb={[
          { label: locale === 'fa' ? 'خانه' : 'Home', href: base },
          { label: t('title'), href: `${base}/famous-clients` },
          { label: client.name[locale], href: `${base}/famous-clients/${client.slug}` },
        ]}
      />
      <section className="py-20 bg-navy">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="aspect-[3/4] rounded-xl bg-navy-light flex items-center justify-center">
              <span className="text-gold text-6xl font-morabba font-bold">
                {client.name[locale].charAt(0)}
              </span>
            </div>
            <div className="lg:col-span-2">
              <span className="inline-block bg-gold/20 text-gold text-xs px-3 py-1 rounded-full mb-4">
                {client.category[locale]}
              </span>
              <h2 className="font-morabba text-3xl text-cream mb-4">{client.caseSummary[locale]}</h2>
              <p className="text-cream/80 leading-relaxed text-lg">{client.caseDetail[locale]}</p>
            </div>
          </div>
        </Container>
      </section>
      <section className="py-16 bg-navy-light">
        <Container>
          <h2 className="font-morabba text-2xl text-cream mb-8">
            {locale === 'fa' ? 'موکلین شناخته شده مرتبط' : 'Related Famous Clients'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((c) => (
              <ClientCard
                key={c.slug}
                name={c.name[locale]}
                photo={c.photo}
                href={`${base}/famous-clients/${c.slug}`}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
