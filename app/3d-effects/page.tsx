'use client'

import { useState, useEffect, useRef } from 'react'
import Layout from '@/components/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  Eye,
  EyeOff,
  Zap,
  Cpu,
  Monitor,
} from 'lucide-react'
import {
  createWebGLScene,
  createParticleSystem,
  createGradientBackground,
  animateWebGLScene,
  cleanupWebGLScene,
  isWebGLAvailable,
  getWebGLCapabilities,
} from '@/lib/animations/webgl'

interface DemoConfig {
  particleCount: number
  particleSize: number
  particleSpeed: number
  particleColor: string
  backgroundEnabled: boolean
  animationSpeed: number
}

export default function ThreeEffectsPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [webglAvailable, setWebglAvailable] = useState(false)
  const [capabilities, setCapabilities] = useState<any>(null)
  const [scene, setScene] = useState<any>(null)
  const [animationId, setAnimationId] = useState<number | null>(null)
  const [activeDemo, setActiveDemo] = useState<string>('particles')

  const [config, setConfig] = useState<DemoConfig>({
    particleCount: 1000,
    particleSize: 2,
    particleSpeed: 1,
    particleColor: '#3b82f6',
    backgroundEnabled: true,
    animationSpeed: 1,
  })

  // Check WebGL availability on mount
  useEffect(() => {
    const available = isWebGLAvailable()
    setWebglAvailable(available)

    if (available) {
      const caps = getWebGLCapabilities()
      setCapabilities(caps)
    }
  }, [])

  // Initialize WebGL scene
  const initializeScene = () => {
    if (!canvasRef.current || !webglAvailable) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()

    const webglScene = createWebGLScene({
      width: rect.width,
      height: rect.height,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })

    // Add particle system
    const particles = createParticleSystem(webglScene.scene, {
      count: config.particleCount,
      size: config.particleSize,
      color: config.particleColor,
      speed: config.particleSpeed,
      opacity: 0.8,
    })

    // Add gradient background if enabled
    if (config.backgroundEnabled) {
      const background = createGradientBackground(webglScene.scene)
      webglScene.scene.add(background)
    }

    // Position camera
    webglScene.camera.position.z = 5

    // Attach renderer to canvas
    canvas.appendChild(webglScene.renderer.domElement)

    setScene(webglScene)
    return webglScene
  }

  // Start animation
  const startAnimation = () => {
    if (!scene) return

    const animate = () => {
      if (isAnimating) {
        animateWebGLScene(scene.scene, scene.camera, scene.renderer)
        const id = requestAnimationFrame(animate)
        setAnimationId(id)
      }
    }

    setIsAnimating(true)
    animate()
  }

  // Stop animation
  const stopAnimation = () => {
    setIsAnimating(false)
    if (animationId) {
      cancelAnimationFrame(animationId)
      setAnimationId(null)
    }
  }

  // Reset scene
  const resetScene = () => {
    stopAnimation()
    if (scene) {
      cleanupWebGLScene(scene)
      setScene(null)
    }
    // Reinitialize after a short delay
    setTimeout(() => {
      const newScene = initializeScene()
      if (newScene) {
        setScene(newScene)
      }
    }, 100)
  }

  // Handle config changes
  const updateConfig = (newConfig: Partial<DemoConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }))
    resetScene()
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAnimation()
      if (scene) {
        cleanupWebGLScene(scene)
      }
    }
  }, [scene])

  const demos = [
    {
      id: 'particles',
      name: 'Particle System',
      description: 'Animated particle effects with customizable properties',
      icon: Zap,
    },
    {
      id: 'gradient',
      name: 'Gradient Background',
      description: 'Shader-based gradient backgrounds',
      icon: Monitor,
    },
    {
      id: 'performance',
      name: 'Performance Test',
      description: 'Stress test WebGL performance capabilities',
      icon: Cpu,
    },
  ]

  if (!webglAvailable) {
    return (
      <Layout>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold text-gray-900 mb-4'>
              3D Effects Demo
            </h1>
            <p className='text-xl text-gray-600 mb-8'>
              WebGL is not supported in your browser
            </p>
            <Card className='max-w-md mx-auto'>
              <CardContent className='p-6'>
                <EyeOff className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                <h3 className='text-lg font-semibold mb-2'>
                  WebGL Not Available
                </h3>
                <p className='text-gray-600 text-sm'>
                  Your browser doesn't support WebGL, which is required for 3D
                  effects. Please try using a modern browser like Chrome,
                  Firefox, or Safari.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            3D Effects Demo
          </h1>
          <p className='text-xl text-gray-600 mb-8'>
            Interactive WebGL demonstrations using Three.js
          </p>

          {/* WebGL Capabilities */}
          {capabilities && (
            <div className='flex justify-center gap-4 mb-8'>
              <Badge variant='outline' className='flex items-center gap-2'>
                <Monitor className='w-4 h-4' />
                Max Texture: {capabilities.maxTextureSize}px
              </Badge>
              <Badge variant='outline' className='flex items-center gap-2'>
                <Cpu className='w-4 h-4' />
                WebGL {capabilities.webglVersion}
              </Badge>
            </div>
          )}
        </div>

        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Demo Selection */}
          <div className='lg:col-span-1'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Settings className='w-5 h-5' />
                  Demo Controls
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Demo Selection */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Demo Type
                  </label>
                  <div className='space-y-2'>
                    {demos.map(demo => {
                      const IconComponent = demo.icon
                      return (
                        <button
                          key={demo.id}
                          onClick={() => setActiveDemo(demo.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                            activeDemo === demo.id
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <IconComponent className='w-5 h-5' />
                          <div className='text-left'>
                            <div className='font-medium'>{demo.name}</div>
                            <div className='text-xs text-gray-500'>
                              {demo.description}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Animation Controls */}
                <div className='border-t pt-4'>
                  <div className='flex gap-2 mb-4'>
                    <Button
                      onClick={isAnimating ? stopAnimation : startAnimation}
                      className='flex-1'
                      variant={isAnimating ? 'destructive' : 'default'}
                    >
                      {isAnimating ? (
                        <>
                          <Pause className='w-4 h-4 mr-2' />
                          Stop
                        </>
                      ) : (
                        <>
                          <Play className='w-4 h-4 mr-2' />
                          Start
                        </>
                      )}
                    </Button>
                    <Button onClick={resetScene} variant='outline'>
                      <RotateCcw className='w-4 h-4' />
                    </Button>
                  </div>
                </div>

                {/* Configuration */}
                <div className='border-t pt-4 space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Particle Count: {config.particleCount}
                    </label>
                    <input
                      type='range'
                      min='100'
                      max='5000'
                      step='100'
                      value={config.particleCount}
                      onChange={e =>
                        updateConfig({
                          particleCount: parseInt(e.target.value),
                        })
                      }
                      className='w-full'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Particle Size: {config.particleSize}px
                    </label>
                    <input
                      type='range'
                      min='1'
                      max='10'
                      step='0.5'
                      value={config.particleSize}
                      onChange={e =>
                        updateConfig({
                          particleSize: parseFloat(e.target.value),
                        })
                      }
                      className='w-full'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Animation Speed: {config.animationSpeed}x
                    </label>
                    <input
                      type='range'
                      min='0.1'
                      max='3'
                      step='0.1'
                      value={config.animationSpeed}
                      onChange={e =>
                        updateConfig({
                          animationSpeed: parseFloat(e.target.value),
                        })
                      }
                      className='w-full'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Particle Color
                    </label>
                    <input
                      type='color'
                      value={config.particleColor}
                      onChange={e =>
                        updateConfig({ particleColor: e.target.value })
                      }
                      className='w-full h-10 rounded border border-gray-300'
                    />
                  </div>

                  <div className='flex items-center gap-2'>
                    <input
                      type='checkbox'
                      id='background'
                      checked={config.backgroundEnabled}
                      onChange={e =>
                        updateConfig({ backgroundEnabled: e.target.checked })
                      }
                      className='rounded'
                    />
                    <label
                      htmlFor='background'
                      className='text-sm text-gray-700'
                    >
                      Enable Gradient Background
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* WebGL Canvas */}
          <div className='lg:col-span-2'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Eye className='w-5 h-5' />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='relative bg-gray-900 rounded-lg overflow-hidden'>
                  <canvas
                    ref={canvasRef}
                    className='w-full h-96 bg-gradient-to-br from-gray-900 to-gray-800'
                    style={{ minHeight: '400px' }}
                  />
                  {!scene && (
                    <div className='absolute inset-0 flex items-center justify-center bg-gray-900/50'>
                      <Button
                        onClick={initializeScene}
                        className='flex items-center gap-2'
                      >
                        <Play className='w-4 h-4' />
                        Initialize 3D Scene
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technical Details */}
        <div className='mt-12'>
          <Card>
            <CardHeader>
              <CardTitle>Technical Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid md:grid-cols-2 gap-6'>
                <div>
                  <h4 className='font-semibold mb-2'>Three.js Features Used</h4>
                  <ul className='text-sm text-gray-600 space-y-1'>
                    <li>• WebGL Renderer with optimized settings</li>
                    <li>• BufferGeometry for efficient particle systems</li>
                    <li>• ShaderMaterial for custom gradient backgrounds</li>
                    <li>• Performance monitoring and optimization</li>
                    <li>• Responsive canvas resizing</li>
                  </ul>
                </div>
                <div>
                  <h4 className='font-semibold mb-2'>Performance Features</h4>
                  <ul className='text-sm text-gray-600 space-y-1'>
                    <li>• GPU-accelerated particle rendering</li>
                    <li>• Adaptive quality based on device capabilities</li>
                    <li>• Memory management and cleanup</li>
                    <li>• Reduced motion support</li>
                    <li>• Mobile-optimized rendering</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
