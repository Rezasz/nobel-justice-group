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
  const isCenter = align === 'center'
  return (
    <div className={`${isCenter ? 'text-center' : 'text-start'} ${className}`}>
      <h2 className="font-morabba text-3xl font-bold text-cream mb-3">{title}</h2>
      <div className={`h-1 w-16 bg-gold rounded ${isCenter ? 'mx-auto' : ''} mb-4`} />
      {subtitle && (
        <p className="text-cream/70 text-base max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  )
}
