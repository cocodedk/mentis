import { useState } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
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
  ...props
}: LazyImageProps) {
  const [ref, isIntersecting] = useIntersectionObserver({ triggerOnce: true })
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`relative ${className}`}>
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
            className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            loading="lazy"
            {...props}
          />
        </>
      )}
    </div>
  )
}
