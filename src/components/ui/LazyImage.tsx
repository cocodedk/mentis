import { useState } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface LazyImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'className'> {
  src: string
  alt: string
  className?: string // For backward compatibility
  wrapperClassName?: string
  imgClassName?: string
}

/**
 * Lazy loading image component
 * Placeholder/skeleton while loading
 * Intersection Observer API
 */
export function LazyImage({
  src,
  alt,
  className = '',
  wrapperClassName,
  imgClassName,
  ...props
}: LazyImageProps) {
  const [ref, isIntersecting] = useIntersectionObserver({ triggerOnce: true })
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Compute wrapper className with fallback to className for backward compatibility
  const finalWrapperClassName = wrapperClassName ?? className ?? ''

  // Compute img className with fallback to className for backward compatibility
  const finalImgClassName = imgClassName ?? className ?? ''
  const imgClasses = `${finalImgClassName} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`relative ${finalWrapperClassName}`}>
      {!isIntersecting ? (
        <div
          className="bg-neutral-200 animate-pulse w-full h-full"
          aria-label="Loading image"
          role="img"
          aria-busy="true"
        />
      ) : (
        <>
          {!isLoaded && !hasError && (
            <div
              className="bg-neutral-200 animate-pulse w-full h-full absolute inset-0"
              aria-label="Loading image"
              role="img"
              aria-busy="true"
            />
          )}
          <img
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={imgClasses}
            loading="lazy"
            {...props}
          />
        </>
      )}
    </div>
  )
}
