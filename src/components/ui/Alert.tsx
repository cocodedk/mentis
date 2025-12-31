import type { ReactNode } from 'react'
import type { AlertVariant } from '@/types/components'
import { InfoIcon, WarningIcon } from '@/components/icons'

interface AlertProps {
  variant?: AlertVariant
  title?: string
  children: ReactNode
  onClose?: () => void
}

/**
 * Alert component for displaying informational or warning messages
 * Accessible with appropriate ARIA roles
 *
 * @example
 * ```tsx
 * <Alert variant="info" title="Information">
 *   This is an informational message.
 * </Alert>
 * ```
 */
export function Alert({
  variant = 'info',
  title,
  children,
  onClose,
}: AlertProps) {
  const variantStyles = {
    info: 'bg-neutral-200 border-l-4 border-primary-500',
    warning: 'bg-yellow-50 border-l-4 border-yellow-500',
  }

  const iconColors = {
    info: 'text-primary-500',
    warning: 'text-yellow-600',
  }

  const role = variant === 'warning' ? 'alert' : 'status'

  return (
    <div
      className={`${variantStyles[variant]} p-4 rounded-r-lg`}
      role={role}
      aria-live={variant === 'warning' ? 'assertive' : 'polite'}
    >
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${iconColors[variant]}`}>
          {variant === 'info' ? (
            <InfoIcon className="w-5 h-5" aria-hidden="true" />
          ) : (
            <WarningIcon className="w-5 h-5" aria-hidden="true" />
          )}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-h3 font-medium text-neutral-900 mb-1">
              {title}
            </h3>
          )}
          <div className="text-body text-neutral-600">{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 flex-shrink-0 text-neutral-400 hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            aria-label="Close alert"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
