import { put } from '@vercel/blob'
import { team } from '../data/team'
import { blogPosts } from '../data/blog'
import { famousClients } from '../data/clients'
import { faqItems } from '../data/faq'
import { officeCities } from '../data/services'
import { partners } from '../data/partners'

interface Collection {
  path: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

async function seed() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ BLOB_READ_WRITE_TOKEN is not set. Add it to .env.local first.')
    process.exit(1)
  }

  const collections: Collection[] = [
    { path: 'njg/data/team.json', data: team },
    { path: 'njg/data/blog.json', data: blogPosts },
    { path: 'njg/data/clients.json', data: famousClients },
    { path: 'njg/data/faq.json', data: faqItems },
    { path: 'njg/data/offices.json', data: officeCities },
    { path: 'njg/data/partners.json', data: partners },
  ]

  let blobBaseUrl = ''

  for (const { path, data } of collections) {
    const blob = await put(path, JSON.stringify(data, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json',
    })
    if (!blobBaseUrl) {
      blobBaseUrl = blob.url.substring(0, blob.url.indexOf('/njg/'))
    }
    console.log(`✓ ${path}`)
  }

  console.log('\n✅ Seed complete! Add these to .env.local and Vercel env vars:')
  console.log(`BLOB_BASE_URL=${blobBaseUrl}`)
}

seed().catch(console.error)
