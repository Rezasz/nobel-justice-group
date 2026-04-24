import { useTranslations, useLocale } from 'next-intl'
import { blogPosts } from '@/data/blog'
import PageHero from '@/components/shared/PageHero'
import BlogCard from '@/components/shared/BlogCard'
import Container from '@/components/shared/Container'

export default function BlogPage() {
  const t = useTranslations('blog')
  const locale = useLocale() as 'fa' | 'en'
  const base = `/${locale}`

  return (
    <>
      <PageHero
        title={t('title')}
        breadcrumb={[
          { label: locale === 'fa' ? 'خانه' : 'Home', href: base },
          { label: t('title'), href: `${base}/blog` },
        ]}
      />
      <section className="py-20 bg-navy">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title[locale]}
                excerpt={post.excerpt[locale]}
                coverImage={post.coverImage}
                date={post.date}
                category={post.category[locale]}
                href={`/${locale}/blog/${post.slug}`}
                readMoreLabel={t('readMore')}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
