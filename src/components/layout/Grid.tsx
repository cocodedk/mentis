import type { ReactNode, HTMLAttributes } from 'react'

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  cols?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: 'sm' | 'md' | 'lg'
}

/**
 * Grid layout component with responsive column counts
 * Default: 1 column on mobile, 2-3 on tablet, 3-4 on desktop
 */
export function Grid({
  children,
  cols = { default: 1, sm: 2, md: 3 },
  gap = 'md',
  className = '',
  ...props
}: GridProps) {
  const gapStyles = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  }

  const gridColsMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  }

  const getGridColsClass = (count: number) => gridColsMap[count] || 'grid-cols-1'

  const defaultCols = cols.default || 1
  const smCols = cols.sm || defaultCols
  const mdCols = cols.md || smCols
  const lgCols = cols.lg || mdCols
  const xlCols = cols.xl || lgCols

  const gridColsClasses = `grid ${getGridColsClass(defaultCols)} sm:${getGridColsClass(smCols)} md:${getGridColsClass(mdCols)} lg:${getGridColsClass(lgCols)} ${cols.xl ? `xl:${getGridColsClass(xlCols)}` : ''}`

  return (
    <div className={`${gridColsClasses} ${gapStyles[gap]} ${className}`} {...props}>
      {children}
    </div>
  )
}
