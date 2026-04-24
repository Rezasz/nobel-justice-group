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
  const classes = [
    'inline-flex items-center justify-center rounded',
    sizeClasses[size],
    variantClasses[variant],
    className,
  ].join(' ')

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
