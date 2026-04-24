import { team } from '@/data/team'
import { famousClients } from '@/data/clients'
import { blogPosts } from '@/data/blog'
import { faqItems } from '@/data/faq'
import { officeCities } from '@/data/services'

test('team has at least 3 members with required fields', () => {
  expect(team.length).toBeGreaterThanOrEqual(3)
  team.forEach(member => {
    expect(member.slug).toBeTruthy()
    expect(member.name.fa).toBeTruthy()
    expect(member.name.en).toBeTruthy()
  })
})

test('famous clients have slugs and bilingual names', () => {
  expect(famousClients.length).toBeGreaterThanOrEqual(3)
  famousClients.forEach(client => {
    expect(client.slug).toBeTruthy()
    expect(client.name.fa).toBeTruthy()
  })
})

test('blog posts have slugs, titles and ISO dates', () => {
  expect(blogPosts.length).toBeGreaterThanOrEqual(3)
  blogPosts.forEach(post => {
    expect(post.slug).toBeTruthy()
    expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})

test('FAQ items have questions and answers in both languages', () => {
  expect(faqItems.length).toBeGreaterThanOrEqual(4)
  faqItems.forEach(item => {
    expect(item.question.fa).toBeTruthy()
    expect(item.answer.fa).toBeTruthy()
    expect(item.question.en).toBeTruthy()
    expect(item.answer.en).toBeTruthy()
  })
})

test('office cities includes Tehran and Dubai', () => {
  const slugs = officeCities.map(c => c.slug)
  expect(slugs).toContain('tehran')
  expect(slugs).toContain('dubai')
})
