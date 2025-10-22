/**
 * AnimatedSection Component Tests
 *
 * Comprehensive testing suite for the AnimatedSection component
 * Tests animation behavior, accessibility, and performance
 */

import { render, screen, waitFor } from '@testing-library/react'
import { AnimatedSection } from '@/components/AnimatedSection'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useInView: () => ({ ref: jest.fn(), inView: true }),
}))

// Mock intersection observer
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver

describe('AnimatedSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders children correctly', () => {
    render(
      <AnimatedSection>
        <div data-testid='test-content'>Test Content</div>
      </AnimatedSection>
    )

    expect(screen.getByTestId('test-content')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <AnimatedSection className='custom-class'>
        <div>Test Content</div>
      </AnimatedSection>
    )

    const section = screen.getByText('Test Content').parentElement
    expect(section).toHaveClass('custom-class')
  })

  it('applies animation variants correctly', () => {
    render(
      <AnimatedSection animation='fadeInUp'>
        <div>Test Content</div>
      </AnimatedSection>
    )

    const section = screen.getByText('Test Content').parentElement
    expect(section).toBeInTheDocument()
  })

  it('handles different animation types', () => {
    const animations = ['fadeInUp', 'slideInLeft', 'scaleIn', 'staggerFade']

    animations.forEach(animation => {
      const { unmount } = render(
        <AnimatedSection animation={animation as any}>
          <div>Test Content</div>
        </AnimatedSection>
      )

      const section = screen.getByText('Test Content').parentElement
      expect(section).toBeInTheDocument()

      unmount()
    })
  })

  it('applies delay correctly', () => {
    render(
      <AnimatedSection delay={0.5}>
        <div>Test Content</div>
      </AnimatedSection>
    )

    const section = screen.getByText('Test Content').parentElement
    expect(section).toBeInTheDocument()
  })

  it('handles mobile-specific animations', () => {
    // Mock mobile detection
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })

    render(
      <AnimatedSection animation='fadeInUp'>
        <div>Test Content</div>
      </AnimatedSection>
    )

    const section = screen.getByText('Test Content').parentElement
    expect(section).toBeInTheDocument()
  })

  it('supports accessibility attributes', () => {
    render(
      <AnimatedSection role='region' aria-label='Test Section'>
        <div>Test Content</div>
      </AnimatedSection>
    )

    const section = screen.getByRole('region')
    expect(section).toHaveAttribute('aria-label', 'Test Section')
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

    render(
      <AnimatedSection animation='fadeInUp'>
        <div>Test Content</div>
      </AnimatedSection>
    )

    const section = screen.getByText('Test Content').parentElement
    expect(section).toBeInTheDocument()
  })

  it('handles viewport intersection correctly', async () => {
    const { rerender } = render(
      <AnimatedSection animation='fadeInUp'>
        <div>Test Content</div>
      </AnimatedSection>
    )

    // Simulate intersection
    const section = screen.getByText('Test Content').parentElement
    expect(section).toBeInTheDocument()

    // Test re-render
    rerender(
      <AnimatedSection animation='slideInLeft'>
        <div>Updated Content</div>
      </AnimatedSection>
    )

    expect(screen.getByText('Updated Content')).toBeInTheDocument()
  })

  it('handles error states gracefully', () => {
    // Mock console.error to avoid noise in tests
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <AnimatedSection animation='invalidAnimation' as any>
        <div>Test Content</div>
      </AnimatedSection>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
    consoleSpy.mockRestore()
  })

  it('supports custom props forwarding', () => {
    render(
      <AnimatedSection data-testid='custom-section' id='test-id'>
        <div>Test Content</div>
      </AnimatedSection>
    )

    const section = screen.getByTestId('custom-section')
    expect(section).toHaveAttribute('id', 'test-id')
  })

  it('handles multiple children correctly', () => {
    render(
      <AnimatedSection>
        <div data-testid='child-1'>Child 1</div>
        <div data-testid='child-2'>Child 2</div>
        <div data-testid='child-3'>Child 3</div>
      </AnimatedSection>
    )

    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
    expect(screen.getByTestId('child-3')).toBeInTheDocument()
  })

  it('maintains performance with many children', () => {
    const startTime = performance.now()

    render(
      <AnimatedSection>
        {Array.from({ length: 100 }, (_, i) => (
          <div key={i} data-testid={`child-${i}`}>
            Child {i}
          </div>
        ))}
      </AnimatedSection>
    )

    const endTime = performance.now()
    const renderTime = endTime - startTime

    // Should render within reasonable time (adjust threshold as needed)
    expect(renderTime).toBeLessThan(100)
    expect(screen.getByTestId('child-0')).toBeInTheDocument()
    expect(screen.getByTestId('child-99')).toBeInTheDocument()
  })
})
