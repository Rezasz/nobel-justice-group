'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/admin/team', label: 'تیم ما', icon: '👥' },
  { href: '/admin/clients', label: 'موکلین', icon: '⚖️' },
  { href: '/admin/blog', label: 'مقالات', icon: '📝' },
  { href: '/admin/faq', label: 'سوالات متداول', icon: '❓' },
  { href: '/admin/offices', label: 'دفاتر بین‌الملل', icon: '🌍' },
  { href: '/admin/partners', label: 'شرکا', icon: '🤝' },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const sidebar = (
    <aside className="w-56 bg-navy-light border-e border-white/10 flex flex-col h-full">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold rounded flex items-center justify-center flex-shrink-0">
            <span className="text-navy font-bold text-xs">NJG</span>
          </div>
          <div>
            <p className="text-cream text-sm font-bold">پنل مدیریت</p>
            <p className="text-cream/40 text-xs">Nobel Justice Group</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-gold text-navy font-bold'
                  : 'text-cream/70 hover:text-cream hover:bg-white/5'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-3 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full text-sm text-cream/50 hover:text-red-400 transition-colors py-2 text-center"
        >
          خروج
        </button>
      </div>
    </aside>
  )

  return (
    <div className="min-h-screen bg-navy flex" dir="rtl">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col h-screen sticky top-0">{sidebar}</div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 end-0 z-30 lg:hidden transition-transform ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {sidebar}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between px-4 h-14 border-b border-white/10 bg-navy-light">
          <p className="text-cream text-sm font-bold">پنل مدیریت</p>
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-cream p-2"
            aria-label="Open menu"
          >
            ☰
          </button>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
