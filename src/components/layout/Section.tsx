import { ReactNode, HTMLAttributes } from 'react'

type BackgroundVariant = 'neutral-100' | 'neutral-200' | 'white'
type PaddingVariant = 'sm' | 'md' | 'lg' | 'xl'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  background?: BackgroundVariant
  padding?: PaddingVariant
  as?: 'section' | 'div'
}

/**
 * Section wrapper component with consistent vertical spacing
 * Background variants and padding options
 */
export function Section({
  children,
  background = 'white',
  padding = 'lg',
  as: Component = 'section',
  className = '',
  ...props
}: SectionProps) {
  const backgroundStyles = {
    'neutral-100': 'bg-neutral-100',
    'neutral-200': 'bg-neutral-200',
    white: 'bg-white',
  }

  const paddingStyles = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24',
  }

  return (
    <Component
      className={`${backgroundStyles[background]} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
