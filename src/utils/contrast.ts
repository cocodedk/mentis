/**
 * Color contrast validation utilities
 * Verify WCAG AA compliance (4.5:1 for text, 3:1 for buttons)
 */

/**
 * Calculate relative luminance of a color
 * Based on WCAG 2.1 formula
 */
function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    val = val / 255
    return val <= 0.03928
      ? val / 12.92
      : Math.pow((val + 0.055) / 1.055, 2.4)
  })

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)

  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Check if contrast ratio meets WCAG AA standards
 * @param ratio - Contrast ratio to check
 * @param isLargeText - Whether text is large (18px+ or 14px+ bold)
 * @returns true if meets WCAG AA standards
 */
export function meetsWCAGAA(
  ratio: number,
  isLargeText = false
): boolean {
  return isLargeText ? ratio >= 3 : ratio >= 4.5
}

/**
 * Check if contrast ratio meets WCAG AAA standards
 */
export function meetsWCAGAAA(
  ratio: number,
  isLargeText = false
): boolean {
  return isLargeText ? ratio >= 4.5 : ratio >= 7
}

/**
 * Validate design system color combinations
 */
export function validateDesignSystemContrast() {
  const colors = {
    primary500: '#1F4E5F',
    primary700: '#163E4D',
    accent500: '#5FA8A1',
    neutral100: '#FAFAFA',
    neutral200: '#F2F6F8',
    neutral600: '#5B6B73',
    neutral900: '#1E2930',
    white: '#FFFFFF',
  }

  const primaryTextRatio = getContrastRatio(colors.neutral900, colors.white)
  const secondaryTextRatio = getContrastRatio(colors.neutral600, colors.white)
  const buttonTextRatio = getContrastRatio(colors.white, colors.primary500)
  const neutral200Ratio = getContrastRatio(colors.neutral900, colors.neutral200)

  const validations = [
    {
      name: 'Primary text on white',
      foreground: colors.neutral900,
      background: colors.white,
      ratio: primaryTextRatio,
      passes: meetsWCAGAA(primaryTextRatio),
    },
    {
      name: 'Secondary text on white',
      foreground: colors.neutral600,
      background: colors.white,
      ratio: secondaryTextRatio,
      passes: meetsWCAGAA(secondaryTextRatio),
    },
    {
      name: 'Primary button text',
      foreground: colors.white,
      background: colors.primary500,
      ratio: buttonTextRatio,
      passes: meetsWCAGAA(buttonTextRatio),
    },
    {
      name: 'Text on neutral-200',
      foreground: colors.neutral900,
      background: colors.neutral200,
      ratio: neutral200Ratio,
      passes: meetsWCAGAA(neutral200Ratio),
    },
  ]

  return validations
}
