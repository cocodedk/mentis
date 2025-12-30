import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import { Grid } from '../Grid'

describe('Grid', () => {
  it('renders children', () => {
    render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('applies grid layout', () => {
    render(
      <Grid>
        <div>Content</div>
      </Grid>
    )
    const grid = screen.getByText('Content').parentElement
    expect(grid?.className).toContain('grid')
  })

  it('applies default columns', () => {
    render(
      <Grid>
        <div>Content</div>
      </Grid>
    )
    const grid = screen.getByText('Content').parentElement
    expect(grid?.className).toContain('grid-cols-1')
  })

  it('applies custom columns', () => {
    render(
      <Grid gridCols={{ default: 2, md: 3 }}>
        <div>Content</div>
      </Grid>
    )
    const grid = screen.getByText('Content').parentElement
    expect(grid?.className).toContain('grid-cols-2')
    expect(grid?.className).toContain('md:grid-cols-3')
  })
})
