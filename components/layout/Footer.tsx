import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const nav = useTranslations('nav')
  const contact = useTranslations('contact')
  const locale = useLocale()
  const base = `/${locale}`

  return (
    <footer className="bg-navy-light border-t border-white/10">
      {/* Google Maps embed */}
      <div className="h-48 w-full border-b border-white/10 overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.0!2d51.4300!3d35.7719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ2!5e0!3m2!1sfa!2s!4v1"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
          loading="lazy"
          referrerPolicy={"no-referrer-when-downgrade" as React.IframeHTMLAttributes<HTMLIFrameElement>['referrerPolicy']}
          title="Nobel Justice Group Location"
        />
      </div>

      {/* Main columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Col 1: Branding + social */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gold rounded flex items-center justify-center flex-shrink-0">
                <span className="text-navy font-bold text-xs">NJG</span>
              </div>
              <div>
                <p className="text-cream font-bold text-sm">Noble Justice Group</p>
                <p className="text-cream/60 text-xs">Hosein Shahrokhi &amp; partners</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold transition-colors text-xs"
                aria-label="Twitter"
              >
                𝕏
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold transition-colors text-xs"
                aria-label="LinkedIn"
              >
                in
              </a>
            </div>
          </div>

          {/* Col 2: Support */}
          <div>
            <h4 className="font-morabba text-gold text-lg mb-4">{t('support')}</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>{t('hours')}</li>
              <li dir="ltr">{contact('phone1')}</li>
              <li className="leading-relaxed">{contact('address')}</li>
            </ul>
          </div>

          {/* Col 3: Legal info */}
          <div>
            <h4 className="font-morabba text-gold text-lg mb-4">{t('legalInfo')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`${base}/privacy`} className="text-cream/70 hover:text-gold transition-colors">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href={`${base}/terms`} className="text-cream/70 hover:text-gold transition-colors">
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link href={`${base}/disclaimer`} className="text-cream/70 hover:text-gold transition-colors">
                  {t('disclaimer')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Links */}
          <div>
            <h4 className="font-morabba text-gold text-lg mb-4">{t('contactUs')}</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: nav('about'), href: `${base}/about` },
                { label: nav('services'), href: `${base}/attorney-abroad` },
                { label: nav('team'), href: `${base}/team` },
                { label: nav('contact'), href: `${base}/contact` },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-cream/70 hover:text-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-cream/40 text-xs">
          {t('copyright')}
        </div>
      </div>
    </footer>
  )
}
