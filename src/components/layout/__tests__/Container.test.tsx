import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import { Container } from '../Container'

describe('Container', () => {
  it('renders children', () => {
    render(
      <Container>
        <div>Test content</div>
      </Container>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies container styles', () => {
    render(
      <Container>
        <div>Content</div>
      </Container>
    )
    const container = screen.getByText('Content').parentElement
    expect(container?.className).toContain('container')
  })

  it('applies custom className', () => {
    render(
      <Container className="custom-class">
        <div>Content</div>
      </Container>
    )
    const container = screen.getByText('Content').parentElement
    expect(container?.className).toContain('custom-class')
  })
})
