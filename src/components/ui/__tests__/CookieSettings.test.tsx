import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import { CookieSettings } from '../CookieSettings'

describe('CookieSettings', () => {
  it('renders when open', () => {
    render(
      <CookieSettings
        isOpen={true}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />
    )
    expect(screen.getByText(/cookie-indstillinger/i)).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(
      <CookieSettings
        isOpen={false}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />
    )
    expect(screen.queryByText(/cookie-indstillinger/i)).not.toBeInTheDocument()
  })

  it('renders all cookie categories', () => {
    render(
      <CookieSettings
        isOpen={true}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />
    )

    expect(
      screen.getByRole('heading', { name: /nødvendige cookies/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /funktionelle cookies/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /statistiske cookies/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /marketing cookies/i })
    ).toBeInTheDocument()
  })

  it('disables necessary cookies checkbox', () => {
    render(
      <CookieSettings
        isOpen={true}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />
    )

    const necessaryCheckbox = screen.getByLabelText(/nødvendige cookies/i)
    expect(necessaryCheckbox).toBeDisabled()
  })

  it('allows toggling other cookie categories', async () => {
    render(
      <CookieSettings
        isOpen={true}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />
    )

    const functionalCheckbox = screen.getByLabelText(/funktionelle cookies/i)
    expect(functionalCheckbox).not.toBeChecked()

    await userEvent.click(functionalCheckbox)
    expect(functionalCheckbox).toBeChecked()
  })

  it('calls onSave with preferences when save is clicked', async () => {
    const handleSave = vi.fn()
    render(
      <CookieSettings
        isOpen={true}
        onClose={vi.fn()}
        onSave={handleSave}
      />
    )

    const saveButton = screen.getByRole('button', { name: /gem indstillinger/i })
    await userEvent.click(saveButton)

    expect(handleSave).toHaveBeenCalled()
    const savedPreferences = handleSave.mock.calls[0][0]
    expect(savedPreferences).toHaveProperty('necessary', true)
  })

  it('calls onClose when cancel is clicked', async () => {
    const handleClose = vi.fn()
    render(
      <CookieSettings
        isOpen={true}
        onClose={handleClose}
        onSave={vi.fn()}
      />
    )

    const cancelButton = screen.getByRole('button', { name: /annuller/i })
    await userEvent.click(cancelButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
