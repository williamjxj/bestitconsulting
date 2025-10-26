import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.extends('prettier'),
  {
    rules: {
      // Best practices
      'no-console': 'off', // Allow console statements
      'no-debugger': 'error',
      'no-unused-vars': 'off', // Handled by TypeScript
      '@typescript-eslint/no-unused-vars': 'off', // Disable unused vars warnings

      // React specific rules
      'react/jsx-uses-react': 'off', // Not needed in React 17+
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/prop-types': 'off', // We use TypeScript
      'react/no-unescaped-entities': 'off', // Allow quotes and apostrophes in JSX
      'react-hooks/rules-of-hooks': 'error', // Keep React hooks rules
      'react-hooks/exhaustive-deps': 'off', // Disable exhaustive deps warnings

      // TypeScript specific rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off', // Allow any type
      '@typescript-eslint/ban-ts-comment': 'off', // Allow ts-nocheck and ts-ignore
      'prefer-const': 'error', // Keep prefer-const rule

      // Next.js specific rules
      '@next/next/no-img-element': 'off', // Allow img elements
    },
  },
]

export default eslintConfig
