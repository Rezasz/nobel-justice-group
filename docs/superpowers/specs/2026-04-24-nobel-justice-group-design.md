# Nobel Justice Group — Website Design Spec
**Date:** 2026-04-24  
**Project:** Nobel Justice Group (گروه دادگستر نوبل)  
**Subtitle:** Hosein Shahrokhi & Partners  

---

## Overview

A bilingual (Farsi + English) professional law firm website for Nobel Justice Group, based in Tehran. The firm specializes in international law, representing Iranians abroad, and handling high-profile/celebrity clients. The site is RTL-first (Farsi) with a full English mirror.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Heading Font | Morabba |
| Body Font | Vazirmatn |
| i18n | next-intl |
| Content | Static / hardcoded TypeScript data files |
| Deployment | Vercel |

---

## Project Structure

```
nobel-justice-group/
├── app/
│   └── [locale]/               # fa | en
│       ├── layout.tsx           # RTL/LTR + font switching per locale
│       ├── page.tsx             # Home
│       ├── about/page.tsx
│       ├── team/page.tsx
│       ├── team/[slug]/page.tsx
│       ├── contact/page.tsx
│       ├── famous-clients/page.tsx
│       ├── famous-clients/[slug]/page.tsx
│       ├── attorney-abroad/page.tsx
│       ├── faq/page.tsx
│       ├── blog/page.tsx
│       └── blog/[slug]/page.tsx
├── components/
│   ├── layout/        # Navbar, Footer
│   ├── home/          # Hero, AboutSection, FamousClientsSection, etc.
│   ├── shared/        # Button, Card, SectionTitle, Accordion, etc.
│   └── ui/            # low-level primitives
├── data/
│   ├── team.ts
│   ├── clients.ts
│   ├── blog.ts
│   ├── faq.ts
│   └── services.ts
├── messages/
│   ├── fa.json
│   └── en.json
├── public/
│   └── images/
├── styles/
│   └── globals.css
└── tailwind.config.ts
```

---

## Design System

### Colors

```ts
colors: {
  navy: {
    DEFAULT: '#1B2B3A',   // primary dark background
    light: '#243447',     // card backgrounds
    lighter: '#2D3E50',   // hover states
  },
  gold: {
    DEFAULT: '#C9A84C',   // primary accent
    light: '#D4B96A',     // hover accent
    dark: '#A8893A',      // pressed accent
  },
  cream: '#F5F0E8',       // light text on dark
}
```

### Typography

- **Headings (H1–H3):** Morabba — bold weight for hero text and section titles
- **Body / UI:** Vazirmatn — all body copy, navigation, buttons, form labels
- **Farsi locale:** `font-morabba` headings + `font-vazirmatn` body, `dir="rtl"`, `text-right`
- **English locale:** Inter/Geist for body, `dir="ltr"`, `text-left`

### Shared Components

| Component | Description |
|---|---|
| `Button` | Gold filled + navy outline variants, `sm`/`md`/`lg` sizes |
| `SectionTitle` | Centered heading with gold underline decoration |
| `Card` | Navy-light bg, rounded-xl, subtle gold border on hover |
| `Accordion` | Animated expand/collapse for FAQ |
| `ClientCard` | B&W photo + name overlay for famous clients grid |
| `TeamCard` | Photo + name + title + short bio + "مطالعه بیشتر" link |
| `BlogCard` | Cover image + title + date + excerpt |
| `CityCard` | City photo + name + subtitle for international offices |
| `Navbar` | Sticky, dark navy, RTL nav with EN/FA locale toggle + mobile hamburger |
| `Footer` | 4-column dark footer: logo+social, support info, legal info, links + Google Maps embed |

---

## Pages

### 1. Home (`/[locale]`)
Sections in order:
1. **Hero** — Full-screen, person photo background, headline "بی رحمانه صادق باش", two CTA buttons
2. **About Snippet** — Short intro paragraph + "بیشتر بدانید" button
3. **Famous Clients Carousel** — Horizontal scrollable row of `ClientCard`s
4. **Attorney Abroad CTA** — Dark section with text + "ادامه مطلب" button
5. **International Offices** — 4 `CityCard`s: Doha, Muscat, Dubai, Tehran
6. **Client Logos** — Logo carousel of partner/client brands
7. **Blog Preview** — 3 latest `BlogCard`s
8. **FAQ Accordion** — 4 most common questions
9. **Book Consultation CTA** — Full-width dark section with form link button
10. **Core Values** — 4-column icon grid (صداقت، تخصص، امانت، نوآوری)

### 2. About (`/[locale]/about`)
1. Page hero banner with title "درباره ما"
2. Full about text with scales-of-justice image
3. Vision statement for international legal services
4. Team grid preview (3 members) → links to `/team`
5. Mission section "ماموریت ما" with icon columns
6. International partners logo grid

### 3. Team List (`/[locale]/team`)
1. Page hero
2. Full grid of `TeamCard`s — all team members
3. Each card links to `/team/[slug]`

### 4. Team Detail (`/[locale]/team/[slug]`)
1. Large hero with name watermark (e.g. "Hosein Shahrokhi" background text)
2. Profile photo + name + title + specializations list
3. Full biography in two columns
4. Colleague cards (other team members)

