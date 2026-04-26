import { getTranslations, getLocale } from 'next-intl/server'
import { getBlog } from '@/lib/content'
import BlogCard from '@/components/shared/BlogCard'
import SectionTitle from '@/components/shared/SectionTitle'
import Container from '@/components/shared/Container'
import Button from '@/components/shared/Button'

export default async function BlogPreview() {
  const t = await getTranslations('home')
  const blog = await getTranslations('blog')
  const locale = (await getLocale()) as 'fa' | 'en'
  const blogPosts = await getBlog()
  const latest = blogPosts.slice(0, 3)

  return (
    <section className="py-20 bg-navy">
      <Container>
        <SectionTitle title={t('blogTitle')} className="mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {latest.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title[locale]}
              excerpt={post.excerpt[locale]}
              coverImage={post.coverImage}
              date={post.date}
              category={post.category[locale]}
              href={`/${locale}/blog/${post.slug}`}
              readMoreLabel={blog('readMore')}
            />
          ))}
        </div>
        <div className="text-center">
          <Button variant="outline" href={`/${locale}/blog`}>
            {t('blogCta')}
          </Button>
        </div>
      </Container>
    </section>
  )
}
