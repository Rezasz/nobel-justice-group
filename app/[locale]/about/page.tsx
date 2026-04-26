import { getTranslations, getLocale } from 'next-intl/server'
import { getTeam } from '@/lib/content'
import PageHero from '@/components/shared/PageHero'
import SectionTitle from '@/components/shared/SectionTitle'
import Container from '@/components/shared/Container'
import TeamCard from '@/components/shared/TeamCard'
import Button from '@/components/shared/Button'

export default async function AboutPage() {
  const t = await getTranslations('about')
  const teamT = await getTranslations('team')
  const locale = (await getLocale()) as 'fa' | 'en'
  const base = `/${locale}`
  const team = await getTeam()
  const preview = team.slice(0, 3)

  return (
    <>
      <PageHero
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        breadcrumb={[
          { label: locale === 'fa' ? 'خانه' : 'Home', href: base },
          { label: t('title'), href: `${base}/about` },
        ]}
      />

      {/* About text */}
      <section className="py-20 bg-navy">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-square rounded-2xl bg-navy-light flex items-center justify-center">
              <span className="text-6xl">⚖️</span>
            </div>
            <div>
              <SectionTitle title={t('title')} align="start" className="mb-6" />
              <p className="text-cream/80 leading-relaxed mb-4">
                {locale === 'fa'
                  ? 'گروه دادگستر نوبل با هدف ایجاد پل ارتباطی میان چالش‌های حقوقی و فرصت‌های قانونی تأسیس شده است. ما با بیش از ۱۵ سال تجربه در زمینه حقوق بین‌الملل و داخلی، آماده ارائه بهترین خدمات حقوقی هستیم.'
                  : 'Nobel Justice Group was founded with the aim of building a bridge between legal challenges and legal opportunities. With over 15 years of experience in international and domestic law, we are ready to provide the best legal services.'}
              </p>
              <p className="text-cream/80 leading-relaxed">
                {locale === 'fa'
                  ? 'تیم متخصص ما متشکل از وکلای برجسته داخلی و بین‌المللی است که هر یک در حوزه‌های تخصصی خود دارای تجربه و دانش گسترده‌ای می‌باشند.'
                  : 'Our specialized team consists of prominent domestic and international lawyers, each with extensive experience and knowledge in their respective fields.'}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Vision pillars */}
      <section className="py-16 bg-navy-light">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🌍', title: locale === 'fa' ? 'دیدگاه جهانی' : 'Global Vision', desc: locale === 'fa' ? 'ارائه خدمات حقوقی در سطح بین‌المللی' : 'Providing legal services at an international level' },
              { icon: '⚖️', title: locale === 'fa' ? 'عدالت‌محور' : 'Justice-Centered', desc: locale === 'fa' ? 'تعهد کامل به احقاق حقوق موکل' : 'Full commitment to client rights restoration' },
              { icon: '🤝', title: locale === 'fa' ? 'مشارکت راهبردی' : 'Strategic Partnership', desc: locale === 'fa' ? 'شبکه گسترده شرکای بین‌المللی' : 'Extensive network of international partners' },
            ].map((item) => (
              <div key={item.title} className="bg-navy rounded-xl p-6 border border-white/10 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-morabba text-xl text-gold mb-2">{item.title}</h3>
                <p className="text-cream/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team preview */}
      <section className="py-20 bg-navy">
        <Container>
          <SectionTitle title={locale === 'fa' ? 'تیم ما' : 'Our Team'} className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {preview.map((member) => (
              <TeamCard
                key={member.slug}
                name={member.name[locale]}
                title={member.title[locale]}
                bio={member.bio[locale]}
                photo={member.photo}
                href={`${base}/team/${member.slug}`}
                readMoreLabel={teamT('readMore')}
              />
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" href={`${base}/team`}>
              {locale === 'fa' ? 'مشاهده همه اعضای تیم' : 'View All Team Members'}
            </Button>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-20 bg-navy-light">
        <Container size="md">
          <SectionTitle title={t('missionTitle')} subtitle={t('missionSubtitle')} className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: '📋', title: locale === 'fa' ? 'مشاوره و برنامه‌ریزی' : 'Consultation & Planning' },
              { icon: '🏛️', title: locale === 'fa' ? 'دادگاه' : 'Litigation' },
              { icon: '📝', title: locale === 'fa' ? 'تنظیم اسناد' : 'Document Drafting' },
              { icon: '🌐', title: locale === 'fa' ? 'حقوق بین‌الملل' : 'International Law' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-4 bg-navy rounded-xl p-4 border border-white/10">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-cream font-vazirmatn">{item.title}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Partners */}
      <section className="py-16 bg-navy">
        <Container>
          <SectionTitle title={t('partnersTitle')} className="mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['🇶🇦 Qatar', '🇴🇲 Oman', '🇦🇪 UAE', '🇩🇪 Germany'].map((partner) => (
              <div key={partner} className="bg-navy-light rounded-xl p-6 text-center border border-white/10">
                <p className="text-3xl mb-2">{partner.split(' ')[0]}</p>
                <p className="text-cream/70 text-sm">{partner.split(' ').slice(1).join(' ')}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
