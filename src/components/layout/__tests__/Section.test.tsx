import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import { Section } from '../Section'

describe('Section', () => {
  it('renders children', () => {
    render(
      <Section>
        <div>Test content</div>
      </Section>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies default background', () => {
    render(
      <Section>
        <div>Content</div>
      </Section>
    )
    const section = screen.getByText('Content').parentElement
    expect(section?.className).toContain('bg-neutral-100')
  })

  it('applies custom background', () => {
    render(
      <Section background="white">
        <div>Content</div>
      </Section>
    )
    const section = screen.getByText('Content').parentElement
    expect(section?.className).toContain('bg-white')
  })

  it('applies custom padding', () => {
    render(
      <Section padding="lg">
        <div>Content</div>
      </Section>
    )
    const section = screen.getByText('Content').parentElement
    expect(section?.className).toContain('py-16')
  })
})