### 5. Famous Clients List (`/[locale]/famous-clients`)
1. Page hero "موکلین شناخته شده"
2. Subtitle: "به سمع موکلان بزرگید به ۱۴ بهبودیه"
3. Full grid of `ClientCard`s — all famous clients (Hamid Sefat, Ali Yasini, Sohrab Pakzad, Solmaz Hosseini, Reza Sadeghi, etc.)
4. Stats bar: political clients count, social media celebrities, international cases (1.7%)

### 6. Famous Client Detail (`/[locale]/famous-clients/[slug]`)
1. Page title: client name
2. Subtitle: "احقاق حق و عدالت پس از فقدان"
3. Client photo + case narrative
4. Case timeline / key facts
5. Related famous clients carousel

### 7. Attorney Abroad (`/[locale]/attorney-abroad`)
1. Hero: "وکیل ایرانیان خارج از کشور"
2. Intro paragraph
3. Long-form content sections: legal topics for Iranians abroad
4. "وکیل ایرانی خارج از کشور" detailed section
5. International Address section
6. Book consultation CTA

### 8. FAQ (`/[locale]/faq`)
1. Page hero "پرسش های متداول شما"
2. One expanded example answer
3. Full accordion list of all FAQ questions
4. Book consultation CTA at bottom

### 9. Blog List (`/[locale]/blog`)
1. Page hero "مقالات"
2. 6-per-page grid of `BlogCard`s
3. Pagination controls

### 10. Blog Detail (`/[locale]/blog/[slug]`)
1. Breadcrumb
2. Article title + date + category
3. Hero image
4. Full article body (rich text)
5. Related articles row (3 cards)

---

## i18n Strategy

### Routing
- Default locale: `fa` → `/fa/...`
- Second locale: `en` → `/en/...`
- next-intl middleware redirects bare `/` → `/fa`
- Language toggle in Navbar: switches between `/fa/[current-path]` ↔ `/en/[current-path]`

### Content Structure
- UI strings: `messages/fa.json` + `messages/en.json`
- Long-form / data content: bilingual fields in TypeScript data files

```ts
// Example: data/team.ts
export const team: TeamMember[] = [
  {
    slug: 'hosein-shahrokhi',
    name: { fa: 'حسین شاهرخی', en: 'Hosein Shahrokhi' },
    title: { fa: 'بنیانگذار و مدیر عامل', en: 'Founder & Managing Partner' },
    bio: { fa: '...متن فارسی...', en: '...English text...' },
    specializations: {
      fa: ['حقوق بین‌الملل', 'حقوق تجاری'],
      en: ['International Law', 'Commercial Law'],
    },
  },
]
```

### RTL/LTR Switching
- `app/[locale]/layout.tsx` sets `<html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'}>`
- Tailwind `rtl:` variant handles mirrored spacing/layout automatically
- Navbar uses `flex-row-reverse` for RTL logo/menu positioning

### Fonts Per Locale
- `fa`: Morabba (headings) + Vazirmatn (body)
- `en`: Inter (headings + body)

---

## Navigation Structure

```
Navbar (RTL order, right to left):
صفحه اصلی | درباره ما ▾ | خدمات ما ▾ | موکلین شناخته شده | مقالات | سوالات متداول | تماس با ما | [EN/FA toggle] | [Logo]
```

Dropdowns:
- **درباره ما:** تیم ما، تاریخچه
- **خدمات ما:** وکیل ایرانیان خارج از کشور، خدمات بین‌الملل

---

## Footer Structure

**4 columns:**
1. Logo + social icons (Twitter, LinkedIn) + copyright
2. **پشتیبانی:** hours, phone, address
3. **اطلاعات حقوقی:** Privacy policy, Terms, Disclaimer
4. **ارتباط با ما:** About, Services, Team, Offices

**Below columns:** Google Maps embed (Tehran office location)

---

## Contact Information (Static Data)

- **Address (FA):** ایران، تهران، نقاطع اندرزگو و پاسداران شمالی، چهارراه فرمانیه، نارنجستان هفتم، بلک ۲، طبقه ۳، واحد ۳۱
- **Postal Code:** ۱۹۵۷۴۴۵۵۱
- **Phone:** (+۹۸) and (+۹۸)
- **Hours:** شنبه–پنج‌شنبه ۱۷:۰۰–۱۳:۰۰

---

## Data Files Summary

| File | Contents |
|---|---|
| `data/team.ts` | 8+ team members with slug, name, title, bio, photo, specializations (bilingual) |
| `data/clients.ts` | 15+ famous clients with slug, name, photo, case summary (bilingual) |
| `data/blog.ts` | 6+ articles with slug, title, date, category, excerpt, body (bilingual) |
| `data/faq.ts` | 10+ FAQ entries with question + answer (bilingual) |
| `data/services.ts` | 4 international offices with city, country, photo, description (bilingual) |
| `data/partners.ts` | Client/partner logos for home carousel |

---

## Out of Scope (v1)

- Backend / API routes
- Authentication or client portal
- CMS integration
- Payment / booking system (consultation CTA links to contact form only)
- Mobile app
