import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getBlog } from '@/lib/content'
import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'
import Container from '@/components/shared/Container'
import BlogCard from '@/components/shared/BlogCard'

export async function generateStaticParams() {
  const posts = await getBlog()
  return posts.flatMap((p) =>
    (['fa', 'en'] as const).map((locale) => ({ locale, slug: p.slug }))
  )
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale: rawLocale } = await params
  const locale = rawLocale as 'fa' | 'en'
  const posts = await getBlog()
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  const base = `/${locale}`
  const t = await getTranslations('blog')
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3)

  const rawHtml = await Promise.resolve(marked.parse(post.body[locale] ?? ''))
  const safeHtml = DOMPurify.sanitize(rawHtml)

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
          <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
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
