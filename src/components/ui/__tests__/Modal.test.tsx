import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import { Modal } from '../Modal'

describe('Modal', () => {
  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Test Modal">
        Content
      </Modal>
    )
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()
  })

  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
        Content
      </Modal>
    )
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders title', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test Title">
        Content
      </Modal>
    )
    expect(screen.getByRole('heading', { name: 'Test Title' })).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        Content
      </Modal>
    )

    const closeButton = screen.getByRole('button', { name: /close/i })
    await userEvent.click(closeButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when ESC key is pressed', async () => {
    const handleClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        Content
      </Modal>
    )

    await userEvent.keyboard('{Escape}')

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when backdrop is clicked', async () => {
    const handleClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        Content
      </Modal>
    )

    // Find backdrop (the element with aria-hidden="true")
    const backdrop = document.querySelector('[aria-hidden="true"]')
    expect(backdrop).toBeInTheDocument()

    await userEvent.click(backdrop as Element)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('has correct ARIA attributes', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
        Content
      </Modal>
    )

    const modal = screen.getByRole('dialog')
    expect(modal).toHaveAttribute('aria-modal', 'true')
    expect(modal).toHaveAttribute('aria-labelledby')
  })

  it('applies correct size attribute', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test" size="sm">
        Content
      </Modal>
    )

    expect(screen.getByRole('dialog')).toHaveAttribute('data-size', 'sm')

    rerender(
      <Modal isOpen={true} onClose={vi.fn()} title="Test" size="lg">
        Content
      </Modal>
    )

    expect(screen.getByRole('dialog')).toHaveAttribute('data-size', 'lg')
  })
})
