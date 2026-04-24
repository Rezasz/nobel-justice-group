import { OfficeCity } from './types'

export const officeCities: OfficeCity[] = [
  {
    slug: 'doha',
    city: { fa: 'دوحه', en: 'Doha' },
    country: { fa: 'قطر', en: 'Qatar' },
    description: { fa: 'مشاوره راهبردی', en: 'Strategic Consulting' },
    photo: '/images/cities/doha.jpg',
  },
  {
    slug: 'muscat',
    city: { fa: 'مسقط', en: 'Muscat' },
    country: { fa: 'عمان', en: 'Oman' },
    description: { fa: 'خدمات راهبردی', en: 'Strategic Services' },
    photo: '/images/cities/muscat.jpg',
  },
  {
    slug: 'dubai',
    city: { fa: 'دبی', en: 'Dubai' },
    country: { fa: 'امارات', en: 'UAE' },
    description: { fa: 'معاملات مستقل ایران-خارج', en: 'Iran-Foreign Transactions' },
    photo: '/images/cities/dubai.jpg',
  },
  {
    slug: 'tehran',
    city: { fa: 'تهران', en: 'Tehran' },
    country: { fa: 'ایران', en: 'Iran' },
    description: { fa: 'دفتر اصلی', en: 'Main Office' },
    photo: '/images/cities/tehran.jpg',
  },
]
