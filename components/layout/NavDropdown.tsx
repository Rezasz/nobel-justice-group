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
        <span className={`transition-transform text-xs ${open ? 'rotate-180' : ''}`}>▾</span>
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
