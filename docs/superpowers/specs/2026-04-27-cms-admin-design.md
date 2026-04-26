# Nobel Justice Group — CMS Admin Panel Design Spec
**Date:** 2026-04-27
**Project:** Nobel Justice Group — Custom CMS
**Scope:** Admin panel + Vercel Blob content store + dynamic public pages

---

## Overview

Replace the static TypeScript data files with a Vercel Blob–backed JSON store, and add a protected `/admin` panel where the law firm's single administrator can create, edit, and delete all site content (team members, famous clients, blog posts, FAQ, office cities, partners) as well as upload images.

---

## Tech Stack Additions

| Concern | Choice |
|---|---|
| Storage | Vercel Blob (`@vercel/blob`) |
| Auth | Single password via `ADMIN_PASSWORD` env var, bcrypt comparison, HTTP-only cookie |
| Image uploads | Vercel Blob (public URLs stored in JSON) |
| Markdown | `marked` — lightweight parser for blog post body rendering |
| Password hashing | `bcryptjs` |

---

## Architecture

### Data Flow — Public Pages

```
Browser request
  └─ Next.js server component (e.g. app/[locale]/team/page.tsx)
       └─ lib/content.ts → getTeam()
            └─ fetch(`${BLOB_BASE_URL}/njg/data/team.json`)
                 └─ returns TeamMember[]
```

On first request, Next.js caches the fetch. After admin saves, `revalidatePath('/', 'layout')` clears the entire cache so the next request reflects new content.

### Data Flow — Admin Panel

```
Admin browser
  └─ /admin/[section] (client component)
       └─ fetch GET /api/admin/[collection]   ← read current JSON
       └─ form submit PUT /api/admin/[collection]  ← write updated JSON to Blob
       └─ image upload POST /api/admin/images  ← upload to Blob, returns URL
```

All `/api/admin/*` routes and `/admin/*` pages are protected by the auth middleware.

---

## Blob Storage Layout

```
Vercel Blob bucket:
  njg/data/team.json          → TeamMember[]
  njg/data/clients.json       → FamousClient[]
  njg/data/blog.json          → BlogPost[]
  njg/data/faq.json           → FaqItem[]
  njg/data/offices.json       → OfficeCity[]
  njg/data/partners.json      → Partner[]
  njg/images/team/            → uploaded team photos
  njg/images/clients/         → uploaded client photos
  njg/images/blog/            → uploaded blog cover images
  njg/images/cities/          → uploaded city photos
  njg/images/partners/        → uploaded partner logos
  njg/images/misc/            → other uploads
```

JSON files are stored with `access: 'public'` so the public Next.js app can fetch them without auth. Image files are also public.

---

## File Structure

```
web/
├── app/
│   ├── admin/
│   │   ├── layout.tsx              # auth gate — redirects to /admin/login if no session cookie
│   │   ├── login/
│   │   │   └── page.tsx            # login form (password only)
│   │   ├── page.tsx                # redirects to /admin/team
│   │   └── [section]/
│   │       └── page.tsx            # list + edit UI for each collection
│   └── api/
│       └── admin/
│           ├── login/route.ts      # POST: verify password, set cookie
│           ├── logout/route.ts     # POST: clear cookie
│           ├── [collection]/
│           │   └── route.ts        # GET: read JSON from Blob, PUT: write JSON to Blob
│           └── images/
│               └── route.ts        # POST: upload image to Blob, returns { url }
├── lib/
│   ├── content.ts                  # getTeam(), getBlog(), getFaq(), etc. — fetch from Blob
│   ├── blob.ts                     # readJson(path), writeJson(path, data) helpers
│   └── auth.ts                     # verifySession(request) — checks admin_session cookie
└── middleware.ts                   # extended: blocks /admin/* and /api/admin/* without valid cookie
```

---

## Auth

- **Login:** `POST /api/admin/login` receives `{ password }`, compares with `bcrypt.compare(password, ADMIN_PASSWORD_HASH)`. On success, sets an HTTP-only `SameSite=Strict` cookie named `admin_session` containing a signed JWT (secret = `ADMIN_JWT_SECRET` env var), 7-day expiry.
- **Middleware:** Next.js middleware checks `admin_session` cookie on all `/admin/*` and `/api/admin/*` requests. Invalid or missing cookie → redirect to `/admin/login` (for pages) or 401 JSON (for API routes).
- **Logout:** `POST /api/admin/logout` clears the cookie.
- **Environment variables required:**
  - `ADMIN_PASSWORD_HASH` — bcrypt hash of the admin password (generated once via script)
  - `ADMIN_JWT_SECRET` — random 32-char string for signing the session token

