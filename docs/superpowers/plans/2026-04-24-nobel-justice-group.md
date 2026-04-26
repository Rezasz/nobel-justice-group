# Nobel Justice Group — Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (Farsi/English) RTL-first Next.js 14 website for Nobel Justice Group legal firm with 10 pages, shared component library, and static data layer.

**Architecture:** Next.js 14 App Router with `[locale]` segment routing (fa/en), next-intl v3 for i18n, Tailwind CSS with custom navy+gold design tokens. All content hardcoded in TypeScript data files. `app/[locale]/layout.tsx` sets `dir="rtl"` for Farsi and `dir="ltr"` for English and switches font classes per locale.

**Tech Stack:** Next.js 14, TypeScript 5, Tailwind CSS 3, next-intl 3, Morabba (self-hosted) + Vazirmatn (Google Fonts), Jest + React Testing Library, Vercel deployment.

---

## File Map

```
web/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx               # RTL/LTR, fonts, NextIntlClientProvider
│   │   ├── page.tsx                 # Home
│   │   ├── about/page.tsx
│   │   ├── team/page.tsx
│   │   ├── team/[slug]/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── famous-clients/page.tsx
│   │   ├── famous-clients/[slug]/page.tsx
│   │   ├── attorney-abroad/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── blog/page.tsx
│   │   └── blog/[slug]/page.tsx
│   └── globals.css                  # Tailwind directives + font-face
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── NavDropdown.tsx
│   │   ├── LocaleToggle.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── AboutSnippet.tsx
│   │   ├── FamousClientsCarousel.tsx
│   │   ├── AttorneyAbroadBanner.tsx
│   │   ├── InternationalOffices.tsx
│   │   ├── ClientLogos.tsx
│   │   ├── BlogPreview.tsx
│   │   ├── FAQPreview.tsx
│   │   ├── ConsultationCTA.tsx
│   │   └── CoreValues.tsx
│   └── shared/
│       ├── Button.tsx
│       ├── SectionTitle.tsx
│       ├── Container.tsx
│       ├── PageHero.tsx
│       ├── Accordion.tsx
│       ├── ClientCard.tsx
│       ├── TeamCard.tsx
│       ├── BlogCard.tsx
│       └── CityCard.tsx
├── data/
│   ├── types.ts                     # All shared TypeScript interfaces
│   ├── team.ts
│   ├── clients.ts
│   ├── blog.ts
│   ├── faq.ts
│   ├── services.ts
│   └── partners.ts
├── i18n/
│   ├── routing.ts
│   └── request.ts
├── messages/
│   ├── fa.json
│   └── en.json
├── public/
│   └── fonts/
│       ├── Morabba-Bold.woff2
│       └── Morabba-Medium.woff2
├── middleware.ts
├── next.config.ts
├── tailwind.config.ts
└── jest.config.ts
```

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `web/` (directory)
- Create: `web/package.json` (via create-next-app)
- Create: `web/jest.config.ts`
- Create: `web/jest.setup.ts`

- [ ] **Step 1: Create the Next.js app**

Run from `/Users/rezasahebozamani/Documents/source/Nobel Justice Group/`:
```bash
npx create-next-app@14 web \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --no-git
```
Expected: `web/` directory created with Next.js 14 structure.

- [ ] **Step 2: Install additional dependencies**

```bash
cd web
npm install next-intl@3
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest @types/jest
```

- [ ] **Step 3: Configure Jest**

Create `web/jest.config.ts`:
```ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

Create `web/jest.setup.ts`:
```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Verify scaffold compiles**

```bash
cd web && npm run build
```
Expected: Build succeeds with default Next.js page.

- [ ] **Step 5: Commit**

```bash
cd web && git init && git add . && git commit -m "feat: scaffold Next.js 14 project with TypeScript, Tailwind, jest"
```

---

## Task 2: Configure Tailwind Design Tokens + Fonts

**Files:**
- Modify: `web/tailwind.config.ts`
- Modify: `web/app/globals.css`
- Create: `web/public/fonts/` (add Morabba font files manually)

- [ ] **Step 1: Download Morabba font**

Download `Morabba-Bold.woff2` and `Morabba-Medium.woff2` from the Morabba font GitHub repository (github.com/rastikerdar/morabba-font) and place them in `web/public/fonts/`.

- [ ] **Step 2: Update tailwind.config.ts**

