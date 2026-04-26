import { getTranslations } from 'next-intl/server'
import { getPartners } from '@/lib/content'
import SectionTitle from '@/components/shared/SectionTitle'
import Container from '@/components/shared/Container'

export default async function ClientLogos() {
  const t = await getTranslations('home')
  const partners = await getPartners()

  return (
    <section className="py-16 bg-navy-light">
      <Container>
        <SectionTitle title={t('clientsTitle')} className="mb-10" />
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="w-24 h-12 bg-white/10 rounded flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
            >
              <span className="text-cream/60 text-xs text-center px-2">{partner.name}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
