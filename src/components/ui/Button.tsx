import type { ButtonHTMLAttributes, ReactNode, ElementType } from 'react'
import type { ButtonVariant, ButtonSize } from '@/types/components'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'as'> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  as?: ElementType
  [key: string]: unknown
}

/**
 * Button component with multiple variants and sizes
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Kontakt klinikken
 * </Button>
 * ```
 */
export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    disabled,
    as: Component = 'button',
    ...restProps
  } = props
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantStyles = {
    primary:
      'bg-primary-500 text-white hover:bg-primary-700 active:bg-primary-700',
    secondary:
      'border-2 border-primary-500 text-primary-500 hover:bg-neutral-200 active:bg-neutral-200',
    text: 'text-primary-500 hover:underline active:text-primary-700',
  }

  const sizeStyles = {
    sm: 'text-body-sm px-4 py-2 min-h-[44px]',
    md: 'text-body px-6 py-3 min-h-[44px]',
    lg: 'text-body-lg px-8 py-4 min-h-[44px]',
  }

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  // Extract button-specific props when rendering as a link
  const { type, ...linkProps } = restProps as ButtonHTMLAttributes<HTMLButtonElement>

  if (Component !== 'button') {
    return (
      <Component className={combinedStyles} {...linkProps}>
        {children}
      </Component>
    )
  }

  return (
    <button
      className={combinedStyles}
      disabled={disabled}
      type={type || 'button'}
      {...restProps}
    >
      {children}
    </button>
  )
}
