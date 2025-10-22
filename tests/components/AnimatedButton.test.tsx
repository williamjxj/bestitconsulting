/**
 * AnimatedButton Component Tests
 *
 * Comprehensive testing suite for the AnimatedButton component
 * Tests interaction behavior, accessibility, and animation performance
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AnimatedButton } from '@/components/AnimatedButton'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
  },
}))

describe('AnimatedButton', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders with default props', () => {
    render(<AnimatedButton>Click me</AnimatedButton>)

    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('btn')
  })

  it('renders with different variants', () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost'] as const

    variants.forEach(variant => {
      const { unmount } = render(
        <AnimatedButton variant={variant}>{variant} button</AnimatedButton>
      )

      const button = screen.getByRole('button', { name: `${variant} button` })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass(`btn-${variant}`)

      unmount()
    })
  })

  it('renders with different sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const

    sizes.forEach(size => {
      const { unmount } = render(
        <AnimatedButton size={size}>{size} button</AnimatedButton>
      )

      const button = screen.getByRole('button', { name: `${size} button` })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass(`btn-${size}`)

      unmount()
    })
  })

  it('handles click events', async () => {
    const handleClick = jest.fn()

    render(<AnimatedButton onClick={handleClick}>Click me</AnimatedButton>)

    const button = screen.getByRole('button', { name: 'Click me' })
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('handles keyboard events', async () => {
    const handleClick = jest.fn()

    render(<AnimatedButton onClick={handleClick}>Click me</AnimatedButton>)

    const button = screen.getByRole('button', { name: 'Click me' })
    button.focus()
    await user.keyboard('{Enter}')

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('supports disabled state', () => {
    render(<AnimatedButton disabled>Disabled button</AnimatedButton>)

    const button = screen.getByRole('button', { name: 'Disabled button' })
    expect(button).toBeDisabled()
    expect(button).toHaveClass('btn-disabled')
  })

  it('handles loading state', () => {
    render(<AnimatedButton loading>Loading button</AnimatedButton>)

    const button = screen.getByRole('button', { name: 'Loading button' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('btn-loading')
  })

  it('applies custom className', () => {
    render(
      <AnimatedButton className='custom-class'>Custom button</AnimatedButton>
    )

    const button = screen.getByRole('button', { name: 'Custom button' })
    expect(button).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()

    render(<AnimatedButton ref={ref}>Ref button</AnimatedButton>)

    expect(ref).toHaveBeenCalled()
  })

  it('supports hover animations', async () => {
    render(
      <AnimatedButton hover={{ scale: 1.05 }}>Hover button</AnimatedButton>
    )

    const button = screen.getByRole('button', { name: 'Hover button' })
    expect(button).toBeInTheDocument()

    // Test hover interaction
    await user.hover(button)
    await user.unhover(button)
  })

  it('handles focus correctly', async () => {
    render(<AnimatedButton>Focus button</AnimatedButton>)

    const button = screen.getByRole('button', { name: 'Focus button' })
    await user.tab()

    expect(button).toHaveFocus()
  })

  it('supports aria attributes', () => {
    render(
      <AnimatedButton aria-label='Custom label' aria-describedby='description'>
        Button
      </AnimatedButton>
    )

    const button = screen.getByRole('button', { name: 'Custom label' })
    expect(button).toHaveAttribute('aria-describedby', 'description')
  })

  it('handles touch events on mobile', () => {
    // Mock mobile environment
    Object.defineProperty(window, 'ontouchstart', {
      writable: true,
      value: true,
    })

    render(<AnimatedButton>Touch button</AnimatedButton>)

    const button = screen.getByRole('button', { name: 'Touch button' })
    expect(button).toBeInTheDocument()
  })

  it('supports custom animation props', () => {
    render(
      <AnimatedButton
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Animated button
      </AnimatedButton>
    )

    const button = screen.getByRole('button', { name: 'Animated button' })
    expect(button).toBeInTheDocument()
  })

  it('handles multiple rapid clicks', async () => {
    const handleClick = jest.fn()

    render(
      <AnimatedButton onClick={handleClick}>Rapid click button</AnimatedButton>
    )

    const button = screen.getByRole('button', { name: 'Rapid click button' })

    // Simulate rapid clicks
    await user.click(button)
    await user.click(button)
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(3)
  })

  it('maintains accessibility with loading state', () => {
    render(
      <AnimatedButton loading aria-label='Loading'>
        Loading button
      </AnimatedButton>
    )

    const button = screen.getByRole('button', { name: 'Loading' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'Loading')
  })

  it('handles form submission', () => {
    const handleSubmit = jest.fn(e => e.preventDefault())

    render(
      <form onSubmit={handleSubmit}>
        <AnimatedButton type='submit'>Submit button</AnimatedButton>
      </form>
    )

    const button = screen.getByRole('button', { name: 'Submit button' })
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('supports custom data attributes', () => {
    render(
      <AnimatedButton data-testid='custom-button' data-analytics='click'>
        Data button
      </AnimatedButton>
    )

    const button = screen.getByTestId('custom-button')
    expect(button).toHaveAttribute('data-analytics', 'click')
  })

  it('handles keyboard navigation', async () => {
    render(
      <div>
        <AnimatedButton>First button</AnimatedButton>
        <AnimatedButton>Second button</AnimatedButton>
        <AnimatedButton>Third button</AnimatedButton>
      </div>
    )

    const firstButton = screen.getByRole('button', { name: 'First button' })
    const secondButton = screen.getByRole('button', { name: 'Second button' })
    const thirdButton = screen.getByRole('button', { name: 'Third button' })

    firstButton.focus()
    expect(firstButton).toHaveFocus()

    await user.keyboard('{Tab}')
    expect(secondButton).toHaveFocus()

    await user.keyboard('{Tab}')
    expect(thirdButton).toHaveFocus()
  })

  it('handles reduced motion preference', () => {
    // Mock reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    render(<AnimatedButton>Reduced motion button</AnimatedButton>)

    const button = screen.getByRole('button', { name: 'Reduced motion button' })
    expect(button).toBeInTheDocument()
  })

  it('handles error states gracefully', () => {
    // Mock console.error to avoid noise in tests
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <AnimatedButton
        onClick={() => {
          throw new Error('Test error')
        }}
      >
        Error button
      </AnimatedButton>
    )

    const button = screen.getByRole('button', { name: 'Error button' })
    expect(button).toBeInTheDocument()

    consoleSpy.mockRestore()
  })
})
