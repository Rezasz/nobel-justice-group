'use client'
import { useTranslations, useLocale } from 'next-intl'
import type { FamousClient } from '@/data/types'
import ClientCard from '@/components/shared/ClientCard'
import SectionTitle from '@/components/shared/SectionTitle'
import Container from '@/components/shared/Container'

interface Props {
  clients: FamousClient[]
}

export default function FamousClientsCarousel({ clients }: Props) {
  const t = useTranslations('home')
  const locale = useLocale() as 'fa' | 'en'

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
