import type { ReactNode, HTMLAttributes } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: boolean
}

/**
 * Container wrapper component with responsive max-widths and padding
 * Uses Tailwind container class with custom configuration
 */
export function Container({
  children,
  maxWidth = 'xl',
  padding = true,
  className = '',
  ...props
}: ContainerProps) {
  const maxWidthStyles = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  }

  const paddingStyles = padding ? 'px-4 sm:px-6 lg:px-8' : ''

  return (
    <div
      className={`container mx-auto ${maxWidthStyles[maxWidth]} ${paddingStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
