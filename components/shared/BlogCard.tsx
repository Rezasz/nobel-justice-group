'use client'
import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  title: string
  excerpt: string
  coverImage: string
  date: string
  category: string
  href: string
  readMoreLabel: string
}

export default function BlogCard({
  title,
  excerpt,
  coverImage,
  date,
  category,
  href,
  readMoreLabel,
}: BlogCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-navy-light rounded-xl overflow-hidden border border-white/10 hover:border-gold/30 transition-colors"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder.svg'
          }}
        />
        <span className="absolute top-3 start-3 bg-gold text-navy text-xs font-bold px-2 py-1 rounded">
          {category}
        </span>
      </div>
      <div className="p-4">
        <p className="text-cream/50 text-xs mb-2">{date}</p>
        <h3 className="font-morabba text-lg text-cream mb-2 line-clamp-2">{title}</h3>
        <p className="text-cream/70 text-sm line-clamp-2 mb-3">{excerpt}</p>
        <span className="text-gold text-sm hover:underline">{readMoreLabel} ←</span>
      </div>
    </Link>
  )
}
