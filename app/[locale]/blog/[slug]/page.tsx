import { notFound } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { blogPosts } from '@/data/blog'
import Container from '@/components/shared/Container'
import BlogCard from '@/components/shared/BlogCard'

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export default function BlogDetailPage({ params }: { params: { slug: string; locale: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const locale = params.locale as 'fa' | 'en'
  const base = `/${locale}`
  const t = useTranslations('blog')
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <section className="relative py-16 bg-navy-light border-b border-white/10">
        <Container>
          <nav className="flex items-center gap-2 text-sm text-cream/50 mb-4">
            <a href={base} className="hover:text-gold">{locale === 'fa' ? 'خانه' : 'Home'}</a>
            <span>/</span>
            <a href={`${base}/blog`} className="hover:text-gold">{t('title')}</a>
            <span>/</span>
            <span className="text-cream/80">{post.title[locale]}</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-gold/20 text-gold text-xs px-3 py-1 rounded-full">{post.category[locale]}</span>
            <span className="text-cream/50 text-sm">{post.date}</span>
          </div>
          <h1 className="font-morabba text-4xl text-cream">{post.title[locale]}</h1>
        </Container>
      </section>
      <section className="py-16 bg-navy">
        <Container size="md">
          <p className="text-cream/80 leading-relaxed text-lg">{post.body[locale]}</p>
        </Container>
      </section>
      <section className="py-16 bg-navy-light">
        <Container>
          <h2 className="font-morabba text-2xl text-cream mb-8">{t('relatedTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <BlogCard
                key={p.slug}
                title={p.title[locale]}
                excerpt={p.excerpt[locale]}
                coverImage={p.coverImage}
                date={p.date}
                category={p.category[locale]}
                href={`${base}/blog/${p.slug}`}
                readMoreLabel={t('readMore')}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
