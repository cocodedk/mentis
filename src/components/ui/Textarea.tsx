import { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  helperText?: string
  required?: boolean
}

/**
 * Textarea component for forms with label, error, and helper text support
 * Accessible with proper label association
 *
 * @example
 * ```tsx
 * <Textarea
 *   label="Message"
 *   required
 *   error={errors.message}
 *   rows={4}
 * />
 * ```
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      id,
      className = '',
      ...props
    },
    ref
  ) => {
    const textareaId =
      id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`
    const errorId = error ? `${textareaId}-error` : undefined
    const helperId = helperText ? `${textareaId}-helper` : undefined

    return (
      <div className="w-full">
        <label
          htmlFor={textareaId}
          className="block text-body-sm font-medium text-neutral-900 mb-2"
        >
          {label}
          {required && <span className="text-primary-500 ml-1">*</span>}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          className={`w-full px-4 py-3 border rounded-lg text-body text-neutral-900 placeholder-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-colors resize-y ${
            error
              ? 'border-red-500 focus-visible:outline-red-500'
              : 'border-neutral-300 focus-visible:border-primary-500'
          } ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : helperId}
          aria-required={required}
          {...props}
        />
        {error && (
          <p
            id={errorId}
            className="mt-2 text-body-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-2 text-body-sm text-neutral-600">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