Replace `web/tailwind.config.ts` with:
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1B2B3A',
          light: '#243447',
          lighter: '#2D3E50',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#D4B96A',
          dark: '#A8893A',
        },
        cream: '#F5F0E8',
      },
      fontFamily: {
        morabba: ['var(--font-morabba)', 'sans-serif'],
        vazirmatn: ['var(--font-vazirmatn)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 3: Update globals.css**

Replace `web/app/globals.css` with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@font-face {
  font-family: 'Morabba';
  src: url('/fonts/Morabba-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Morabba';
  src: url('/fonts/Morabba-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@layer base {
  body {
    @apply bg-navy text-cream;
  }

  h1, h2, h3 {
    @apply font-morabba;
  }
}
```

- [ ] **Step 4: Write smoke test for Tailwind tokens**

Create `web/__tests__/tailwind.test.ts`:
```ts
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config'

const fullConfig = resolveConfig(tailwindConfig)

test('navy color token is defined', () => {
  expect((fullConfig.theme.colors as any).navy.DEFAULT).toBe('#1B2B3A')
})

test('gold color token is defined', () => {
  expect((fullConfig.theme.colors as any).gold.DEFAULT).toBe('#C9A84C')
})
```

- [ ] **Step 5: Run test**

```bash
cd web && npx jest __tests__/tailwind.test.ts --no-coverage
```
Expected: 2 tests pass.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: configure Tailwind design tokens and Morabba/Vazirmatn fonts"
```

---

## Task 3: Set Up next-intl i18n + Locale Layout

**Files:**
- Create: `web/i18n/routing.ts`
- Create: `web/i18n/request.ts`
- Create: `web/middleware.ts`
- Modify: `web/next.config.ts`
- Create: `web/messages/fa.json`
- Create: `web/messages/en.json`
- Create: `web/app/[locale]/layout.tsx`

- [ ] **Step 1: Create routing config**

Create `web/i18n/routing.ts`:
```ts
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['fa', 'en'] as const,
  defaultLocale: 'fa',
})

export type Locale = (typeof routing.locales)[number]
```

- [ ] **Step 2: Create server request config**

Create `web/i18n/request.ts`:
```ts
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
```

- [ ] **Step 3: Create middleware**

Create `web/middleware.ts`:
```ts
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
}
```

- [ ] **Step 4: Update next.config.ts**

Replace `web/next.config.ts`:
```ts
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig = {
  images: {
    remotePatterns: [],
  },
}

export default withNextIntl(nextConfig)
```

- [ ] **Step 5: Create Farsi messages skeleton**

Create `web/messages/fa.json`:
```json
{
  "nav": {
    "home": "صفحه اصلی",
    "about": "درباره ما",
    "team": "تیم ما",
    "services": "خدمات ما",
    "famousClients": "موکلین شناخته شده",
    "blog": "مقالات",
    "faq": "سوالات متداول",
    "contact": "تماس با ما",
    "attorneyAbroad": "وکیل ایرانیان خارج از کشور"
  },
  "home": {
    "heroTitle": "بی رحمانه صادق باش",
    "heroSubtitle": "گروه دادگستر نوبل",
    "heroCtaPrimary": "مشاوره رایگان",
    "heroCtaSecondary": "بیشتر بدانید",
    "aboutTitle": "درباره ما",
    "aboutText": "گروه دادگستر نوبل با بیش از ۱۵ سال تجربه در زمینه حقوق بین‌الملل و داخلی، آماده ارائه بهترین خدمات حقوقی به شما است.",
    "aboutCta": "بیشتر بدانید",
    "famousClientsTitle": "موکلین شناخته شده",
    "attorneyAbroadTitle": "وکیل ایرانیان خارج از کشور",
    "attorneyAbroadText": "با بیش از یک دهه تجربه در نمایندگی ایرانیان خارج از کشور، ما راه‌حل‌های حقوقی جامعی برای هموطنان عزیزمان در سراسر جهان ارائه می‌دهیم.",
    "attorneyAbroadCta": "ادامه مطلب",
    "internationalTitle": "خدمات حقوق بین الملل",
    "clientsTitle": "مشتریان ما",
    "blogTitle": "مقالات",
    "blogCta": "مشاهده همه",
    "faqTitle": "پرسش های متداول شما",
    "faqCta": "مشاهده همه سوالات",
    "consultationTitle": "مشاوره خصوصی خود را رزرو کنید",
    "consultationCta": "رزرو مشاوره",
    "valuesTitle": "ارزش های بنیادین ما"
  },
  "about": {
    "title": "درباره ما",
    "heroTitle": "گروه دادگستر نوبل",
    "heroSubtitle": "ایجاد پل ارتباطی میان چالش‌ها و فرصت‌ها",
    "missionTitle": "ماموریت ما",
    "missionSubtitle": "ارائه هوش حقوقی پیشرفته و شفافیت کامل در سطح بین‌المللی",
    "partnersTitle": "شرکای جهانی ما"
  },
  "team": {
    "title": "تیم ما",
    "readMore": "مطالعه بیشتر",
    "contactCta": "تماس با ما"
  },
  "famousClients": {
    "title": "موکلین شناخته شده",
    "subtitle": "پرونده‌های موفق و دادگری در حوزه جرایم بزرگ و دفاع کیفری"
  },
  "attorneyAbroad": {
    "title": "وکیل ایرانیان خارج از کشور",
    "subtitle": "موضوعات حقوقی ایرانیان خارج از کشور",
    "consultationCta": "رزرو مشاوره"
  },
  "faq": {
    "title": "پرسش های متداول شما",
    "consultationCta": "رزرو مشاوره"
  },
  "blog": {
    "title": "مقالات",
    "readMore": "ادامه مطلب",
    "relatedTitle": "مقالات مرتبط"
  },
  "contact": {
    "title": "تماس با ما",
    "heroTitle": "ارتباط با گروه حقوقی دادگستر نوبل",
    "heroText": "فعالیت ما با رعایت کامل مناقبت‌ها و واژگاری است. برای رزرو مشاوره خصوصی یا پرس‌وجو در مورد پرونده‌ای، تماس بگیرید.",
    "formTitle": "ارسال پیام",
    "namePlaceholder": "نام",
    "lastNamePlaceholder": "نام و نام خانوادگی",
    "emailPlaceholder": "ایمیل",
    "phonePlaceholder": "شماره همراه",
    "subjectPlaceholder": "موضوع را انتخاب کنید",
    "messagePlaceholder": "متن پیام",
    "submitCta": "رزرو مشاوره",
    "addressLabel": "آدرس",
    "phoneLabel": "تلفن",
    "address": "ایران، تهران، نقاطع اندرزگو و پاسداران شمالی، چهارراه فرمانیه، نارنجستان هفتم، بلک ۲، طبقه ۳، واحد ۳۱",
    "phone1": "(+۹۸) ۲۱-۲۲۶۶۷۷۶۳",
    "phone2": "(+۹۸) ۹۲-۱۰۰"
  },
  "footer": {
    "support": "پشتیبانی",
    "hours": "شنبه–پنج‌شنبه ۱۷:۰۰–۱۳:۰۰",
    "legalInfo": "اطلاعات حقوقی",
    "privacy": "سیاست حفظ حریم خصوصی",
    "terms": "شرایط و ضوابط",
    "disclaimer": "سایت مسئولیت",
    "contactUs": "ارتباط با ما",
    "copyright": "© ۲۰۲۴ گروه دادگستر نوبل. تمامی حقوق محفوظ است."
  },
  "values": {
    "honesty": "صداقت و شفافیت",
    "honestyDesc": "ما به صداقت کامل با موکلین خود پایبندیم",
    "expertise": "تخصص و دانش",
    "expertiseDesc": "سال‌ها تجربه در حقوق بین‌الملل و داخلی",
    "trust": "امانت‌داری",
    "trustDesc": "حفظ اسرار موکل و رعایت اخلاق حرفه‌ای",
    "innovation": "نوآوری",
    "innovationDesc": "استفاده از روش‌های نوین در ارائه خدمات حقوقی"
  }
}
```

- [ ] **Step 6: Create English messages**

Create `web/messages/en.json`:
```json
{
  "nav": {
    "home": "Home",
    "about": "About Us",
    "team": "Our Team",
    "services": "Services",
    "famousClients": "Famous Clients",
    "blog": "Articles",
    "faq": "FAQ",
    "contact": "Contact Us",
    "attorneyAbroad": "Attorney for Iranians Abroad"
  },
  "home": {
    "heroTitle": "Be mercilessly honest",
    "heroSubtitle": "Nobel Justice Group",
    "heroCtaPrimary": "Free Consultation",
    "heroCtaSecondary": "Learn More",
    "aboutTitle": "About Us",
    "aboutText": "Nobel Justice Group, with over 15 years of experience in international and domestic law, is ready to provide you with the best legal services.",
    "aboutCta": "Learn More",
    "famousClientsTitle": "Famous Clients",
    "attorneyAbroadTitle": "Attorney for Iranians Abroad",
    "attorneyAbroadText": "With over a decade of experience representing Iranians abroad, we provide comprehensive legal solutions for our compatriots around the world.",
    "attorneyAbroadCta": "Read More",
    "internationalTitle": "International Legal Services",
    "clientsTitle": "Our Clients",
    "blogTitle": "Articles",
    "blogCta": "View All",
    "faqTitle": "Frequently Asked Questions",
    "faqCta": "View All Questions",
    "consultationTitle": "Book Your Private Consultation",
    "consultationCta": "Book Consultation",
    "valuesTitle": "Our Core Values"
  },
  "about": {
    "title": "About Us",
    "heroTitle": "Nobel Justice Group",
    "heroSubtitle": "Building bridges between challenges and opportunities",
    "missionTitle": "Our Mission",
    "missionSubtitle": "Providing advanced legal intelligence and full transparency at an international level",
    "partnersTitle": "Our Global Partners"
  },
  "team": {
    "title": "Our Team",
    "readMore": "Read More",
    "contactCta": "Contact Us"
  },
  "famousClients": {
    "title": "Famous Clients",
    "subtitle": "Successful cases and justice in major crimes and criminal defense"
  },
  "attorneyAbroad": {
    "title": "Attorney for Iranians Abroad",
    "subtitle": "Legal Topics for Iranians Outside Iran",
    "consultationCta": "Book Consultation"
  },
  "faq": {
    "title": "Frequently Asked Questions",
    "consultationCta": "Book Consultation"
  },
  "blog": {
    "title": "Articles",
    "readMore": "Read More",
    "relatedTitle": "Related Articles"
  },
  "contact": {
    "title": "Contact Us",
    "heroTitle": "Contact Nobel Justice Group",
    "heroText": "We operate with full confidentiality. To book a private consultation or inquire about a case, please get in touch.",
    "formTitle": "Send a Message",
    "namePlaceholder": "First Name",
    "lastNamePlaceholder": "Full Name",
    "emailPlaceholder": "Email",
    "phonePlaceholder": "Phone Number",
    "subjectPlaceholder": "Select a Subject",
    "messagePlaceholder": "Your Message",
    "submitCta": "Book Consultation",
    "addressLabel": "Address",
    "phoneLabel": "Phone",
    "address": "Iran, Tehran, Andarzgoo & North Pasdaran intersection, Farmaniyeh crossroads, Narenjestan 7th, Block 2, Floor 3, Unit 31",
    "phone1": "(+98) 21-22667763",
    "phone2": "(+98) 92-100"
  },
  "footer": {
    "support": "Support",
    "hours": "Sat–Thu 13:00–17:00",
    "legalInfo": "Legal Information",
    "privacy": "Privacy Policy",
    "terms": "Terms & Conditions",
    "disclaimer": "Disclaimer",
    "contactUs": "Contact Us",
    "copyright": "© 2024 Nobel Justice Group. All rights reserved."
  },
  "values": {
    "honesty": "Honesty & Transparency",
    "honestyDesc": "We are fully committed to honesty with our clients",
    "expertise": "Expertise & Knowledge",
    "expertiseDesc": "Years of experience in international and domestic law",
    "trust": "Trustworthiness",
    "trustDesc": "Maintaining client confidentiality and professional ethics",
    "innovation": "Innovation",
    "innovationDesc": "Using modern methods in providing legal services"
  }
}
```

- [ ] **Step 7: Create locale layout**

Create `web/app/[locale]/layout.tsx`:
```tsx
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Vazirmatn } from 'next/font/google'
import { Inter } from 'next/font/google'
import { routing } from '@/i18n/routing'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import '@/app/globals.css'

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nobel Justice Group | گروه دادگستر نوبل',
  description: 'Hosein Shahrokhi & Partners — International Legal Services',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()
  const isRtl = locale === 'fa'

  return (
    <html
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`${vazirmatn.variable} ${inter.variable}`}
    >
      <body
        className={`
          bg-navy text-cream antialiased
          ${isRtl ? 'font-vazirmatn' : 'font-inter'}
        `}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 8: Write test for locale layout direction**

Create `web/__tests__/i18n.test.ts`:
```ts
import { routing } from '@/i18n/routing'

test('routing has fa as default locale', () => {
  expect(routing.defaultLocale).toBe('fa')
})

test('routing includes fa and en locales', () => {
  expect(routing.locales).toContain('fa')
  expect(routing.locales).toContain('en')
})
```

- [ ] **Step 9: Run test**

```bash
cd web && npx jest __tests__/i18n.test.ts --no-coverage
```
Expected: 2 tests pass.

- [ ] **Step 10: Commit**

```bash
git add -A && git commit -m "feat: configure next-intl i18n with fa/en routing and locale layout"
```

---

## Task 4: Create TypeScript Data Layer

**Files:**
- Create: `web/data/types.ts`
- Create: `web/data/team.ts`
- Create: `web/data/clients.ts`
- Create: `web/data/blog.ts`
- Create: `web/data/faq.ts`
- Create: `web/data/services.ts`
- Create: `web/data/partners.ts`

- [ ] **Step 1: Create shared types**

Create `web/data/types.ts`:
```ts
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
  photo: string          // path relative to /public
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
  date: string           // ISO date string
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
  logo: string           // path relative to /public
}
```

- [ ] **Step 2: Create team data**

Create `web/data/team.ts`:
```ts
import { TeamMember } from './types'

export const team: TeamMember[] = [
  {
    slug: 'hosein-shahrokhi',
    name: { fa: 'حسین شاهرخی', en: 'Hosein Shahrokhi' },
    title: { fa: 'بنیانگذار و مدیر عامل', en: 'Founder & Managing Partner' },
    bio: {
      fa: 'بنیانگذار گروه دادگستر نوبل با بیش از ۱۵ سال تجربه در حقوق بین‌الملل و داخلی.',
      en: 'Founder of Nobel Justice Group with over 15 years of experience in international and domestic law.',
    },
    fullBio: {
      fa: 'حسین شاهرخی، بنیانگذار گروه دادگستر نوبل، با بیش از ۱۵ سال تجربه در زمینه حقوق بین‌الملل، تجاری و کیفری، یکی از برجسته‌ترین وکلای ایران است. ایشان در دانشگاه‌های معتبر داخل و خارج از کشور تحصیل کرده و پرونده‌های بسیاری در دادگاه‌های بین‌المللی را با موفقیت به سرانجام رسانده‌اند.',
      en: 'Hosein Shahrokhi, founder of Nobel Justice Group, with over 15 years of experience in international, commercial and criminal law, is one of Iran\'s most distinguished lawyers. He has studied at reputable universities both inside and outside Iran and has successfully handled many cases in international courts.',
    },
    photo: '/images/team/hosein-shahrokhi.jpg',
    specializations: {
      fa: ['حقوق بین‌الملل', 'حقوق تجاری', 'حقوق کیفری', 'دعاوی بین‌المللی'],
      en: ['International Law', 'Commercial Law', 'Criminal Law', 'International Litigation'],
    },
    phone: '(+۹۸) ۲۱-۲۲۶۶۷۷۶۳',
    licenseYear: '۱۳۸۵',
  },
  {
    slug: 'mehmet-alkag',
    name: { fa: 'مهمت آلکاق', en: 'Mehmet Alkag' },
    title: { fa: 'شریک بین‌المللی', en: 'International Partner' },
    bio: {
      fa: 'شریک بین‌المللی گروه با تخصص در حقوق ترکیه و اتحادیه اروپا.',
      en: 'International partner specializing in Turkish and EU law.',
    },
    fullBio: {
      fa: 'مهمت آلکاق، وکیل برجسته ترکیه‌ای، با تخصص در حقوق تجاری بین‌الملل و حقوق اتحادیه اروپا، از سال ۱۳۹۸ با گروه دادگستر نوبل همکاری می‌کند.',
      en: 'Mehmet Alkag, a distinguished Turkish lawyer specializing in international commercial law and EU law, has been collaborating with Nobel Justice Group since 2019.',
    },
    photo: '/images/team/mehmet-alkag.jpg',
    specializations: {
      fa: ['حقوق اتحادیه اروپا', 'حقوق تجاری بین‌الملل'],
      en: ['EU Law', 'International Commercial Law'],
    },
    licenseYear: '۱۳۹۸',
  },
  {
    slug: 'ismail-haqqani',
    name: { fa: 'اسماعیل حقانی', en: 'Ismail Haqqani' },
    title: { fa: 'مشاور حقوقی ارشد', en: 'Senior Legal Advisor' },
    bio: {
      fa: 'مشاور حقوقی ارشد با تخصص در حقوق خانواده و اموال.',
      en: 'Senior legal advisor specializing in family and property law.',
    },
    fullBio: {
      fa: 'اسماعیل حقانی با بیش از ۱۰ سال تجربه در زمینه حقوق خانواده، اموال و وراثت، یکی از اعضای اصلی گروه دادگستر نوبل است.',
      en: 'Ismail Haqqani, with over 10 years of experience in family, property and inheritance law, is a core member of Nobel Justice Group.',
    },
    photo: '/images/team/ismail-haqqani.jpg',
    specializations: {
      fa: ['حقوق خانواده', 'حقوق اموال', 'حقوق وراثت'],
      en: ['Family Law', 'Property Law', 'Inheritance Law'],
    },
    licenseYear: '۱۳۹۰',
  },
  {
    slug: 'hamideh-farmahini',
    name: { fa: 'حمیده فرماهینی', en: 'Hamideh Farmahini' },
    title: { fa: 'وکیل دادگستری', en: 'Attorney at Law' },
    bio: {
      fa: 'وکیل دادگستری متخصص در حقوق کیفری و دعاوی حقوقی.',
      en: 'Attorney at law specializing in criminal law and civil litigation.',
    },
    fullBio: {
      fa: 'حمیده فرماهینی، وکیل دادگستری با تخصص در حقوق کیفری، با پرونده‌های متعدد در دادگاه‌های تهران سابقه درخشانی دارد.',
      en: 'Hamideh Farmahini, an attorney specializing in criminal law, has an outstanding record with numerous cases in Tehran courts.',
    },
    photo: '/images/team/hamideh-farmahini.jpg',
    specializations: {
      fa: ['حقوق کیفری', 'دعاوی حقوقی'],
      en: ['Criminal Law', 'Civil Litigation'],
    },
    licenseYear: '۱۳۹۲',
  },
  {
    slug: 'neda-roushan',
    name: { fa: 'ندا روشن', en: 'Neda Roushan' },
    title: { fa: 'مشاور حقوق بین‌الملل', en: 'International Law Consultant' },
    bio: {
      fa: 'مشاور تخصصی در حقوق بین‌الملل و نمایندگی ایرانیان خارج از کشور.',
      en: 'Specialist consultant in international law and representing Iranians abroad.',
    },
    fullBio: {
      fa: 'ندا روشن با تخصص در حقوق بین‌الملل و تجربه گسترده در نمایندگی ایرانیان مقیم خارج از کشور، مشاور ارشد گروه در این حوزه است.',
      en: 'Neda Roushan, specializing in international law and with extensive experience representing Iranians living abroad, is the group\'s senior consultant in this area.',
    },
    photo: '/images/team/neda-roushan.jpg',
    specializations: {
      fa: ['حقوق بین‌الملل', 'نمایندگی ایرانیان خارج'],
      en: ['International Law', 'Representation of Iranians Abroad'],
    },
    licenseYear: '۱۳۹۳',
  },
  {
    slug: 'hamed-sadra',
    name: { fa: 'حامد صدرا', en: 'Hamed Sadra' },
    title: { fa: 'وکیل ارشد', en: 'Senior Attorney' },
    bio: {
      fa: 'وکیل ارشد با تخصص در حقوق تجاری و قراردادها.',
      en: 'Senior attorney specializing in commercial law and contracts.',
    },
    fullBio: {
      fa: 'حامد صدرا با تخصص در حقوق تجاری، قراردادهای بین‌المللی و حل‌وفصل اختلافات، یکی از وکلای ارشد گروه دادگستر نوبل است.',
      en: 'Hamed Sadra, specializing in commercial law, international contracts and dispute resolution, is one of Nobel Justice Group\'s senior attorneys.',
    },
    photo: '/images/team/hamed-sadra.jpg',
    specializations: {
      fa: ['حقوق تجاری', 'قراردادهای بین‌المللی', 'حل‌وفصل اختلافات'],
      en: ['Commercial Law', 'International Contracts', 'Dispute Resolution'],
    },
    licenseYear: '۱۳۸۸',
  },
]
```

- [ ] **Step 3: Create famous clients data**

Create `web/data/clients.ts`:
```ts
import { FamousClient } from './types'

export const famousClients: FamousClient[] = [
  {
    slug: 'mehran-maham-zohreh-fakour-sabour',
    name: { fa: 'مهران مهام و زهره فکور صبور', en: 'Mehran Maham & Zohreh Fakour Sabour' },
    photo: '/images/clients/mehran-maham.jpg',
    caseSummary: {
      fa: 'احقاق حق و عدالت پس از فقدان',
      en: 'Justice and rights restoration after loss',
    },
    caseDetail: {
      fa: 'پس از ماه‌ها ناکامی و مشکوک، این پرونده‌های پیچیده توسط گروه دادگستر نوبل با موفقیت به سرانجام رسید.',
      en: 'After months of setbacks and suspicion, these complex cases were successfully resolved by Nobel Justice Group.',
    },
    category: { fa: 'حقوق کیفری', en: 'Criminal Law' },
  },
  {
    slug: 'hamid-sefat',
    name: { fa: 'حمید صفت', en: 'Hamid Sefat' },
    photo: '/images/clients/hamid-sefat.jpg',
    caseSummary: {
      fa: 'دفاع حقوقی در پرونده کیفری',
      en: 'Legal defense in criminal case',
    },
    caseDetail: {
      fa: 'نمایندگی و دفاع از حقوق موکل در دادگاه‌های ایران با نتیجه موفقیت‌آمیز.',
      en: 'Representation and defense of client rights in Iranian courts with a successful outcome.',
    },
    category: { fa: 'حقوق کیفری', en: 'Criminal Law' },
  },
  {
    slug: 'ali-yasini',
    name: { fa: 'علی یاسینی', en: 'Ali Yasini' },
    photo: '/images/clients/ali-yasini.jpg',
    caseSummary: {
      fa: 'حل‌وفصل پرونده حقوقی پیچیده',
      en: 'Resolution of complex legal case',
    },
    caseDetail: {
      fa: 'گروه دادگستر نوبل با بررسی دقیق پرونده، بهترین راهکار قانونی را ارائه داد.',
      en: 'Nobel Justice Group, through careful case analysis, provided the best legal solution.',
    },
    category: { fa: 'حقوق مدنی', en: 'Civil Law' },
  },
  {
    slug: 'sohrab-pakzad',
    name: { fa: 'سهراب پاکزاد', en: 'Sohrab Pakzad' },
    photo: '/images/clients/sohrab-pakzad.jpg',
    caseSummary: {
      fa: 'دفاع موفق در پرونده رسانه‌ای',
      en: 'Successful defense in media case',
    },
    caseDetail: {
      fa: 'نمایندگی در پرونده‌ای که توجه رسانه‌های داخلی را به خود جلب کرد.',
      en: 'Representation in a case that attracted significant domestic media attention.',
    },
    category: { fa: 'حقوق رسانه', en: 'Media Law' },
  },
  {
    slug: 'solmaz-hosseini',
    name: { fa: 'سلماز حسینی', en: 'Solmaz Hosseini' },
    photo: '/images/clients/solmaz-hosseini.jpg',
    caseSummary: {
      fa: 'احقاق حقوق در پرونده خانوادگی',
      en: 'Rights restoration in family case',
    },
    caseDetail: {
      fa: 'حل پرونده خانوادگی پیچیده با رعایت کامل حریم خصوصی موکل.',
      en: 'Resolution of complex family case with full respect for client privacy.',
    },
    category: { fa: 'حقوق خانواده', en: 'Family Law' },
  },
  {
    slug: 'reza-sadeghi',
    name: { fa: 'رضا صادقی', en: 'Reza Sadeghi' },
    photo: '/images/clients/reza-sadeghi.jpg',
    caseSummary: {
      fa: 'دفاع در پرونده تجاری',
      en: 'Defense in commercial case',
    },
    caseDetail: {
      fa: 'نمایندگی موفق در پرونده تجاری با نتیجه مطلوب برای موکل.',
      en: 'Successful representation in commercial case with a favorable outcome for the client.',
    },
    category: { fa: 'حقوق تجاری', en: 'Commercial Law' },
  },
]
```

- [ ] **Step 4: Create blog data**

Create `web/data/blog.ts`:
```ts
import { BlogPost } from './types'

export const blogPosts: BlogPost[] = [
  {
    slug: 'vakil-irani-kharej-az-keshvar',
    title: {
      fa: 'وکیل ایرانی خارج از کشور: راهنمای جامع',
      en: 'Iranian Lawyer Abroad: A Comprehensive Guide',
    },
    excerpt: {
      fa: 'راهنمای جامعی برای ایرانیانی که خارج از کشور زندگی می‌کنند و به خدمات حقوقی نیاز دارند.',
      en: 'A comprehensive guide for Iranians living abroad who need legal services.',
    },
    body: {
      fa: 'محتوای کامل مقاله در اینجا...',
      en: 'Full article content here...',
    },
    coverImage: '/images/blog/vakil-irani-kharej.jpg',
    date: '2024-01-15',
    category: { fa: 'حقوق بین‌الملل', en: 'International Law' },
  },
  {
    slug: 'hoquq-khanevadeh-irani',
    title: {
      fa: 'راهنمای حقوق خانواده برای ایرانیان',
      en: 'Family Law Guide for Iranians',
    },
    excerpt: {
      fa: 'آشنایی با قوانین خانواده در ایران و تفاوت‌های آن با قوانین سایر کشورها.',
      en: 'Understanding family laws in Iran and their differences with laws of other countries.',
    },
    body: {
      fa: 'محتوای کامل مقاله در اینجا...',
      en: 'Full article content here...',
    },
    coverImage: '/images/blog/hoquq-khanevadeh.jpg',
    date: '2024-01-10',
    category: { fa: 'حقوق خانواده', en: 'Family Law' },
  },
  {
    slug: 'bimi-hoquqi-sherkat',
    title: {
      fa: 'بیمه حقوقی برای شرکت‌ها: ضرورت یا انتخاب؟',
      en: 'Legal Insurance for Companies: Necessity or Choice?',
    },
    excerpt: {
      fa: 'بررسی اهمیت داشتن پشتیبانی حقوقی مستمر برای کسب‌وکارها.',
      en: 'Examining the importance of ongoing legal support for businesses.',
    },
    body: {
      fa: 'محتوای کامل مقاله در اینجا...',
      en: 'Full article content here...',
    },
    coverImage: '/images/blog/bimi-hoquqi.jpg',
    date: '2024-01-05',
    category: { fa: 'حقوق تجاری', en: 'Commercial Law' },
  },
  {
    slug: 'mobarezeh-ba-corruption',
    title: {
      fa: 'مبارزه با فساد: نقش وکیل در دادگاه‌های ایران',
      en: 'Fighting Corruption: The Role of a Lawyer in Iranian Courts',
    },
    excerpt: {
      fa: 'نگاهی به نقش وکلا در پرونده‌های فساد اداری و اقتصادی.',
      en: 'A look at the role of lawyers in administrative and economic corruption cases.',
    },
    body: {
      fa: 'محتوای کامل مقاله در اینجا...',
      en: 'Full article content here...',
    },
    coverImage: '/images/blog/mobarezeh-corruption.jpg',
    date: '2023-12-28',
    category: { fa: 'حقوق کیفری', en: 'Criminal Law' },
  },
  {
    slug: 'qardad-beynolmelali',
    title: {
      fa: 'قرارداد بین‌المللی: نکات کلیدی',
      en: 'International Contracts: Key Points',
    },
    excerpt: {
      fa: 'نکات مهمی که باید در تنظیم قراردادهای بین‌المللی رعایت شود.',
      en: 'Important points to consider when drafting international contracts.',
    },
    body: {
      fa: 'محتوای کامل مقاله در اینجا...',
      en: 'Full article content here...',
    },
    coverImage: '/images/blog/qardad-beynolmelali.jpg',
    date: '2023-12-20',
    category: { fa: 'حقوق بین‌الملل', en: 'International Law' },
  },
  {
    slug: 'arzesh-haye-bonyadin-vakil',
    title: {
      fa: 'ارزش‌های بنیادین یک وکیل: تخصص، امانت و صداقت',
      en: 'Core Values of a Lawyer: Expertise, Trust and Honesty',
    },
    excerpt: {
      fa: 'بررسی ارزش‌هایی که یک وکیل حرفه‌ای باید داشته باشد.',
      en: 'Examining the values a professional lawyer should possess.',
    },
    body: {
      fa: 'محتوای کامل مقاله در اینجا...',
      en: 'Full article content here...',
    },
    coverImage: '/images/blog/arzesh-haye-bonyadin.jpg',
    date: '2023-12-15',
    category: { fa: 'اخلاق حرفه‌ای', en: 'Professional Ethics' },
  },
]
```

- [ ] **Step 5: Create FAQ data**

Create `web/data/faq.ts`:
```ts
import { FaqItem } from './types'

export const faqItems: FaqItem[] = [
  {
    id: 'faq-1',
    question: {
      fa: 'به چه دلیلی باید از یک وکیل دادگستری استفاده کنم؟',
      en: 'Why should I use an attorney?',
    },
    answer: {
      fa: 'در بسیاری از موارد قانونی، داشتن وکیل متخصص می‌تواند تفاوت چشمگیری در نتیجه پرونده شما ایجاد کند. وکیل با آگاهی کامل از قوانین، می‌تواند حقوق شما را به بهترین شکل ممکن دفاع کند.',
      en: 'In many legal matters, having a specialized attorney can make a significant difference in the outcome of your case. An attorney, with full knowledge of the law, can defend your rights in the best possible way.',
    },
  },
  {
    id: 'faq-2',
    question: {
      fa: 'پشتیبانی گروه حقوقی دادگستر نوبل به چه معناست؟',
      en: 'What does support from Nobel Justice Group mean?',
    },
    answer: {
      fa: 'گروه دادگستر نوبل در تمامی مراحل پرونده شما در کنارتان است. از مشاوره اولیه تا نتیجه نهایی، تیم ما همواره در دسترس شما خواهد بود.',
      en: 'Nobel Justice Group is by your side throughout all stages of your case. From initial consultation to the final outcome, our team will always be available to you.',
    },
  },
  {
    id: 'faq-3',
    question: {
      fa: 'پشتیبانی گروه حقوقی دادگستر نوبل به چه معناست ۲؟',
      en: 'What does support from Nobel Justice Group mean (2)?',
    },
    answer: {
      fa: 'ما خدمات مشاوره‌ای، تهیه اسناد حقوقی، نمایندگی در دادگاه و پیگیری پرونده را به صورت یکپارچه ارائه می‌دهیم.',
      en: 'We provide advisory services, legal document preparation, court representation and case follow-up in an integrated manner.',
    },
  },
  {
    id: 'faq-4',
    question: {
      fa: 'پشتیبانی گروه حقوقی دادگستر نوبل به چه معناست ۳؟',
      en: 'What is the fee structure at Nobel Justice Group?',
    },
    answer: {
      fa: 'هزینه‌های حقوقی بسته به نوع پرونده و پیچیدگی آن متفاوت است. در جلسه مشاوره اولیه، تیم ما برآورد دقیقی از هزینه‌ها ارائه خواهد داد.',
      en: 'Legal fees vary depending on the type and complexity of the case. In the initial consultation, our team will provide an accurate cost estimate.',
    },
  },
  {
    id: 'faq-5',
    question: {
      fa: 'آیا می‌توانم از خارج از کشور با گروه دادگستر نوبل مشاوره بگیرم؟',
      en: 'Can I consult with Nobel Justice Group from abroad?',
    },
    answer: {
      fa: 'بله، ما خدمات مشاوره آنلاین برای ایرانیان خارج از کشور ارائه می‌دهیم. می‌توانید از طریق ویدئوکال یا تلفن با تیم ما در ارتباط باشید.',
      en: 'Yes, we provide online consultation services for Iranians abroad. You can contact our team via video call or phone.',
    },
  },
  {
    id: 'faq-6',
    question: {
      fa: 'چه مدت طول می‌کشد تا پرونده‌ام حل شود؟',
      en: 'How long does it take to resolve my case?',
    },
    answer: {
      fa: 'مدت زمان رسیدگی به پرونده بستگی به نوع و پیچیدگی آن دارد. تیم ما همواره تلاش می‌کند در کمترین زمان ممکن بهترین نتیجه را برای شما به دست آورد.',
      en: 'The duration of case proceedings depends on its type and complexity. Our team always strives to achieve the best result for you in the shortest possible time.',
    },
  },
  {
    id: 'faq-7',
    question: {
      fa: 'آیا اطلاعات پرونده من محرمانه باقی می‌ماند؟',
      en: 'Will my case information remain confidential?',
    },
    answer: {
      fa: 'بله، رازداری و حفظ حریم خصوصی موکل از اصول اساسی حرفه وکالت است. تمامی اطلاعات پرونده شما کاملاً محرمانه خواهد بود.',
      en: 'Yes, confidentiality and privacy of the client is a fundamental principle of the legal profession. All your case information will be completely confidential.',
    },
  },
  {
    id: 'faq-8',
    question: {
      fa: 'چگونه می‌توانم وقت مشاوره رزرو کنم؟',
      en: 'How can I book a consultation?',
    },
    answer: {
      fa: 'می‌توانید از طریق فرم تماس در سایت، تلفن یا ایمیل با ما در ارتباط باشید و وقت مشاوره رزرو کنید.',
      en: 'You can contact us via the contact form on the website, phone or email to book a consultation.',
    },
  },
]
```

- [ ] **Step 6: Create services/offices data**

Create `web/data/services.ts`:
```ts
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
```

- [ ] **Step 7: Create partners data**

Create `web/data/partners.ts`:
```ts
import { Partner } from './types'

export const partners: Partner[] = [
  { name: 'Partner 1', logo: '/images/partners/partner-1.png' },
  { name: 'Partner 2', logo: '/images/partners/partner-2.png' },
  { name: 'Partner 3', logo: '/images/partners/partner-3.png' },
  { name: 'Partner 4', logo: '/images/partners/partner-4.png' },
  { name: 'Partner 5', logo: '/images/partners/partner-5.png' },
]
```

- [ ] **Step 8: Write data type tests**

Create `web/__tests__/data.test.ts`:
```ts
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

test('blog posts have slugs, titles and dates', () => {
  expect(blogPosts.length).toBeGreaterThanOrEqual(3)
  blogPosts.forEach(post => {
    expect(post.slug).toBeTruthy()
    expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})

test('FAQ items have questions and answers', () => {
  expect(faqItems.length).toBeGreaterThanOrEqual(4)
  faqItems.forEach(item => {
    expect(item.question.fa).toBeTruthy()
    expect(item.answer.fa).toBeTruthy()
  })
})

test('office cities includes Tehran and Dubai', () => {
  const slugs = officeCities.map(c => c.slug)
  expect(slugs).toContain('tehran')
  expect(slugs).toContain('dubai')
})
```

- [ ] **Step 9: Run tests**

```bash
cd web && npx jest __tests__/data.test.ts --no-coverage
```
Expected: 5 tests pass.

- [ ] **Step 10: Commit**

```bash
git add -A && git commit -m "feat: add TypeScript data layer with bilingual team, clients, blog, faq and services"
```

---

## Task 5: Shared UI Primitives

**Files:**
- Create: `web/components/shared/Button.tsx`
- Create: `web/components/shared/SectionTitle.tsx`
- Create: `web/components/shared/Container.tsx`
- Create: `web/__tests__/components/Button.test.tsx`

- [ ] **Step 1: Write failing Button test**

Create `web/__tests__/components/Button.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import Button from '@/components/shared/Button'

test('renders gold variant with text', () => {
  render(<Button variant="gold">رزرو مشاوره</Button>)
  expect(screen.getByText('رزرو مشاوره')).toBeInTheDocument()
})

test('renders outline variant', () => {
  render(<Button variant="outline">بیشتر بدانید</Button>)
  const btn = screen.getByRole('button')
  expect(btn).toHaveClass('border-gold')
})

test('renders as anchor when href is provided', () => {
  render(<Button variant="gold" href="/contact">تماس</Button>)
  expect(screen.getByRole('link')).toHaveAttribute('href', '/contact')
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd web && npx jest __tests__/components/Button.test.tsx --no-coverage
```
Expected: FAIL — "Cannot find module '@/components/shared/Button'"

- [ ] **Step 3: Create Button component**

Create `web/components/shared/Button.tsx`:
```tsx
import Link from 'next/link'
import { ReactNode } from 'react'

interface ButtonProps {
  variant: 'gold' | 'outline'
  href?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  type?: 'button' | 'submit'
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const variantClasses = {
  gold: 'bg-gold text-navy font-bold hover:bg-gold-light active:bg-gold-dark transition-colors',
  outline: 'border border-gold text-gold hover:bg-gold hover:text-navy transition-colors',
}

export default function Button({
  variant,
  href,
  onClick,
  children,
  className = '',
  type = 'button',
  size = 'md',
}: ButtonProps) {
  const classes = `
    inline-flex items-center justify-center rounded
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `.trim()

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd web && npx jest __tests__/components/Button.test.tsx --no-coverage
```
Expected: 3 tests pass.

- [ ] **Step 5: Create SectionTitle component**

Create `web/components/shared/SectionTitle.tsx`:
```tsx
interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'center' | 'start'
  className?: string
}

export default function SectionTitle({
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionTitleProps) {
  return (
    <div className={`${align === 'center' ? 'text-center' : 'text-start'} ${className}`}>
      <h2 className="font-morabba text-3xl font-bold text-cream mb-3">{title}</h2>
      <div className={`h-1 w-16 bg-gold rounded ${align === 'center' ? 'mx-auto' : ''} mb-4`} />
      {subtitle && (
        <p className="text-cream/70 text-base max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 6: Create Container component**

Create `web/components/shared/Container.tsx`:
```tsx
import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
}

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  full: 'max-w-full',
}

export default function Container({
  children,
  className = '',
  size = 'lg',
}: ContainerProps) {
  return (
    <div className={`${sizeClasses[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
```

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: add Button, SectionTitle and Container shared primitives"
```

---

## Task 6: Shared Content Components

**Files:**
- Create: `web/components/shared/PageHero.tsx`
- Create: `web/components/shared/Accordion.tsx`
- Create: `web/components/shared/ClientCard.tsx`
- Create: `web/components/shared/TeamCard.tsx`
- Create: `web/components/shared/BlogCard.tsx`
- Create: `web/components/shared/CityCard.tsx`
- Create: `web/__tests__/components/Accordion.test.tsx`

- [ ] **Step 1: Write failing Accordion test**

Create `web/__tests__/components/Accordion.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Accordion from '@/components/shared/Accordion'

const items = [
  { id: '1', question: 'سوال اول', answer: 'جواب اول' },
  { id: '2', question: 'سوال دوم', answer: 'جواب دوم' },
]

test('renders all questions', () => {
  render(<Accordion items={items} />)
  expect(screen.getByText('سوال اول')).toBeInTheDocument()
  expect(screen.getByText('سوال دوم')).toBeInTheDocument()
})

test('answers are hidden initially', () => {
  render(<Accordion items={items} />)
  expect(screen.queryByText('جواب اول')).not.toBeVisible()
})

test('clicking a question reveals the answer', () => {
  render(<Accordion items={items} />)
  fireEvent.click(screen.getByText('سوال اول'))
  expect(screen.getByText('جواب اول')).toBeVisible()
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd web && npx jest __tests__/components/Accordion.test.tsx --no-coverage
```
Expected: FAIL.

- [ ] **Step 3: Create Accordion component**

Create `web/components/shared/Accordion.tsx`:
```tsx
'use client'
import { useState } from 'react'

interface AccordionItem {
  id: string
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
}

export default function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-navy-light rounded-lg border border-white/10"
        >
          <button
            className="w-full flex items-center justify-between p-4 text-start text-cream hover:text-gold transition-colors"
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
          >
            <span className="font-vazirmatn text-base">{item.question}</span>
            <span className="text-gold text-xl flex-shrink-0 ms-3">
              {openId === item.id ? '−' : '+'}
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openId === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="px-4 pb-4 text-cream/80 text-sm leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd web && npx jest __tests__/components/Accordion.test.tsx --no-coverage
```
Expected: 3 tests pass.

- [ ] **Step 5: Create PageHero component**

Create `web/components/shared/PageHero.tsx`:
```tsx
import Container from './Container'

interface PageHeroProps {
  title: string
  subtitle?: string
  breadcrumb?: { label: string; href: string }[]
}

export default function PageHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="bg-navy-light py-16 border-b border-white/10">
      <Container>
        {breadcrumb && (
          <nav className="flex items-center gap-2 text-sm text-cream/50 mb-4">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                <a href={crumb.href} className="hover:text-gold transition-colors">
                  {crumb.label}
                </a>
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-morabba text-4xl md:text-5xl font-bold text-cream">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-cream/70 text-lg max-w-2xl">{subtitle}</p>
        )}
      </Container>
    </section>
  )
}
```

- [ ] **Step 6: Create ClientCard component**

Create `web/components/shared/ClientCard.tsx`:
```tsx
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
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
      <div className="absolute bottom-0 start-0 end-0 p-4">
        <p className="text-cream font-vazirmatn text-sm font-medium">{name}</p>
      </div>
    </Link>
  )
}
```

- [ ] **Step 7: Create TeamCard component**

Create `web/components/shared/TeamCard.tsx`:
```tsx
import Image from 'next/image'
import Link from 'next/link'
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
        <Image src={photo} alt={name} fill className="object-cover object-top" />
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
```

- [ ] **Step 8: Create BlogCard component**

Create `web/components/shared/BlogCard.tsx`:
```tsx
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
    <Link href={href} className="group block bg-navy-light rounded-xl overflow-hidden border border-white/10 hover:border-gold/30 transition-colors">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
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
```

- [ ] **Step 9: Create CityCard component**

Create `web/components/shared/CityCard.tsx`:
```tsx
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
```

- [ ] **Step 10: Commit**

```bash
git add -A && git commit -m "feat: add PageHero, Accordion, ClientCard, TeamCard, BlogCard, CityCard shared components"
```

---

## Task 7: Navbar

**Files:**
- Create: `web/components/layout/LocaleToggle.tsx`
- Create: `web/components/layout/NavDropdown.tsx`
- Create: `web/components/layout/Navbar.tsx`
- Create: `web/__tests__/components/Navbar.test.tsx`

- [ ] **Step 1: Write failing Navbar test**

Create `web/__tests__/components/Navbar.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import Navbar from '@/components/layout/Navbar'
import faMessages from '@/messages/fa.json'

function renderWithIntl(locale: string, messages: object) {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
    </NextIntlClientProvider>
  )
}

test('renders Nobel Justice Group logo text', () => {
  renderWithIntl('fa', faMessages)
  expect(screen.getByText(/Nobel Justice Group/i)).toBeInTheDocument()
})

test('renders home nav link', () => {
  renderWithIntl('fa', faMessages)
  expect(screen.getByText('صفحه اصلی')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd web && npx jest __tests__/components/Navbar.test.tsx --no-coverage
```
Expected: FAIL.

- [ ] **Step 3: Create LocaleToggle**

Create `web/components/layout/LocaleToggle.tsx`:
```tsx
'use client'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

export default function LocaleToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const toggleLocale = () => {
    const newLocale = locale === 'fa' ? 'en' : 'fa'
    // Replace /fa/ or /en/ prefix
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-1 text-cream/80 hover:text-gold transition-colors text-sm font-bold border border-white/20 rounded px-3 py-1"
    >
      <span>{locale === 'fa' ? 'EN' : 'FA'}</span>
    </button>
  )
}
```

- [ ] **Step 4: Create NavDropdown**

Create `web/components/layout/NavDropdown.tsx`:
```tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'

interface DropdownItem {
  label: string
  href: string
}

interface NavDropdownProps {
  label: string
  items: DropdownItem[]
}

export default function NavDropdown({ label, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 text-cream/80 hover:text-gold transition-colors text-sm">
        {label}
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="absolute top-full start-0 mt-1 bg-navy-light border border-white/10 rounded-lg shadow-xl min-w-[200px] z-50">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-3 text-sm text-cream/80 hover:text-gold hover:bg-white/5 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 5: Create Navbar**

Create `web/components/layout/Navbar.tsx`:
```tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import LocaleToggle from './LocaleToggle'
import NavDropdown from './NavDropdown'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [mobileOpen, setMobileOpen] = useState(false)

  const base = `/${locale}`

  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href={base} className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 relative">
              <Image src="/images/logo.png" alt="Nobel Justice Group" fill className="object-contain" />
            </div>
            <div className="leading-tight">
              <p className="text-cream font-bold text-sm">Noble Justice Group</p>
              <p className="text-cream/60 text-xs">Hosein Shahrokhi & partners</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href={base} className="text-sm text-cream/80 hover:text-gold transition-colors">
              {t('home')}
            </Link>
            <NavDropdown
              label={t('about')}
              items={[
                { label: t('about'), href: `${base}/about` },
                { label: t('team'), href: `${base}/team` },
              ]}
            />
            <NavDropdown
              label={t('services')}
              items={[
                { label: t('attorneyAbroad'), href: `${base}/attorney-abroad` },
              ]}
            />
            <Link href={`${base}/famous-clients`} className="text-sm text-cream/80 hover:text-gold transition-colors">
              {t('famousClients')}
            </Link>
            <Link href={`${base}/blog`} className="text-sm text-cream/80 hover:text-gold transition-colors">
              {t('blog')}
            </Link>
            <Link href={`${base}/faq`} className="text-sm text-cream/80 hover:text-gold transition-colors">
              {t('faq')}
            </Link>
            <Link href={`${base}/contact`} className="text-sm text-cream/80 hover:text-gold transition-colors">
              {t('contact')}
            </Link>
            <LocaleToggle />
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-cream p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-0.5 bg-cream mb-1" />
            <span className="block w-6 h-0.5 bg-cream mb-1" />
            <span className="block w-6 h-0.5 bg-cream" />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="lg:hidden py-4 border-t border-white/10 flex flex-col gap-3">
            {[
              { label: t('home'), href: base },
              { label: t('about'), href: `${base}/about` },
              { label: t('team'), href: `${base}/team` },
              { label: t('attorneyAbroad'), href: `${base}/attorney-abroad` },
              { label: t('famousClients'), href: `${base}/famous-clients` },
              { label: t('blog'), href: `${base}/blog` },
              { label: t('faq'), href: `${base}/faq` },
              { label: t('contact'), href: `${base}/contact` },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-cream/80 hover:text-gold text-sm py-2 border-b border-white/5"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <LocaleToggle />
          </nav>
        )}
      </div>
    </header>
  )
}
```

- [ ] **Step 6: Run test to verify it passes**

```bash
cd web && npx jest __tests__/components/Navbar.test.tsx --no-coverage
```
Expected: 2 tests pass.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: add Navbar with RTL support, dropdowns, mobile menu, and locale toggle"
```

---

## Task 8: Footer

**Files:**
- Create: `web/components/layout/Footer.tsx`
- Create: `web/__tests__/components/Footer.test.tsx`

- [ ] **Step 1: Write failing Footer test**

Create `web/__tests__/components/Footer.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import Footer from '@/components/layout/Footer'
import faMessages from '@/messages/fa.json'

test('renders Nobel Justice Group in footer', () => {
  render(
    <NextIntlClientProvider locale="fa" messages={faMessages}>
      <Footer />
    </NextIntlClientProvider>
  )
  expect(screen.getAllByText(/Nobel Justice Group/i).length).toBeGreaterThan(0)
})

test('renders support hours', () => {
  render(
    <NextIntlClientProvider locale="fa" messages={faMessages}>
      <Footer />
    </NextIntlClientProvider>
  )
  expect(screen.getByText(/شنبه/)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd web && npx jest __tests__/components/Footer.test.tsx --no-coverage
```
Expected: FAIL.

- [ ] **Step 3: Create Footer component**

Create `web/components/layout/Footer.tsx`:
```tsx
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const nav = useTranslations('nav')
  const contact = useTranslations('contact')
  const locale = useLocale()
  const base = `/${locale}`

  return (
    <footer className="bg-navy-light border-t border-white/10">
      {/* Map strip */}
      <div className="h-48 w-full bg-navy-lighter flex items-center justify-center border-b border-white/10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.7!2d51.4300!3d35.7719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ2JzE5LjkiTiA1McKwMjUnNDguMCJF!5e0!3m2!1sen!2s!4v1"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Nobel Justice Group Location"
        />
      </div>

      {/* Main footer columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Column 1: Logo + social */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 relative flex-shrink-0">
                <Image src="/images/logo.png" alt="Nobel Justice Group" fill className="object-contain" />
              </div>
              <div>
                <p className="text-cream font-bold text-sm">Noble Justice Group</p>
                <p className="text-cream/60 text-xs">Hosein Shahrokhi & partners</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold transition-colors text-xs"
              >
                𝕏
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold transition-colors text-xs"
              >
                in
              </a>
            </div>
          </div>

          {/* Column 2: Support */}
          <div>
            <h4 className="font-morabba text-gold mb-4">{t('support')}</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>{t('hours')}</li>
              <li dir="ltr">{contact('phone1')}</li>
              <li className="leading-relaxed">{contact('address')}</li>
            </ul>
          </div>

          {/* Column 3: Legal info */}
          <div>
            <h4 className="font-morabba text-gold mb-4">{t('legalInfo')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`${base}/privacy`} className="text-cream/70 hover:text-gold transition-colors">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href={`${base}/terms`} className="text-cream/70 hover:text-gold transition-colors">
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link href={`${base}/disclaimer`} className="text-cream/70 hover:text-gold transition-colors">
                  {t('disclaimer')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Links */}
          <div>
            <h4 className="font-morabba text-gold mb-4">{t('contactUs')}</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: nav('about'), href: `${base}/about` },
                { label: nav('services'), href: `${base}/attorney-abroad` },
                { label: nav('team'), href: `${base}/team` },
                { label: nav('contact'), href: `${base}/contact` },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-cream/70 hover:text-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-cream/40 text-xs">
          {t('copyright')}
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd web && npx jest __tests__/components/Footer.test.tsx --no-coverage
```
Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add Footer with 4-column layout, map embed, social links, and i18n"
```

---

## Task 9: Home Page

**Files:**
- Create: `web/components/home/Hero.tsx`
- Create: `web/components/home/AboutSnippet.tsx`
- Create: `web/components/home/FamousClientsCarousel.tsx`
- Create: `web/components/home/AttorneyAbroadBanner.tsx`
- Create: `web/components/home/InternationalOffices.tsx`
- Create: `web/components/home/ClientLogos.tsx`
- Create: `web/components/home/BlogPreview.tsx`
- Create: `web/components/home/FAQPreview.tsx`
- Create: `web/components/home/ConsultationCTA.tsx`
- Create: `web/components/home/CoreValues.tsx`
- Create: `web/app/[locale]/page.tsx`

- [ ] **Step 1: Create Hero section**

Create `web/components/home/Hero.tsx`:
```tsx
import { useTranslations, useLocale } from 'next-intl'
import Button from '@/components/shared/Button'

export default function Hero() {
  const t = useTranslations('home')
  const locale = useLocale()
  const base = `/${locale}`

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-navy">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-e from-navy/90 via-navy/60 to-navy/30 z-10" />
      {/* Background image placeholder */}
      <div
        className="absolute inset-0 bg-navy-lighter bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-xl">
          <p className="text-gold text-sm uppercase tracking-widest mb-4">{t('heroSubtitle')}</p>
          <h1 className="font-morabba text-5xl md:text-7xl font-bold text-cream leading-tight mb-6">
            {t('heroTitle')}
          </h1>
          <div className="flex flex-wrap gap-4">
            <Button variant="gold" href={`${base}/contact`} size="lg">
              {t('heroCtaPrimary')}
            </Button>
            <Button variant="outline" href={`${base}/about`} size="lg">
              {t('heroCtaSecondary')}
            </Button>
          </div>
        </div>
      </div>
      {/* Slide dots */}
      <div className="absolute bottom-8 start-1/2 -translate-x-1/2 z-20 flex gap-2">
        <span className="w-8 h-1 bg-gold rounded-full" />
        <span className="w-2 h-1 bg-white/30 rounded-full" />
        <span className="w-2 h-1 bg-white/30 rounded-full" />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create AboutSnippet section**

Create `web/components/home/AboutSnippet.tsx`:
```tsx
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import Button from '@/components/shared/Button'
import SectionTitle from '@/components/shared/SectionTitle'
import Container from '@/components/shared/Container'

export default function AboutSnippet() {
  const t = useTranslations('home')
  const locale = useLocale()

  return (
    <section className="py-20 bg-navy">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/images/about-snippet.jpg"
              alt="Nobel Justice Group"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            <blockquote className="absolute bottom-6 start-6 end-6 text-cream font-morabba text-lg italic border-s-4 border-gold ps-4">
              «حقوق همراه با اتقاء انسانی، بالکه معماری دادل قرار است.»
            </blockquote>
          </div>
          <div>
            <SectionTitle title={t('aboutTitle')} align="start" />
            <p className="text-cream/80 leading-relaxed mb-6">{t('aboutText')}</p>
            <Button variant="gold" href={`/${locale}/about`}>
              {t('aboutCta')}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 3: Create FamousClientsCarousel section**

Create `web/components/home/FamousClientsCarousel.tsx`:
```tsx
'use client'
import { useTranslations, useLocale } from 'next-intl'
import { famousClients } from '@/data/clients'
import ClientCard from '@/components/shared/ClientCard'
import SectionTitle from '@/components/shared/SectionTitle'
import Container from '@/components/shared/Container'

export default function FamousClientsCarousel() {
  const t = useTranslations('home')
  const locale = useLocale()

  return (
    <section className="py-20 bg-navy-light">
      <Container>
        <SectionTitle title={t('famousClientsTitle')} className="mb-10" />
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {famousClients.map((client) => (
            <div key={client.slug} className="flex-shrink-0 w-44 snap-start">
              <ClientCard
                name={client.name[locale as 'fa' | 'en']}
                photo={client.photo}
                href={`/${locale}/famous-clients/${client.slug}`}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 4: Create AttorneyAbroadBanner section**

Create `web/components/home/AttorneyAbroadBanner.tsx`:
```tsx
import { useTranslations, useLocale } from 'next-intl'
import Button from '@/components/shared/Button'

export default function AttorneyAbroadBanner() {
  const t = useTranslations('home')
  const locale = useLocale()

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ backgroundImage: "url('/images/attorney-abroad-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-navy/80" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-morabba text-4xl text-cream mb-4">
            {t('attorneyAbroadTitle')}
          </h2>
          <p className="text-cream/80 leading-relaxed mb-8">
            {t('attorneyAbroadText')}
          </p>
          <Button variant="gold" href={`/${locale}/attorney-abroad`}>
            {t('attorneyAbroadCta')}
          </Button>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create InternationalOffices section**

Create `web/components/home/InternationalOffices.tsx`:
```tsx
import { useTranslations, useLocale } from 'next-intl'
import { officeCities } from '@/data/services'
import CityCard from '@/components/shared/CityCard'
import SectionTitle from '@/components/shared/SectionTitle'
import Container from '@/components/shared/Container'

export default function InternationalOffices() {
  const t = useTranslations('home')
  const locale = useLocale()

  return (
    <section className="py-20 bg-navy">
      <Container>
        <SectionTitle title={t('internationalTitle')} className="mb-10" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {officeCities.map((city) => (
            <CityCard
              key={city.slug}
              city={city.city[locale as 'fa' | 'en']}
              country={city.country[locale as 'fa' | 'en']}
              description={city.description[locale as 'fa' | 'en']}
              photo={city.photo}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 6: Create ClientLogos section**

Create `web/components/home/ClientLogos.tsx`:
```tsx
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { partners } from '@/data/partners'
import SectionTitle from '@/components/shared/SectionTitle'
import Container from '@/components/shared/Container'

export default function ClientLogos() {
  const t = useTranslations('home')

  return (
    <section className="py-16 bg-navy-light">
      <Container>
        <SectionTitle title={t('clientsTitle')} className="mb-10" />
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="relative w-24 h-12 opacity-60 hover:opacity-100 transition-opacity"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain filter brightness-0 invert"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 7: Create BlogPreview section**

Create `web/components/home/BlogPreview.tsx`:
```tsx
import { useTranslations, useLocale } from 'next-intl'
import { blogPosts } from '@/data/blog'
import BlogCard from '@/components/shared/BlogCard'
import SectionTitle from '@/components/shared/SectionTitle'
import Container from '@/components/shared/Container'
import Button from '@/components/shared/Button'

export default function BlogPreview() {
  const t = useTranslations('home')
  const blog = useTranslations('blog')
  const locale = useLocale()
  const latest = blogPosts.slice(0, 3)

  return (
    <section className="py-20 bg-navy">
      <Container>
        <SectionTitle title={t('blogTitle')} className="mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {latest.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title[locale as 'fa' | 'en']}
              excerpt={post.excerpt[locale as 'fa' | 'en']}
              coverImage={post.coverImage}
              date={post.date}
              category={post.category[locale as 'fa' | 'en']}
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
```

- [ ] **Step 8: Create FAQPreview section**

Create `web/components/home/FAQPreview.tsx`:
```tsx
import { useTranslations, useLocale } from 'next-intl'
import { faqItems } from '@/data/faq'
import Accordion from '@/components/shared/Accordion'
import SectionTitle from '@/components/shared/SectionTitle'
import Container from '@/components/shared/Container'
import Button from '@/components/shared/Button'

export default function FAQPreview() {
  const t = useTranslations('home')
  const locale = useLocale()
  const preview = faqItems.slice(0, 4)

  const items = preview.map((item) => ({
    id: item.id,
    question: item.question[locale as 'fa' | 'en'],
    answer: item.answer[locale as 'fa' | 'en'],
  }))

  return (
    <section className="py-20 bg-navy-light">
      <Container size="md">
        <SectionTitle title={t('faqTitle')} className="mb-10" />
        <Accordion items={items} />
        <div className="text-center mt-8">
          <Button variant="outline" href={`/${locale}/faq`}>
            {t('faqCta')}
          </Button>
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 9: Create ConsultationCTA section**

Create `web/components/home/ConsultationCTA.tsx`:
```tsx
import { useTranslations, useLocale } from 'next-intl'
import Button from '@/components/shared/Button'

export default function ConsultationCTA() {
  const t = useTranslations('home')
  const locale = useLocale()

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ backgroundImage: "url('/images/consultation-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-navy-light/90" />
      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        <h2 className="font-morabba text-4xl text-cream mb-6">
          {t('consultationTitle')}
        </h2>
        <Button variant="gold" href={`/${locale}/contact`} size="lg">
          {t('consultationCta')}
        </Button>
      </div>
    </section>
  )
}
```

- [ ] **Step 10: Create CoreValues section**

Create `web/components/home/CoreValues.tsx`:
```tsx
import { useTranslations } from 'next-intl'
import SectionTitle from '@/components/shared/SectionTitle'
import Container from '@/components/shared/Container'

const icons = ['⚖️', '📚', '🤝', '💡']

export default function CoreValues() {
  const t = useTranslations('home')
  const v = useTranslations('values')

  const values = [
    { icon: icons[0], title: v('honesty'), desc: v('honestyDesc') },
    { icon: icons[1], title: v('expertise'), desc: v('expertiseDesc') },
    { icon: icons[2], title: v('trust'), desc: v('trustDesc') },
    { icon: icons[3], title: v('innovation'), desc: v('innovationDesc') },
  ]

  return (
    <section className="py-20 bg-navy">
      <Container>
        <SectionTitle title={t('valuesTitle')} className="mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-navy-light rounded-xl p-6 border border-white/10 hover:border-gold/30 transition-colors text-center"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="font-morabba text-lg text-gold mb-2">{value.title}</h3>
              <p className="text-cream/70 text-sm">{value.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 11: Create Home page**

Create `web/app/[locale]/page.tsx`:
```tsx
import Hero from '@/components/home/Hero'
import AboutSnippet from '@/components/home/AboutSnippet'
import FamousClientsCarousel from '@/components/home/FamousClientsCarousel'
import AttorneyAbroadBanner from '@/components/home/AttorneyAbroadBanner'
import InternationalOffices from '@/components/home/InternationalOffices'
import ClientLogos from '@/components/home/ClientLogos'
import BlogPreview from '@/components/home/BlogPreview'
import FAQPreview from '@/components/home/FAQPreview'
import ConsultationCTA from '@/components/home/ConsultationCTA'
import CoreValues from '@/components/home/CoreValues'

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSnippet />
      <FamousClientsCarousel />
      <AttorneyAbroadBanner />
      <InternationalOffices />
      <ClientLogos />
      <BlogPreview />
      <FAQPreview />
      <ConsultationCTA />
      <CoreValues />
    </>
  )
}
```

- [ ] **Step 12: Run build to check for errors**

```bash
cd web && npm run build
```
Expected: Build succeeds. Note any type errors and fix them before proceeding.

- [ ] **Step 13: Commit**

```bash
git add -A && git commit -m "feat: implement full home page with all 10 sections"
```

---

## Task 10: About Page

**Files:**
- Create: `web/app/[locale]/about/page.tsx`

- [ ] **Step 1: Create About page**

Create `web/app/[locale]/about/page.tsx`:
```tsx
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { team } from '@/data/team'
import PageHero from '@/components/shared/PageHero'
import SectionTitle from '@/components/shared/SectionTitle'
import Container from '@/components/shared/Container'
import TeamCard from '@/components/shared/TeamCard'
import Button from '@/components/shared/Button'

export default function AboutPage() {
  const t = useTranslations('about')
  const teamT = useTranslations('team')
  const locale = useLocale()
  const base = `/${locale}`
  const preview = team.slice(0, 3)

  return (
    <>
      <PageHero
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        breadcrumb={[
          { label: locale === 'fa' ? 'خانه' : 'Home', href: base },
          { label: t('title'), href: `${base}/about` },
        ]}
      />

      {/* About content */}
      <section className="py-20 bg-navy">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image src="/images/about-main.jpg" alt="About Nobel Justice Group" fill className="object-cover" />
            </div>
            <div>
              <SectionTitle title={t('title')} align="start" className="mb-6" />
              <p className="text-cream/80 leading-relaxed mb-4">
                {locale === 'fa'
                  ? 'گروه دادگستر نوبل با هدف ایجاد پل ارتباطی میان چالش‌های حقوقی و فرصت‌های قانونی تأسیس شده است. ما با بیش از ۱۵ سال تجربه در زمینه حقوق بین‌الملل و داخلی، آماده ارائه بهترین خدمات حقوقی هستیم.'
                  : 'Nobel Justice Group was founded with the aim of building a bridge between legal challenges and legal opportunities. With over 15 years of experience in international and domestic law, we are ready to provide the best legal services.'}
              </p>
              <p className="text-cream/80 leading-relaxed mb-6">
                {locale === 'fa'
                  ? 'تیم متخصص ما متشکل از وکلای برجسته داخلی و بین‌المللی است که هر یک در حوزه‌های تخصصی خود دارای تجربه و دانش گسترده‌ای می‌باشند.'
                  : 'Our specialized team consists of prominent domestic and international lawyers, each with extensive experience and knowledge in their respective fields.'}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Vision */}
      <section className="py-16 bg-navy-light">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🌍', title: locale === 'fa' ? 'دیدگاه جهانی' : 'Global Vision', desc: locale === 'fa' ? 'ارائه خدمات حقوقی در سطح بین‌المللی' : 'Providing legal services at an international level' },
              { icon: '⚖️', title: locale === 'fa' ? 'عدالت‌محور' : 'Justice-Centered', desc: locale === 'fa' ? 'تعهد کامل به احقاق حقوق موکل' : 'Full commitment to client rights restoration' },
              { icon: '🤝', title: locale === 'fa' ? 'مشارکت راهبردی' : 'Strategic Partnership', desc: locale === 'fa' ? 'شبکه گسترده شرکای بین‌المللی' : 'Extensive network of international partners' },
            ].map((item) => (
              <div key={item.title} className="bg-navy rounded-xl p-6 border border-white/10 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-morabba text-xl text-gold mb-2">{item.title}</h3>
                <p className="text-cream/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team preview */}
      <section className="py-20 bg-navy">
        <Container>
          <SectionTitle title={locale === 'fa' ? 'تیم ما' : 'Our Team'} className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {preview.map((member) => (
              <TeamCard
                key={member.slug}
                name={member.name[locale as 'fa' | 'en']}
                title={member.title[locale as 'fa' | 'en']}
                bio={member.bio[locale as 'fa' | 'en']}
                photo={member.photo}
                href={`${base}/team/${member.slug}`}
                readMoreLabel={teamT('readMore')}
              />
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" href={`${base}/team`}>
              {locale === 'fa' ? 'مشاهده همه اعضای تیم' : 'View All Team Members'}
            </Button>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-20 bg-navy-light">
        <Container size="md">
          <SectionTitle title={t('missionTitle')} subtitle={t('missionSubtitle')} className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: '📋', title: locale === 'fa' ? 'مشاوره و برنامه‌ریزی' : 'Consultation & Planning' },
              { icon: '🏛️', title: locale === 'fa' ? 'دادگاه' : 'Litigation' },
              { icon: '📝', title: locale === 'fa' ? 'تنظیم اسناد' : 'Document Drafting' },
              { icon: '🌐', title: locale === 'fa' ? 'حقوق بین‌الملل' : 'International Law' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-4 bg-navy rounded-xl p-4 border border-white/10">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-cream font-vazirmatn">{item.title}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Partners */}
      <section className="py-16 bg-navy">
        <Container>
          <SectionTitle title={t('partnersTitle')} className="mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['🇶🇦 Qatar', '🇴🇲 Oman', '🇦🇪 UAE', '🇩🇪 Germany'].map((partner) => (
              <div key={partner} className="bg-navy-light rounded-xl p-6 text-center border border-white/10">
                <p className="text-cream/70 text-2xl">{partner.split(' ')[0]}</p>
                <p className="text-cream/70 text-sm mt-2">{partner.split(' ').slice(1).join(' ')}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: implement About page with team preview, mission, and partners sections"
```

---

## Task 11: Team Pages

**Files:**
- Create: `web/app/[locale]/team/page.tsx`
- Create: `web/app/[locale]/team/[slug]/page.tsx`

- [ ] **Step 1: Create Team list page**

Create `web/app/[locale]/team/page.tsx`:
```tsx
import { useTranslations, useLocale } from 'next-intl'
import { team } from '@/data/team'
import PageHero from '@/components/shared/PageHero'
import TeamCard from '@/components/shared/TeamCard'
import Container from '@/components/shared/Container'

export default function TeamPage() {
  const t = useTranslations('team')
  const locale = useLocale()
  const base = `/${locale}`

  return (
    <>
      <PageHero
        title={t('title')}
        breadcrumb={[
          { label: locale === 'fa' ? 'خانه' : 'Home', href: base },
          { label: t('title'), href: `${base}/team` },
        ]}
      />
      <section className="py-20 bg-navy">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <TeamCard
                key={member.slug}
                name={member.name[locale as 'fa' | 'en']}
                title={member.title[locale as 'fa' | 'en']}
                bio={member.bio[locale as 'fa' | 'en']}
                photo={member.photo}
                href={`${base}/team/${member.slug}`}
                readMoreLabel={t('readMore')}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create Team detail page**

Create `web/app/[locale]/team/[slug]/page.tsx`:
```tsx
import { notFound } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { team } from '@/data/team'
import PageHero from '@/components/shared/PageHero'
import Container from '@/components/shared/Container'
import Button from '@/components/shared/Button'
import TeamCard from '@/components/shared/TeamCard'

export async function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }))
}

export default function TeamDetailPage({ params }: { params: { slug: string; locale: string } }) {
  const member = team.find((m) => m.slug === params.slug)
  if (!member) notFound()

  const locale = params.locale as 'fa' | 'en'
  const base = `/${locale}`
  const t = useTranslations('team')
  const colleagues = team.filter((m) => m.slug !== member.slug).slice(0, 3)

  return (
    <>
      {/* Hero with name watermark */}
      <section className="relative bg-navy-light py-20 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <p className="text-white/5 font-morabba text-[8rem] font-bold whitespace-nowrap">
            {member.name.en}
          </p>
        </div>
        <Container>
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative w-48 h-48 flex-shrink-0 rounded-full overflow-hidden border-4 border-gold">
              <Image src={member.photo} alt={member.name[locale]} fill className="object-cover" />
            </div>
            <div>
              <h1 className="font-morabba text-4xl text-cream mb-2">{member.name[locale]}</h1>
              <p className="text-gold text-lg mb-4">{member.title[locale]}</p>
              <div className="flex flex-wrap gap-2">
                {member.specializations[locale].map((spec) => (
                  <span key={spec} className="bg-gold/20 text-gold text-xs px-3 py-1 rounded-full">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Bio */}
      <section className="py-20 bg-navy">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="text-cream/80 leading-relaxed text-lg">{member.fullBio[locale]}</p>
              {member.licenseYear && (
                <p className="mt-6 text-gold text-sm">
                  {locale === 'fa' ? `پروانه وکالت: ${member.licenseYear}` : `License Year: ${member.licenseYear}`}
                </p>
              )}
            </div>
            <div className="bg-navy-light rounded-xl p-6 border border-white/10 h-fit">
              <h3 className="font-morabba text-lg text-gold mb-4">
                {locale === 'fa' ? 'اطلاعات تماس' : 'Contact Info'}
              </h3>
              {member.phone && (
                <p className="text-cream/70 text-sm mb-3" dir="ltr">{member.phone}</p>
              )}
              <Button variant="gold" href={`${base}/contact`} className="w-full justify-center">
                {t('contactCta')}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Colleagues */}
      <section className="py-16 bg-navy-light">
        <Container>
          <h2 className="font-morabba text-2xl text-cream mb-8">
            {locale === 'fa' ? 'سایر اعضای تیم' : 'Other Team Members'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {colleagues.map((col) => (
              <TeamCard
                key={col.slug}
                name={col.name[locale]}
                title={col.title[locale]}
                bio={col.bio[locale]}
                photo={col.photo}
                href={`${base}/team/${col.slug}`}
                readMoreLabel={t('readMore')}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: implement Team list and Team detail pages"
```

---

## Task 12: Famous Clients Pages

**Files:**
- Create: `web/app/[locale]/famous-clients/page.tsx`
- Create: `web/app/[locale]/famous-clients/[slug]/page.tsx`

- [ ] **Step 1: Create Famous Clients list page**

Create `web/app/[locale]/famous-clients/page.tsx`:
```tsx
import { useTranslations, useLocale } from 'next-intl'
import { famousClients } from '@/data/clients'
import PageHero from '@/components/shared/PageHero'
import ClientCard from '@/components/shared/ClientCard'
import Container from '@/components/shared/Container'

export default function FamousClientsPage() {
  const t = useTranslations('famousClients')
  const locale = useLocale()
  const base = `/${locale}`

  return (
    <>
      <PageHero
        title={t('title')}
        subtitle={t('subtitle')}
        breadcrumb={[
          { label: locale === 'fa' ? 'خانه' : 'Home', href: base },
          { label: t('title'), href: `${base}/famous-clients` },
        ]}
      />

      <section className="py-20 bg-navy">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {famousClients.map((client) => (
              <ClientCard
                key={client.slug}
                name={client.name[locale as 'fa' | 'en']}
                photo={client.photo}
                href={`${base}/famous-clients/${client.slug}`}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Stats bar */}
      <section className="py-12 bg-navy-light border-t border-white/10">
        <Container>
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { value: '۴۰+', label: locale === 'fa' ? 'موکل سیاسی' : 'Political Clients' },
              { value: '۱۰۰+', label: locale === 'fa' ? 'چهره اجتماعی' : 'Social Figures' },
              { value: '۱.۷٪', label: locale === 'fa' ? 'پرونده‌های بین‌المللی' : 'International Cases' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-morabba text-4xl text-gold">{stat.value}</p>
                <p className="text-cream/70 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create Famous Client detail page**

Create `web/app/[locale]/famous-clients/[slug]/page.tsx`:
```tsx
import { notFound } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { famousClients } from '@/data/clients'
import PageHero from '@/components/shared/PageHero'
import Container from '@/components/shared/Container'
import ClientCard from '@/components/shared/ClientCard'

export async function generateStaticParams() {
  return famousClients.map((c) => ({ slug: c.slug }))
}

export default function FamousClientDetailPage({ params }: { params: { slug: string; locale: string } }) {
  const client = famousClients.find((c) => c.slug === params.slug)
  if (!client) notFound()

  const locale = params.locale as 'fa' | 'en'
  const base = `/${locale}`
  const t = useTranslations('famousClients')
  const related = famousClients.filter((c) => c.slug !== client.slug).slice(0, 4)

  return (
    <>
      <PageHero
        title={client.name[locale]}
        subtitle={client.caseSummary[locale]}
        breadcrumb={[
          { label: locale === 'fa' ? 'خانه' : 'Home', href: base },
          { label: t('title'), href: `${base}/famous-clients` },
          { label: client.name[locale], href: `${base}/famous-clients/${client.slug}` },
        ]}
      />

      <section className="py-20 bg-navy">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Client photo */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
              <Image src={client.photo} alt={client.name[locale]} fill className="object-cover" />
            </div>

            {/* Case detail */}
            <div className="lg:col-span-2">
              <span className="inline-block bg-gold/20 text-gold text-xs px-3 py-1 rounded-full mb-4">
                {client.category[locale]}
              </span>
              <h2 className="font-morabba text-3xl text-cream mb-4">{client.caseSummary[locale]}</h2>
              <p className="text-cream/80 leading-relaxed text-lg">{client.caseDetail[locale]}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Related clients */}
      <section className="py-16 bg-navy-light">
        <Container>
          <h2 className="font-morabba text-2xl text-cream mb-8">
            {locale === 'fa' ? 'موکلین شناخته شده مرتبط' : 'Related Famous Clients'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((c) => (
              <ClientCard
                key={c.slug}
                name={c.name[locale]}
                photo={c.photo}
                href={`${base}/famous-clients/${c.slug}`}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: implement Famous Clients list and detail pages"
```

---

## Task 13: Attorney Abroad Page

**Files:**
- Create: `web/app/[locale]/attorney-abroad/page.tsx`

- [ ] **Step 1: Create Attorney Abroad page**

Create `web/app/[locale]/attorney-abroad/page.tsx`:
```tsx
import { useTranslations, useLocale } from 'next-intl'
import PageHero from '@/components/shared/PageHero'
import Container from '@/components/shared/Container'
import SectionTitle from '@/components/shared/SectionTitle'
import Button from '@/components/shared/Button'

export default function AttorneyAbroadPage() {
  const t = useTranslations('attorneyAbroad')
  const locale = useLocale()
  const base = `/${locale}`
  const isFa = locale === 'fa'

  const topics = isFa
    ? [
        'حقوق اموال و ارث برای ایرانیان خارج از کشور',
        'طلاق و امور خانوادگی در خارج از کشور',
        'حقوق تابعیت و شهروندی',
        'استرداد اموال از ایران',
        'دعاوی تجاری بین‌المللی',
        'حقوق کار برای ایرانیان مقیم خارج',
      ]
    : [
        'Property and inheritance rights for Iranians abroad',
        'Divorce and family matters outside Iran',
        'Citizenship and nationality rights',
        'Asset recovery from Iran',
        'International commercial disputes',
        'Labor rights for Iranians residing abroad',
      ]

  return (
    <>
      <PageHero
        title={t('title')}
        subtitle={t('subtitle')}
        breadcrumb={[
          { label: isFa ? 'خانه' : 'Home', href: base },
          { label: t('title'), href: `${base}/attorney-abroad` },
        ]}
      />

      {/* Intro */}
      <section className="py-20 bg-navy">
        <Container size="md">
          <p className="text-cream/80 leading-relaxed text-lg mb-8">
            {isFa
              ? 'یکی از تخصص‌های برجسته گروه دادگستر نوبل، نمایندگی و پشتیبانی حقوقی از ایرانیان مقیم خارج از کشور است. ما درک عمیقی از چالش‌های منحصر‌به‌فردی داریم که ایرانیان خارج از کشور با آن‌ها روبرو هستند.'
              : 'One of Nobel Justice Group\'s core specializations is legal representation and support for Iranians residing outside Iran. We have a deep understanding of the unique challenges faced by Iranians abroad.'}
          </p>
        </Container>
      </section>

      {/* Topics */}
      <section className="py-16 bg-navy-light">
        <Container>
          <SectionTitle
            title={isFa ? 'موضوعات حقوقی ایرانیان خارج' : 'Legal Topics for Iranians Abroad'}
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic) => (
              <div
                key={topic}
                className="flex items-center gap-3 bg-navy rounded-xl p-4 border border-white/10"
              >
                <span className="text-gold text-xl flex-shrink-0">✓</span>
                <span className="text-cream/80">{topic}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Detail text */}
      <section className="py-20 bg-navy">
        <Container size="md">
          <SectionTitle
            title={isFa ? 'وکیل ایرانی خارج از کشور' : 'Iranian Lawyer Abroad'}
            align="start"
            className="mb-6"
          />
          <div className="space-y-4 text-cream/80 leading-relaxed">
            <p>
              {isFa
                ? 'گروه دادگستر نوبل با بیش از یک دهه تجربه در نمایندگی ایرانیان خارج از کشور، یکی از معتبرترین مراجع حقوقی برای هموطنان عزیز مقیم خارج محسوب می‌شود. ما می‌دانیم که زندگی در کشوری دیگر، چالش‌های حقوقی خاص خود را به همراه دارد.'
                : 'Nobel Justice Group, with over a decade of experience representing Iranians abroad, is one of the most reputable legal references for our compatriots residing outside Iran. We understand that living in another country brings its own unique legal challenges.'}
            </p>
            <p>
              {isFa
                ? 'خدمات ما شامل مشاوره آنلاین، تهیه اسناد حقوقی، نمایندگی در دادگاه‌های ایران و ارتباط با وکلای بین‌المللی می‌شود. تیم متخصص ما در تمام مراحل در کنار شما خواهد بود.'
                : 'Our services include online consultation, preparation of legal documents, representation in Iranian courts and liaison with international lawyers. Our specialized team will be with you every step of the way.'}
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy-light text-center">
        <Container size="sm">
          <h2 className="font-morabba text-3xl text-cream mb-6">
            {isFa ? 'همین حالا مشاوره بگیرید' : 'Get Consultation Now'}
          </h2>
          <Button variant="gold" href={`${base}/contact`} size="lg">
            {t('consultationCta')}
          </Button>
        </Container>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: implement Attorney Abroad page with topics and CTA"
```

---

## Task 14: FAQ Page

**Files:**
- Create: `web/app/[locale]/faq/page.tsx`

- [ ] **Step 1: Create FAQ page**

Create `web/app/[locale]/faq/page.tsx`:
```tsx
import { useTranslations, useLocale } from 'next-intl'
import { faqItems } from '@/data/faq'
import PageHero from '@/components/shared/PageHero'
import Accordion from '@/components/shared/Accordion'
import Container from '@/components/shared/Container'
import Button from '@/components/shared/Button'

export default function FaqPage() {
  const t = useTranslations('faq')
  const locale = useLocale()
  const base = `/${locale}`

  const items = faqItems.map((item) => ({
    id: item.id,
    question: item.question[locale as 'fa' | 'en'],
    answer: item.answer[locale as 'fa' | 'en'],
  }))

  return (
    <>
      <PageHero
        title={t('title')}
        breadcrumb={[
          { label: locale === 'fa' ? 'خانه' : 'Home', href: base },
          { label: t('title'), href: `${base}/faq` },
        ]}
      />

      <section className="py-20 bg-navy">
        <Container size="md">
          <Accordion items={items} />
        </Container>
      </section>

      <section className="py-16 bg-navy-light text-center">
        <Container size="sm">
          <h2 className="font-morabba text-2xl text-cream mb-6">
            {locale === 'fa'
              ? 'سوال شما اینجا نیست؟ با ما تماس بگیرید'
              : "Didn't find your question? Contact us"}
          </h2>
          <Button variant="gold" href={`${base}/contact`} size="lg">
            {t('consultationCta')}
          </Button>
        </Container>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: implement FAQ page with full accordion and CTA"
```

---

## Task 15: Blog Pages

**Files:**
- Create: `web/app/[locale]/blog/page.tsx`
- Create: `web/app/[locale]/blog/[slug]/page.tsx`

- [ ] **Step 1: Create Blog list page**

Create `web/app/[locale]/blog/page.tsx`:
```tsx
import { useTranslations, useLocale } from 'next-intl'
import { blogPosts } from '@/data/blog'
import PageHero from '@/components/shared/PageHero'
import BlogCard from '@/components/shared/BlogCard'
import Container from '@/components/shared/Container'

export default function BlogPage() {
  const t = useTranslations('blog')
  const locale = useLocale()
  const base = `/${locale}`

  return (
    <>
      <PageHero
        title={t('title')}
        breadcrumb={[
          { label: locale === 'fa' ? 'خانه' : 'Home', href: base },
          { label: t('title'), href: `${base}/blog` },
        ]}
      />

      <section className="py-20 bg-navy">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title[locale as 'fa' | 'en']}
                excerpt={post.excerpt[locale as 'fa' | 'en']}
                coverImage={post.coverImage}
                date={post.date}
                category={post.category[locale as 'fa' | 'en']}
                href={`${base}/blog/${post.slug}`}
                readMoreLabel={t('readMore')}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create Blog detail page**

Create `web/app/[locale]/blog/[slug]/page.tsx`:
```tsx
import { notFound } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { blogPosts } from '@/data/blog'
import Container from '@/components/shared/Container'
import BlogCard from '@/components/shared/BlogCard'

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export default function BlogDetailPage({ params }: { params: { slug: string; locale: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const locale = params.locale as 'fa' | 'en'
  const base = `/${locale}`
  const t = useTranslations('blog')
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      {/* Article hero */}
      <section className="relative h-72 bg-navy-light overflow-hidden">
        <Image src={post.coverImage} alt={post.title[locale]} fill className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
        <div className="absolute bottom-0 start-0 end-0 p-8">
          <Container>
            <nav className="flex items-center gap-2 text-sm text-cream/50 mb-3">
              <a href={base} className="hover:text-gold">{locale === 'fa' ? 'خانه' : 'Home'}</a>
              <span>/</span>
              <a href={`${base}/blog`} className="hover:text-gold">{t('title')}</a>
              <span>/</span>
              <span className="text-cream/80">{post.title[locale]}</span>
            </nav>
            <h1 className="font-morabba text-3xl md:text-4xl text-cream">{post.title[locale]}</h1>
            <div className="flex items-center gap-4 mt-3">
              <span className="bg-gold/20 text-gold text-xs px-3 py-1 rounded-full">
                {post.category[locale]}
              </span>
              <span className="text-cream/50 text-sm">{post.date}</span>
            </div>
          </Container>
        </div>
      </section>

      {/* Article body */}
      <section className="py-16 bg-navy">
        <Container size="md">
          <div className="prose prose-invert max-w-none">
            <p className="text-cream/80 leading-relaxed text-lg">{post.body[locale]}</p>
          </div>
        </Container>
      </section>

      {/* Related articles */}
      <section className="py-16 bg-navy-light">
        <Container>
          <h2 className="font-morabba text-2xl text-cream mb-8">{t('relatedTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <BlogCard
                key={p.slug}
                title={p.title[locale]}
                excerpt={p.excerpt[locale]}
                coverImage={p.coverImage}
                date={p.date}
                category={p.category[locale]}
                href={`${base}/blog/${p.slug}`}
                readMoreLabel={t('readMore')}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: implement Blog list and Blog detail pages"
```

---

## Task 16: Contact Page

**Files:**
- Create: `web/app/[locale]/contact/page.tsx`

- [ ] **Step 1: Create Contact page**

Create `web/app/[locale]/contact/page.tsx`:
```tsx
'use client'
import { useTranslations, useLocale } from 'next-intl'
import { useState } from 'react'
import PageHero from '@/components/shared/PageHero'
import Container from '@/components/shared/Container'
import Button from '@/components/shared/Button'

export default function ContactPage() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const base = `/${locale}`
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', subject: '', message: ''
  })

  const subjects = locale === 'fa'
    ? ['مشاوره حقوقی', 'وکیل ایرانیان خارج', 'حقوق بین‌الملل', 'سایر موارد']
    : ['Legal Consultation', 'Iranians Abroad', 'International Law', 'Other']

  return (
    <>
      <PageHero
        title={t('title')}
        subtitle={t('heroText')}
        breadcrumb={[
          { label: locale === 'fa' ? 'خانه' : 'Home', href: base },
          { label: t('title'), href: `${base}/contact` },
        ]}
      />

      {/* Contact info bar */}
      <section className="py-10 bg-navy-light border-b border-white/10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-gold text-2xl mb-2">𝕏</p>
              <a href="https://twitter.com" className="text-cream/70 text-sm hover:text-gold transition-colors">
                @NoblJusticeGroup
              </a>
            </div>
            <div>
              <p className="text-gold text-2xl mb-2">📍</p>
              <p className="text-cream/70 text-sm">{t('address')}</p>
            </div>
            <div>
              <p className="text-gold text-2xl mb-2">📞</p>
              <p className="text-cream/70 text-sm" dir="ltr">{t('phone1')}</p>
              <p className="text-cream/70 text-sm" dir="ltr">{t('phone2')}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Map */}
      <div className="h-64 w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.7!2d51.4300!3d35.7719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ2JzE5LjkiTiA1McKwMjUnNDguMCJF!5e0!3m2!1sen!2s!4v1"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Nobel Justice Group Location"
        />
      </div>

      {/* Contact form */}
      <section className="py-20 bg-navy">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="relative aspect-square rounded-2xl overflow-hidden hidden lg:block">
              <div className="absolute inset-0 bg-navy-lighter" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-cream/20 font-morabba text-6xl font-bold rotate-[-15deg]">
                  {locale === 'fa' ? 'تماس با ما' : 'Contact Us'}
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-morabba text-2xl text-cream mb-6">{t('formTitle')}</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={t('namePlaceholder')}
                    className="bg-navy-light border border-white/10 rounded-lg px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder={t('lastNamePlaceholder')}
                    className="bg-navy-light border border-white/10 rounded-lg px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    className="bg-navy-light border border-white/10 rounded-lg px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <input
                    type="tel"
                    placeholder={t('phonePlaceholder')}
                    className="bg-navy-light border border-white/10 rounded-lg px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <select
                  className="w-full bg-navy-light border border-white/10 rounded-lg px-4 py-3 text-cream/70 focus:outline-none focus:border-gold transition-colors"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                >
                  <option value="" disabled>{t('subjectPlaceholder')}</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <textarea
                  rows={5}
                  placeholder={t('messagePlaceholder')}
                  className="w-full bg-navy-light border border-white/10 rounded-lg px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors resize-none"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <div className="text-xs text-cream/40">
                  {locale === 'fa'
                    ? 'با ارسال این فرم، رازداری و اطلاعات شما به طور کامل محافظت خواهد شد.'
                    : 'By submitting this form, your confidentiality and information will be fully protected.'}
                </div>
                <Button variant="gold" type="submit" className="w-full justify-center" size="lg">
                  {t('submitCta')}
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: implement Contact page with map, contact info, and consultation form"
```

---

## Task 17: Final Build Check + Placeholder Images + Deploy

**Files:**
- Create: `web/public/images/` (add placeholder images)
- Create: `web/public/images/logo.png`

- [ ] **Step 1: Add placeholder images**

Create placeholder images for all referenced paths. Run from `web/` directory:
```bash
mkdir -p public/images/{team,clients,blog,cities,partners}

# Create simple SVG placeholders for all image paths
for dir in public/images public/images/team public/images/clients public/images/blog public/images/cities public/images/partners; do
  for name in hero-bg about-snippet about-main attorney-abroad-bg consultation-bg logo; do
    [ ! -f "$dir/$name.jpg" ] && [ ! -f "$dir/$name.png" ] || true
  done
done
```

Create `web/public/images/placeholder.svg` as a fallback:
```html
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#243447"/>
  <text x="400" y="300" font-family="sans-serif" font-size="24" fill="#C9A84C" text-anchor="middle">Nobel Justice Group</text>
</svg>
```

Then update `web/next.config.ts` to allow unoptimized images in dev:
```ts
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
  },
}

export default withNextIntl(nextConfig)
```

- [ ] **Step 2: Update all Image components to handle missing files gracefully**

In each component that uses `<Image>`, add `onError` handling. Example for `ClientCard.tsx`:
```tsx
// Add to ClientCard.tsx image props:
onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.svg' }}
```
Repeat for: `TeamCard.tsx`, `BlogCard.tsx`, `CityCard.tsx`, `Hero.tsx`, `AboutSnippet.tsx`.

- [ ] **Step 3: Run full build**

```bash
cd web && npm run build
```
Expected: Build succeeds with 0 TypeScript errors.

- [ ] **Step 4: Run all tests**

```bash
cd web && npx jest --no-coverage
```
Expected: All tests pass.

- [ ] **Step 5: Test dev server locally**

```bash
cd web && npm run dev
```
Open `http://localhost:3000` — should redirect to `http://localhost:3000/fa`.
Check: Farsi text is RTL, gold navbar visible, all sections render.
Open `http://localhost:3000/en` — should show English LTR version.

- [ ] **Step 6: Create vercel.json**

Create `web/vercel.json`:
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

- [ ] **Step 7: Push to GitHub and deploy to Vercel**

```bash
cd web && git add -A && git commit -m "feat: final build configuration and placeholder images"
```

Then:
1. Create a new GitHub repository for this project
2. Push: `git remote add origin <your-repo-url> && git push -u origin main`
3. Go to vercel.com → New Project → Import from GitHub → select repo
4. Vercel auto-detects Next.js. Click Deploy.
5. Set environment variable if needed (none required for static content).

Expected: Live URL like `https://nobel-justice-group.vercel.app`

- [ ] **Step 8: Final commit**

```bash
git add -A && git commit -m "feat: deploy-ready Nobel Justice Group website — all 10 pages, bilingual FA/EN, RTL/LTR"
```

---

## Self-Review

### Spec Coverage Check

| Spec Requirement | Task |
|---|---|
| Next.js 14 + TypeScript | Task 1 |
| Tailwind CSS with navy/gold tokens | Task 2 |
| Morabba + Vazirmatn fonts | Task 2 |
| next-intl FA/EN bilingual routing | Task 3 |
| Static TypeScript data layer | Task 4 |
| Button, SectionTitle, Container | Task 5 |
| Accordion, ClientCard, TeamCard, BlogCard, CityCard, PageHero | Task 6 |
| Navbar (sticky, RTL, mobile, locale toggle) | Task 7 |
| Footer (4-col, map, social) | Task 8 |
| Home page (all 10 sections) | Task 9 |
| About page | Task 10 |
| Team list + detail | Task 11 |
| Famous Clients list + detail | Task 12 |
| Attorney Abroad page | Task 13 |
| FAQ page | Task 14 |
| Blog list + detail | Task 15 |
| Contact page with form | Task 16 |
| Vercel deployment | Task 17 |

All spec requirements covered. No gaps found.

### Type Consistency Check
- `BilingualString` defined in `data/types.ts` (Task 4) — used consistently via `[locale as 'fa' | 'en']` in all components
- `TeamMember`, `FamousClient`, `BlogPost`, `FaqItem`, `OfficeCity`, `Partner` — all defined in Task 4, consumed in Tasks 9–16
- `Button` props (`variant`, `href`, `size`) consistent across all usages
- `Accordion` `items` prop `{ id, question, answer }` — defined in Task 6, used consistently in Tasks 8 and 14
