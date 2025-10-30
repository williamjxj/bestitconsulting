'use client'

import { IconCloud } from '@/registry/magicui/icon-cloud'

const slugs = [
  'typescript',
  'javascript',
  'dart',
  'java',
  'react',
  'flutter',
  'android',
  'html5',
  'css3',
  'nodedotjs',
  'express',
  'nextdotjs',
  'prisma',
  'amazonaws',
  'postgresql',
  'firebase',
  'nginx',
  'vercel',
  'testinglibrary',
  'jest',
  'cypress',
  'docker',
  'git',
  'jira',
  'github',
  'gitlab',
  'visualstudiocode',
  'androidstudio',
  'sonarqube',
  'figma',
]

export interface IconCloudDemoProps {
  size?: number
  radius?: number
  className?: string
}

export function IconCloudDemo({
  size = 420,
  radius = 140,
  className,
}: IconCloudDemoProps) {
  const images = slugs.map(slug => `https://cdn.simpleicons.org/${slug}`)
  return (
    <div
      className={`relative flex items-center justify-center overflow-visible ${className ?? ''}`}
    >
      <IconCloud images={images} size={size} radius={radius} />
    </div>
  )
}

export default IconCloudDemo
