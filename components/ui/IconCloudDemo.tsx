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

export function IconCloudDemo() {
  const images = slugs.map(slug => `https://cdn.simpleicons.org/${slug}/${slug}`)
  return (
    <div className='relative flex w-full items-center justify-center overflow-hidden py-6'>
      <IconCloud images={images} />
    </div>
  )
}

export default IconCloudDemo


