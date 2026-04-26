'use client'

interface Props {
  label: string
  faValue: string
  enValue: string
  onFaChange: (v: string) => void
  onEnChange: (v: string) => void
  type?: 'input' | 'textarea'
  required?: boolean
}

export default function BilingualField({
  label,
  faValue,
  enValue,
  onFaChange,
  onEnChange,
  type = 'input',
  required,
}: Props) {
  const inputClass =
    'w-full bg-navy border border-white/20 rounded-lg px-3 py-2 text-cream placeholder-cream/30 focus:border-gold focus:outline-none text-sm'

  return (
    <div>
      <p className="text-cream/70 text-xs mb-2">
        {label}
        {required && <span className="text-gold ms-1">*</span>}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-cream/40 text-xs mb-1">فارسی</p>
          {type === 'textarea' ? (
            <textarea
              value={faValue}
              onChange={(e) => onFaChange(e.target.value)}
              className={`${inputClass} min-h-[80px] resize-y`}
              dir="rtl"
              required={required}
            />
          ) : (
            <input
              type="text"
              value={faValue}
              onChange={(e) => onFaChange(e.target.value)}
              className={inputClass}
              dir="rtl"
              required={required}
            />
          )}
        </div>
        <div>
          <p className="text-cream/40 text-xs mb-1">English</p>
          {type === 'textarea' ? (
            <textarea
              value={enValue}
              onChange={(e) => onEnChange(e.target.value)}
              className={`${inputClass} min-h-[80px] resize-y`}
              dir="ltr"
            />
          ) : (
            <input
              type="text"
              value={enValue}
              onChange={(e) => onEnChange(e.target.value)}
              className={inputClass}
              dir="ltr"
            />
          )}
        </div>
      </div>
    </div>
  )
}
