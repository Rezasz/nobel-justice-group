import { notFound } from 'next/navigation'
import { SCHEMAS } from '@/components/admin/schemas'
import CollectionPage from '@/components/admin/CollectionPage'

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const { section } = await params
  const schema = SCHEMAS[section]
  if (!schema) notFound()

  return <CollectionPage collection={section} schema={schema} />
}

export function generateStaticParams() {
  return Object.keys(SCHEMAS).map((section) => ({ section }))
}
