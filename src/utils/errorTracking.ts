import * as Sentry from '@sentry/react'
import type { ErrorInfo } from 'react'

let isInitialized = false

/**
 * Initialize Sentry error tracking
 * Should be called once during app bootstrap
 */
export function initErrorTracking(): void {
  const dsn = import.meta.env.VITE_SENTRY_DSN

  // Gracefully no-op if DSN is not provided (e.g., in local development)
  if (!dsn) {
    if (import.meta.env.DEV) {
      console.warn(
        'Sentry DSN not configured. Error tracking will be disabled.'
      )
    }
    return
  }

  try {
    Sentry.init({
      dsn,
      environment: import.meta.env.MODE || 'development',
      // Only send errors in production, or if explicitly enabled in dev
      enabled: import.meta.env.PROD || import.meta.env.VITE_SENTRY_ENABLED === 'true',
      // Sample rate: 1.0 = 100% of errors in production, 0.1 = 10% in development
      tracesSampleRate: import.meta.env.PROD ? 1.0 : 0.1,
    })

    isInitialized = true
  } catch (error) {
    // Prevent Sentry initialization failures from breaking the app
    console.error('Failed to initialize Sentry:', error)
  }
}

/**
 * Safely capture an error to Sentry
 * No-ops if Sentry is not initialized
 */
export function captureError(error: Error, errorInfo?: ErrorInfo): void {
  // Only send to Sentry if initialized
  if (!isInitialized) {
    return
  }

  try {
    Sentry.captureException(error, {
      extra: {
        componentStack: errorInfo?.componentStack,
        errorBoundary: true,
      },
      tags: {
        errorBoundary: true,
      },
    })
  } catch (trackingError) {
    // Prevent tracking failures from breaking the app
    console.error('Failed to capture error to Sentry:', trackingError)
  }
}
