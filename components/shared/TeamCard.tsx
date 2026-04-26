'use client'
import Image from 'next/image'
import Button from './Button'

interface TeamCardProps {
  name: string
  title: string
  bio: string
  photo: string
  href: string
  readMoreLabel: string
}

export default function TeamCard({
  name,
  title,
  bio,
  photo,
  href,
  readMoreLabel,
}: TeamCardProps) {
  return (
    <div className="bg-navy-light rounded-xl overflow-hidden border border-white/10 hover:border-gold/30 transition-colors">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={photo}
          alt={name}
          fill
          className="object-cover object-top"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder.svg'
          }}
        />
      </div>
      <div className="p-5">
        <h3 className="font-morabba text-xl text-cream mb-1">{name}</h3>
        <p className="text-gold text-sm mb-3">{title}</p>
        <p className="text-cream/70 text-sm leading-relaxed line-clamp-3 mb-4">{bio}</p>
        <Button variant="outline" href={href} size="sm">
          {readMoreLabel}
        </Button>
      </div>
    </div>
  )
}
