import { useTranslations, useLocale } from 'next-intl'
import { officeCities } from '@/data/services'
import CityCard from '@/components/shared/CityCard'
import SectionTitle from '@/components/shared/SectionTitle'
import Container from '@/components/shared/Container'

export default function InternationalOffices() {
  const t = useTranslations('home')
  const locale = useLocale() as 'fa' | 'en'

  return (
    <section className="py-20 bg-navy">
      <Container>
        <SectionTitle title={t('internationalTitle')} className="mb-10" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {officeCities.map((city) => (
            <CityCard
              key={city.slug}
              city={city.city[locale]}
              country={city.country[locale]}
              description={city.description[locale]}
              photo={city.photo}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
