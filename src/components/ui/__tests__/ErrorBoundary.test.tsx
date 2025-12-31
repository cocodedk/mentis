import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { render, screen, waitFor } from '@/test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import { ErrorBoundary } from '../ErrorBoundary'

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}


describe('ErrorBoundary', () => {
  // Suppress console.error for error boundary tests
  const originalError = console.error
  beforeAll(() => {
    console.error = vi.fn()
  })

  afterAll(() => {
    console.error = originalError
  })

  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )
    expect(screen.getByText('No error')).toBeInTheDocument()
  })

  it('renders error UI when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText(/noget gik galt/i)).toBeInTheDocument()
  })

  it('shows reset button', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByRole('button', { name: /prøv igen/i })).toBeInTheDocument()
  })

  it('shows home button', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByRole('button', { name: /tilbage til forsiden/i })).toBeInTheDocument()
  })

  it('resets error boundary and re-renders children when reset button is clicked', async () => {
    const user = userEvent.setup()

    // Use a ref-like variable that the component reads at render time
    // This allows us to change the throw behavior BEFORE the reset triggers a re-render
    let shouldThrowOnRender = true

    const DynamicThrowError = () => {
      if (shouldThrowOnRender) {
        throw new Error('Test error')
      }
      return <div>No error</div>
    }

    render(
      <ErrorBoundary>
        <DynamicThrowError />
      </ErrorBoundary>
    )

    // Verify error UI is shown
    expect(screen.getByText(/noget gik galt/i)).toBeInTheDocument()
    const resetButton = screen.getByRole('button', { name: /prøv igen/i })

    // Change the throw behavior BEFORE clicking reset
    // When reset is clicked, ErrorBoundary sets hasError=false and tries to render children
    // DynamicThrowError will now read shouldThrowOnRender=false and not throw
    shouldThrowOnRender = false

    // Click reset button - this calls handleReset which sets hasError: false
    // ErrorBoundary will re-render children, and now DynamicThrowError won't throw
    await user.click(resetButton)

    // Wait for and verify children are rendered and error UI is gone
    await waitFor(() => {
      expect(screen.getByText('No error')).toBeInTheDocument()
    })
    expect(screen.queryByText(/noget gik galt/i)).not.toBeInTheDocument()
  })
})
