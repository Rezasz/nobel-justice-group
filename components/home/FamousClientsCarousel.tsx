import { getTranslations, getLocale } from 'next-intl/server'
import type { FamousClient } from '@/data/types'
import ClientCard from '@/components/shared/ClientCard'
import SectionTitle from '@/components/shared/SectionTitle'
import Container from '@/components/shared/Container'

interface Props {
  clients: FamousClient[]
}

export default async function FamousClientsCarousel({ clients }: Props) {
  const t = await getTranslations('home')
  const locale = (await getLocale()) as 'fa' | 'en'

  return (
    <section className="py-20 bg-navy-light">
      <Container>
        <SectionTitle title={t('famousClientsTitle')} className="mb-10" />
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
          {clients.map((client) => (
            <div key={client.slug} className="flex-shrink-0 w-44 snap-start">
              <ClientCard
                name={client.name[locale]}
                photo={client.photo}
                href={`/${locale}/famous-clients/${client.slug}`}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
