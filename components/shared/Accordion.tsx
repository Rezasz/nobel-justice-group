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
        <div key={item.id} className="bg-navy-light rounded-lg border border-white/10">
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
