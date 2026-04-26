'use client'
import Image from 'next/image'

interface CityCardProps {
  city: string
  country: string
  description: string
  photo: string
}

export default function CityCard({ city, country, description, photo }: CityCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl aspect-[3/4]">
      <Image
        src={photo}
        alt={city}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/images/placeholder.svg'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent" />
      <div className="absolute bottom-0 start-0 end-0 p-5">
        <p className="text-gold text-xs uppercase tracking-widest mb-1">{country}</p>
        <h3 className="font-morabba text-2xl text-cream mb-1">{city}</h3>
        <p className="text-cream/70 text-sm">{description}</p>
      </div>
    </div>
  )
}
