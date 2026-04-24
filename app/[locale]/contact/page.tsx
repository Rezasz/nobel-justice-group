'use client'
import { useTranslations, useLocale } from 'next-intl'
import { useState } from 'react'
import PageHero from '@/components/shared/PageHero'
import Container from '@/components/shared/Container'
import Button from '@/components/shared/Button'

export default function ContactPage() {
  const t = useTranslations('contact')
  const locale = useLocale() as 'fa' | 'en'
  const base = `/${locale}`
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' })

  const subjects = locale === 'fa'
    ? ['مشاوره حقوقی', 'وکیل ایرانیان خارج', 'حقوق بین‌الملل', 'سایر موارد']
    : ['Legal Consultation', 'Iranians Abroad', 'International Law', 'Other']

  return (
    <>
      <PageHero
        title={t('title')}
        subtitle={t('heroText')}
        breadcrumb={[
          { label: locale === 'fa' ? 'خانه' : 'Home', href: base },
          { label: t('title'), href: `${base}/contact` },
        ]}
      />

      {/* Contact info */}
      <section className="py-10 bg-navy-light border-b border-white/10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-gold text-2xl mb-2">𝕏</p>
              <p className="text-cream/70 text-sm">@NoblJusticeGroup</p>
            </div>
            <div>
              <p className="text-gold text-2xl mb-2">📍</p>
              <p className="text-cream/70 text-sm leading-relaxed">{t('address')}</p>
            </div>
            <div>
              <p className="text-gold text-2xl mb-2">📞</p>
              <p className="text-cream/70 text-sm" dir="ltr">{t('phone1')}</p>
              <p className="text-cream/70 text-sm" dir="ltr">{t('phone2')}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Map */}
      <div className="h-56 w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.0!2d51.4300!3d35.7719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzU!5e0!3m2!1sfa!2s!4v1"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Nobel Justice Group Location"
        />
      </div>

      {/* Form */}
      <section className="py-20 bg-navy">
        <Container size="md">
          <h2 className="font-morabba text-2xl text-cream mb-8">{t('formTitle')}</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder={t('namePlaceholder')}
                className="bg-navy-light border border-white/10 rounded-lg px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors"
                value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
              <input type="text" placeholder={t('lastNamePlaceholder')}
                className="bg-navy-light border border-white/10 rounded-lg px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors"
                value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="email" placeholder={t('emailPlaceholder')}
                className="bg-navy-light border border-white/10 rounded-lg px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input type="tel" placeholder={t('phonePlaceholder')}
                className="bg-navy-light border border-white/10 rounded-lg px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors"
                value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <select
              className="w-full bg-navy-light border border-white/10 rounded-lg px-4 py-3 text-cream/70 focus:outline-none focus:border-gold transition-colors"
              value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
              <option value="" disabled>{t('subjectPlaceholder')}</option>
              {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <textarea rows={5} placeholder={t('messagePlaceholder')}
              className="w-full bg-navy-light border border-white/10 rounded-lg px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors resize-none"
              value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <p className="text-xs text-cream/40">
              {locale === 'fa'
                ? 'با ارسال این فرم، رازداری و اطلاعات شما به طور کامل محافظت خواهد شد.'
                : 'By submitting this form, your confidentiality and information will be fully protected.'}
            </p>
            <Button variant="gold" type="submit" className="w-full justify-center" size="lg">
              {t('submitCta')}
            </Button>
          </form>
        </Container>
      </section>
    </>
  )
}
