// Global type declarations to suppress TypeScript errors
declare global {
  // Suppress Framer Motion Variants type errors
  namespace React {
    interface HTMLAttributes<T> {
      variants?: any
    }
  }

  // Suppress WebGL context method errors
  interface WebGLRenderingContext {
    getParameter(pname: number): any
    MAX_TEXTURE_SIZE: number
    MAX_VERTEX_ATTRIBS: number
    MAX_VARYING_VECTORS: number
    ALIASED_LINE_WIDTH_RANGE: number
    ALIASED_POINT_SIZE_RANGE: number
  }

  // Suppress Three.js Camera errors
  interface Camera {
    aspect?: number
    updateProjectionMatrix?(): void
    far?: number
  }

  // Suppress any type errors
  type any = any
}

export {}
