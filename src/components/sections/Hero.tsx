import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'

interface HeroProps {
  headline: string
  subheadline: string
  primaryCTA?: {
    label: string
    path: string
  }
  secondaryCTA?: {
    label: string
    path: string
  }
  backgroundImage?: string
}

/**
 * Hero section component for homepage
 * Displays headline, subheadline, and CTA buttons
 */
export function Hero({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
}: HeroProps) {
  return (
    <section
      className="relative min-h-[420px] sm:min-h-[500px] flex items-center justify-center bg-primary-500"
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      )}
      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-16 text-center">
        <h1 className="text-[28px] sm:text-[34px] md:text-h1 text-white mb-5 sm:mb-6 font-semibold leading-tight break-words">
          {headline}
        </h1>
        <p className="text-body sm:text-body-lg text-white mb-7 sm:mb-8 max-w-2xl mx-auto">
          {subheadline}
        </p>
        {(primaryCTA || secondaryCTA) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCTA && (
              <Button
                as={Link}
                to={primaryCTA.path}
                variant="primary"
                size="lg"
              >
                {primaryCTA.label}
              </Button>
            )}
            {secondaryCTA && (
              <Button
                as={Link}
                to={secondaryCTA.path}
                variant="secondary"
                size="lg"
                className="bg-white text-primary-500 hover:bg-neutral-100"
              >
                {secondaryCTA.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
