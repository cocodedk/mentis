import { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from './Button'
import { Container, Section } from '@/components/layout'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * React Error Boundary component
 * Catch and display errors gracefully
 * Log errors for debugging
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Section background="neutral-100" padding="lg">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-h1 text-primary-500 mb-4">
                Noget gik galt
              </h1>
              <p className="text-body-lg text-neutral-600 mb-8">
                Der opstod en fejl ved indlæsning af siden. Prøv venligst at
                opdatere siden eller kontakt os, hvis problemet fortsætter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" onClick={this.handleReset}>
                  Prøv igen
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => (window.location.href = '/')}
                >
                  Tilbage til forsiden
                </Button>
              </div>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-8 text-left">
                  <summary className="text-body-sm text-neutral-600 cursor-pointer">
                    Tekniske detaljer (kun i udvikling)
                  </summary>
                  <pre className="mt-4 p-4 bg-neutral-200 rounded text-body-sm text-neutral-900 overflow-auto">
                    {this.state.error ? this.state.error.toString() : 'Unknown error'}
                    {this.state.error?.stack ? `\n\n${this.state.error.stack}` : ''}
                  </pre>
                </details>
              )}
            </div>
          </Container>
        </Section>
      )
    }

    return this.props.children
  }
}
