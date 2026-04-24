export interface BilingualString {
  fa: string
  en: string
}

export interface TeamMember {
  slug: string
  name: BilingualString
  title: BilingualString
  bio: BilingualString
  fullBio: BilingualString
  photo: string
  specializations: { fa: string[]; en: string[] }
  phone?: string
  licenseYear?: string
}

export interface FamousClient {
  slug: string
  name: BilingualString
  photo: string
  caseSummary: BilingualString
  caseDetail: BilingualString
  category: BilingualString
}

export interface BlogPost {
  slug: string
  title: BilingualString
  excerpt: BilingualString
  body: BilingualString
  coverImage: string
  date: string
  category: BilingualString
}

export interface FaqItem {
  id: string
  question: BilingualString
  answer: BilingualString
}

export interface OfficeCity {
  slug: string
  city: BilingualString
  country: BilingualString
  description: BilingualString
  photo: string
}

export interface Partner {
  name: string
  logo: string
}
