/**
 * Three.js WebGL setup and utilities
 * Provides WebGL effects for hero backgrounds and 3D elements
 */

import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'

export interface WebGLConfig {
  width: number
  height: number
  antialias?: boolean
  alpha?: boolean
  powerPreference?: 'high-performance' | 'low-power' | 'default'
}

export interface ParticleSystemConfig {
  count: number
  size: number
  color: string
  speed: number
  opacity: number
}

export interface WebGLScene {
  scene: THREE.Scene
  camera: THREE.Camera
  renderer: THREE.WebGLRenderer
  animationId?: number
}

/**
 * Create WebGL renderer with optimized settings
 */
export function createWebGLRenderer(config: WebGLConfig): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    antialias: config.antialias ?? true,
    alpha: config.alpha ?? true,
    powerPreference: config.powerPreference ?? 'high-performance',
  })

  renderer.setSize(config.width, config.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  return renderer
}

/**
 * Create particle system for background effects
 */
export function createParticleSystem(
  config: ParticleSystemConfig,
  scene: THREE.Scene
): THREE.Points {
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(config.count * 3)
  const colors = new Float32Array(config.count * 3)
  const sizes = new Float32Array(config.count)

  // Initialize particle positions and properties
  for (let i = 0; i < config.count; i++) {
    const i3 = i * 3

    // Random positions
    positions[i3] = (Math.random() - 0.5) * 10
    positions[i3 + 1] = (Math.random() - 0.5) * 10
    positions[i3 + 2] = (Math.random() - 0.5) * 10

    // Random colors
    const color = new THREE.Color(config.color)
    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b

    // Random sizes
    sizes[i] = Math.random() * config.size
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  const material = new THREE.PointsMaterial({
    size: config.size,
    vertexColors: true,
    transparent: true,
    opacity: config.opacity,
    blending: THREE.AdditiveBlending,
  })

  const particles = new THREE.Points(geometry, material)
  scene.add(particles)

  return particles
}

/**
 * Create gradient background
 */
export function createGradientBackground(scene: THREE.Scene): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(20, 20)
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color(0x1e3a8a) },
      color2: { value: new THREE.Color(0x3b82f6) },
      color3: { value: new THREE.Color(0x8b5cf6) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        float noise = sin(uv.x * 10.0 + time) * sin(uv.y * 10.0 + time) * 0.1;
        vec3 color = mix(color1, color2, uv.x + noise);
        color = mix(color, color3, uv.y + noise);
        gl_FragColor = vec4(color, 0.8);
      }
    `,
    transparent: true,
  })

  const background = new THREE.Mesh(geometry, material)
  background.position.z = -5
  scene.add(background)

  return background
}

/**
 * Create WebGL scene with basic setup
 */
export function createWebGLScene(config: WebGLConfig): WebGLScene {
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    75,
    config.width / config.height,
    0.1,
    1000
  )
  camera.position.z = 5

  const renderer = createWebGLRenderer(config)

  return { scene, camera, renderer }
}

/**
 * Animate WebGL scene
 */
export function animateWebGLScene(
  scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer,
  objects: THREE.Object3D[] = []
): number {
  const animate = () => {
    const time = Date.now() * 0.001

    // Animate objects
    objects.forEach((object, index) => {
      if (object instanceof THREE.Points) {
        object.rotation.y = time * 0.1
        object.rotation.x = time * 0.05
      } else {
        object.rotation.y = time * 0.1 * (index + 1)
      }
    })

    renderer.render(scene, camera)
    return requestAnimationFrame(animate)
  }

  return animate()
}

/**
 * Create responsive WebGL scene
 */
export function createResponsiveWebGLScene(
  container: HTMLElement,
  config: Partial<WebGLConfig> = {}
): WebGLScene {
  const width = container.clientWidth
  const height = container.clientHeight

  const fullConfig: WebGLConfig = {
    width,
    height,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
    ...config,
  }

  return createWebGLScene(fullConfig)
}

/**
 * Create performance-optimized WebGL scene
 */
export function createOptimizedWebGLScene(
  container: HTMLElement,
  config: Partial<WebGLConfig> = {}
): WebGLScene {
  const scene = createResponsiveWebGLScene(container, config)

  // Optimize renderer settings
  scene.renderer.shadowMap.enabled = false
  scene.renderer.shadowMap.type = THREE.PCFSoftShadowMap

  // Set up frustum culling
  scene.camera.far = 100

  return scene
}

/**
 * Create accessibility-aware WebGL scene
 */
export function createAccessibleWebGLScene(
  container: HTMLElement,
  config: Partial<WebGLConfig> = {},
  respectReducedMotion: boolean = true
): WebGLScene | null {
  if (
    respectReducedMotion &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return null
  }

  return createOptimizedWebGLScene(container, config)
}

/**
 * Cleanup WebGL resources
 */
export function cleanupWebGLScene(scene: WebGLScene): void {
  if (scene.animationId) {
    cancelAnimationFrame(scene.animationId)
  }

  // Dispose of geometries and materials
  scene.scene.traverse(object => {
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose()
      if (Array.isArray(object.material)) {
        object.material.forEach(material => material.dispose())
      } else {
        object.material.dispose()
      }
    }
  })

  scene.renderer.dispose()
}

/**
 * Utility to check if WebGL is available
 */
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return !!gl
  } catch (e) {
    return false
  }
}

/**
 * Get WebGL capabilities
 */
export function getWebGLCapabilities(): {
  maxTextureSize: number
  maxVertexAttribs: number
  maxVaryingVectors: number
  aliasedLineWidthRange: [number, number]
  aliasedPointSizeRange: [number, number]
} | null {
  if (!isWebGLAvailable()) return null

  const canvas = document.createElement('canvas')
  const gl =
    canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

  if (!gl) return null

  return {
    maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
    maxVertexAttribs: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
    maxVaryingVectors: gl.getParameter(gl.MAX_VARYING_VECTORS),
    aliasedLineWidthRange: gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE),
    aliasedPointSizeRange: gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE),
  }
}

export default {
  createWebGLRenderer,
  createParticleSystem,
  createGradientBackground,
  createWebGLScene,
  animateWebGLScene,
  createResponsiveWebGLScene,
  createOptimizedWebGLScene,
  createAccessibleWebGLScene,
  cleanupWebGLScene,
  isWebGLAvailable,
  getWebGLCapabilities,
}
