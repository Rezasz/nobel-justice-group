import Container from './Container'

interface PageHeroProps {
  title: string
  subtitle?: string
  breadcrumb?: { label: string; href: string }[]
}

export default function PageHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="bg-navy-light py-16 border-b border-white/10">
      <Container>
        {breadcrumb && (
          <nav className="flex items-center gap-2 text-sm text-cream/50 mb-4">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                <a href={crumb.href} className="hover:text-gold transition-colors">
                  {crumb.label}
                </a>
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-morabba text-4xl md:text-5xl font-bold text-cream">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-cream/70 text-lg max-w-2xl">{subtitle}</p>
        )}
      </Container>
    </section>
  )
}
