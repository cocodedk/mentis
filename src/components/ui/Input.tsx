import { InputHTMLAttributes, forwardRef, useId } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
  required?: boolean
}

/**
 * Input component for forms with label, error, and helper text support
 * Accessible with proper label association
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   required
 *   error={errors.email}
 *   helperText="We'll never share your email"
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
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
    const generatedId = useId()
    const sanitizeLabel = (label: string): string => {
      // Normalize: toLowerCase and Unicode NFKD to strip accents
      let normalized = label
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')

      // Replace non-alphanumeric with hyphens
      normalized = normalized.replace(/[^a-z0-9]+/g, '-')

      // Collapse consecutive hyphens
      normalized = normalized.replace(/-+/g, '-')

      // Trim leading/trailing hyphens
      normalized = normalized.replace(/^-+|-+$/g, '')

      return normalized || 'input'
    }

    const baseId = id || `input-${sanitizeLabel(label)}-${generatedId.replace(/:/g, '-')}`
    const inputId = baseId
    const errorId = error ? `${inputId}-error` : undefined
    const helperId = helperText ? `${inputId}-helper` : undefined

    return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          className="block text-body-sm font-medium text-neutral-900 mb-2"
        >
          {label}
          {required && <span className="text-primary-500 ml-1">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-4 py-3 border rounded-lg text-body text-neutral-900 placeholder-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-colors ${
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

Input.displayName = 'Input'
