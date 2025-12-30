/**
 * Responsive utility functions
 */

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

/**
 * Check if current viewport matches a breakpoint
 */
export function matchesBreakpoint(breakpoint: keyof typeof breakpoints): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= breakpoints[breakpoint]
}

/**
 * Get current breakpoint name
 */
export function getCurrentBreakpoint():
  | 'mobile'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl' {
  if (typeof window === 'undefined') return 'mobile'

  if (window.innerWidth >= breakpoints.xl) return 'xl'
  if (window.innerWidth >= breakpoints.lg) return 'lg'
  if (window.innerWidth >= breakpoints.md) return 'md'
  if (window.innerWidth >= breakpoints.sm) return 'sm'
  return 'mobile'
}
