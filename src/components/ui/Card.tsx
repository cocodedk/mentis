import type { ReactNode, HTMLAttributes } from 'react'
import type { CardVariant } from '@/types/components'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  children: ReactNode
  onClick?: () => void
}

/**
 * Card component with multiple variants for different use cases
 *
 * @example
 * ```tsx
 * <Card variant="treatment">
 *   <h3>TMS Treatment</h3>
 *   <p>Description...</p>
 * </Card>
 * ```
 */
export function Card({
  variant = 'default',
  children,
  className = '',
  onClick,
  ...props
}: CardProps) {
  const baseStyles =
    'bg-white rounded-lg shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-primary-500'

  const variantStyles = {
    default: 'p-6',
    treatment: 'p-6',
    staff: 'p-6',
    pricing: 'p-6 border border-neutral-200',
    info: 'p-6 bg-neutral-200',
  }

  const clickableStyles = onClick ? 'cursor-pointer hover:shadow-md' : ''

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${clickableStyles} ${className}`

  return (
    <div
      className={combinedStyles}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
      {...props}
    >
      {children}
    </div>
  )
}
