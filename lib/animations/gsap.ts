/**
 * GSAP integration utilities for advanced timeline control
 * Provides seamless integration between GSAP and Framer Motion
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionValue } from 'framer-motion'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

export interface GSAPConfig {
  duration: number
  ease: string
  delay?: number
  stagger?: number
  onComplete?: () => void
  onStart?: () => void
}

export interface GSAPTimelineConfig extends GSAPConfig {
  paused?: boolean
  repeat?: number
  yoyo?: boolean
}

/**
 * Create a GSAP timeline with advanced control
 */
export function createGSAPTimeline(config: GSAPTimelineConfig = {}) {
  const timeline = gsap.timeline({
    paused: config.paused || false,
    repeat: config.repeat || 0,
    yoyo: config.yoyo || false,
    onComplete: config.onComplete,
    onStart: config.onStart,
  })

  return timeline
}

/**
 * Animate elements with GSAP
 */
export function animateWithGSAP(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars,
  config?: GSAPConfig
) {
  const tween = gsap.to(targets, {
    duration: config?.duration || 0.5,
    ease: config?.ease || 'power2.out',
    delay: config?.delay || 0,
    stagger: config?.stagger || 0,
    onComplete: config?.onComplete,
    onStart: config?.onStart,
    ...vars,
  })

  return tween
}

/**
 * Create scroll-triggered animations
 */
export function createScrollTrigger(
  trigger: string,
  animation: gsap.TweenVars,
  config: {
    start?: string
    end?: string
    scrub?: boolean | number
    pin?: boolean
    markers?: boolean
  } = {}
) {
  return gsap.to(trigger, {
    ...animation,
    scrollTrigger: {
      trigger,
      start: config.start || 'top 80%',
      end: config.end || 'bottom 20%',
      scrub: config.scrub || false,
      pin: config.pin || false,
      markers: config.markers || false,
    },
  })
}

/**
 * Convert Framer Motion value to GSAP value
 */
export function motionValueToGSAP(motionValue: MotionValue) {
  return motionValue.get()
}

/**
 * Sync GSAP animation with Framer Motion
 */
export function syncWithFramerMotion(
  gsapTween: gsap.core.Tween,
  motionValue: MotionValue
) {
  gsapTween.eventCallback('onUpdate', () => {
    motionValue.set(gsapTween.progress())
  })
}

/**
 * Create complex sequence animations
 */
export function createSequence(
  elements: Array<{
    selector: string
    animation: gsap.TweenVars
    delay?: number
  }>
) {
  const timeline = createGSAPTimeline()

  elements.forEach(({ selector, animation, delay = 0 }) => {
    timeline.to(selector, {
      ...animation,
      delay,
    })
  })

  return timeline
}

/**
 * Performance-optimized animation with cleanup
 */
export function createOptimizedAnimation(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars,
  config?: GSAPConfig
) {
  const tween = animateWithGSAP(targets, vars, config)

  // Add cleanup function
  const cleanup = () => {
    tween.kill()
  }

  return { tween, cleanup }
}

/**
 * Create responsive animations that adapt to screen size
 */
export function createResponsiveAnimation(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars,
  breakpoints: {
    mobile?: gsap.TweenVars
    tablet?: gsap.TweenVars
    desktop?: gsap.TweenVars
  }
) {
  const getBreakpointVars = () => {
    if (typeof window === 'undefined') return vars

    const width = window.innerWidth
    if (width < 768 && breakpoints.mobile) return breakpoints.mobile
    if (width < 1024 && breakpoints.tablet) return breakpoints.tablet
    if (breakpoints.desktop) return breakpoints.desktop
    return vars
  }

  return animateWithGSAP(targets, getBreakpointVars())
}

/**
 * Create accessibility-aware animations
 */
export function createAccessibleAnimation(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars,
  config?: GSAPConfig & {
    respectReducedMotion?: boolean
  }
) {
  const shouldRespectReducedMotion = config?.respectReducedMotion ?? true

  if (
    shouldRespectReducedMotion &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    // Return a minimal animation for reduced motion
    return animateWithGSAP(targets, {
      ...vars,
      duration: 0.1,
      ease: 'none',
    })
  }

  return animateWithGSAP(targets, vars, config)
}

/**
 * Utility to check if GSAP is available
 */
export function isGSAPAvailable(): boolean {
  return typeof gsap !== 'undefined'
}

/**
 * Cleanup all GSAP animations
 */
export function cleanupGSAPAnimations() {
  gsap.killTweensOf('*')
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}

export default {
  createGSAPTimeline,
  animateWithGSAP,
  createScrollTrigger,
  motionValueToGSAP,
  syncWithFramerMotion,
  createSequence,
  createOptimizedAnimation,
  createResponsiveAnimation,
  createAccessibleAnimation,
  isGSAPAvailable,
  cleanupGSAPAnimations,
}