---

## Content API

All routes under `/api/admin/[collection]`:

| Method | Behaviour |
|---|---|
| `GET` | Read `njg/data/{collection}.json` from Blob, return parsed JSON |
| `PUT` | Receive full array as JSON body, write to Blob, call `revalidatePath('/', 'layout')`, return `{ ok: true }` |

Valid `collection` values: `team`, `clients`, `blog`, `faq`, `offices`, `partners`.

Image upload (`POST /api/admin/images`):
- Receives `multipart/form-data` with `file` field and optional `folder` field (e.g. `team`)
- Uploads to Vercel Blob at `njg/images/{folder}/{timestamp}-{filename}`
- Returns `{ url: string }` — the public Blob URL

---

## Admin UI

### Shell
- Dark navy theme reusing existing design tokens
- Sidebar (fixed left on desktop, hamburger on mobile) with links to each section
- Header with site name + Logout button
- No React framework beyond what's already installed (plain React state + fetch)

### Collection List View (`/admin/[section]`)
Each section shows a grid of cards, one per item:
- Team: photo thumbnail + name (FA) + title (FA)
- Clients: photo + name (FA)
- Blog: cover + title (FA) + date
- FAQ: question (FA) truncated
- Offices: photo + city (FA)
- Partners: logo + name

Actions per card: **Edit** (opens modal) | **Delete** (confirm dialog)
**+ Add New** button top-right opens empty edit modal.

### Edit Modal
- Full-screen overlay on mobile, centered modal (max-w-3xl) on desktop
- Bilingual fields: two columns — FA (RTL, right column) | EN (LTR, left column)
- Text fields: `<input>` for short strings, `<textarea>` for long text / bio / body
- Blog body: textarea (Markdown supported, rendered via `marked` on the public page)
- Image field: shows current image thumbnail + "Change Image" upload button
- Slug field: auto-generated from FA name on create, manually editable on edit
- Specializations (Team): comma-separated input for FA and EN separately
- Save button: PUT to API, closes modal, refreshes list
- Delete in modal: confirm then DELETE (removes item from array, writes back)

### Image Upload Flow (in modal)
1. Admin clicks "Change Image" → file picker opens
2. Selected file posted to `POST /api/admin/images`
3. Returned URL replaces the image field value in the form
4. Thumbnail updates immediately

---

## Public Pages — Data Layer Migration

Replace all static imports in public pages with `lib/content.ts` calls:

| Before | After |
|---|---|
| `import { team } from '@/data/team'` | `const team = await getTeam()` |
| `import { blogPosts } from '@/data/blog'` | `const posts = await getBlog()` |
| etc. | etc. |

`lib/content.ts` functions:
- `getTeam()` — fetches `njg/data/team.json`, returns `TeamMember[]`
- `getClients()` — fetches `njg/data/clients.json`, returns `FamousClient[]`
- `getBlog()` — fetches `njg/data/blog.json`, returns `BlogPost[]`
- `getFaq()` — fetches `njg/data/faq.json`, returns `FaqItem[]`
- `getOffices()` — fetches `njg/data/offices.json`, returns `OfficeCity[]`
- `getPartners()` — fetches `njg/data/partners.json`, returns `Partner[]`

Each function uses `fetch(url, { next: { revalidate: 60 } })` — cache for 60 seconds, revalidated on admin save.

---

## Seed Script

A one-time script `scripts/seed-blob.ts` reads all existing TypeScript data files and writes them as JSON to Vercel Blob. Run once after deployment:

```bash
cd web && npx ts-node scripts/seed-blob.ts
```

---

## Environment Variables

Add to Vercel dashboard + `.env.local`:

```
BLOB_READ_WRITE_TOKEN=        # from Vercel Blob store creation
ADMIN_PASSWORD_HASH=          # bcrypt hash, generated via: npx ts-node scripts/hash-password.ts
ADMIN_JWT_SECRET=             # random 32+ char string
```

---

## Out of Scope

- Role-based access (multiple admin users)
- Draft / publish workflow
- Version history / undo
- Rich text WYSIWYG editor (plain textarea with Markdown)
- Image cropping / resizing
- Page-level text editing (`messages/fa.json` strings)
