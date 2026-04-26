'use client'
import Image from 'next/image'
import Link from 'next/link'

interface ClientCardProps {
  name: string
  photo: string
  href: string
}

export default function ClientCard({ name, photo, href }: ClientCardProps) {
  return (
    <Link href={href} className="group relative block overflow-hidden rounded-lg aspect-[3/4]">
      <Image
        src={photo}
        alt={name}
        fill
        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/images/placeholder.svg'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
      <div className="absolute bottom-0 start-0 end-0 p-4">
        <p className="text-cream font-vazirmatn text-sm font-medium">{name}</p>
      </div>
    </Link>
  )
}
