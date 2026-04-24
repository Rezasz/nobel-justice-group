import { useTranslations } from 'next-intl'
import SectionTitle from '@/components/shared/SectionTitle'
import Container from '@/components/shared/Container'

export default function CoreValues() {
  const t = useTranslations('home')
  const v = useTranslations('values')

  const values = [
    { icon: '⚖️', title: v('honesty'), desc: v('honestyDesc') },
    { icon: '📚', title: v('expertise'), desc: v('expertiseDesc') },
    { icon: '🤝', title: v('trust'), desc: v('trustDesc') },
    { icon: '💡', title: v('innovation'), desc: v('innovationDesc') },
  ]

  return (
    <section className="py-20 bg-navy">
      <Container>
        <SectionTitle title={t('valuesTitle')} className="mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-navy-light rounded-xl p-6 border border-white/10 hover:border-gold/30 transition-colors text-center"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="font-morabba text-lg text-gold mb-2">{value.title}</h3>
              <p className="text-cream/70 text-sm">{value.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
