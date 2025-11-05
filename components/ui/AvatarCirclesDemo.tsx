'use client'

import { AvatarCircles } from '@/components/ui/avatar-circles'

// Professional avatars using UI Avatars service for business professionals
const avatars = [
  {
    imageUrl:
      'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0056b3&color=fff&size=128&bold=true',
  },
  {
    imageUrl:
      'https://ui-avatars.com/api/?name=Michael+Chen&background=0d9488&color=fff&size=128&bold=true',
  },
  {
    imageUrl:
      'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=7c3aed&color=fff&size=128&bold=true',
  },
  {
    imageUrl:
      'https://ui-avatars.com/api/?name=David+Kim&background=dc2626&color=fff&size=128&bold=true',
  },
  {
    imageUrl:
      'https://ui-avatars.com/api/?name=Lisa+Wang&background=ea580c&color=fff&size=128&bold=true',
  },
  {
    imageUrl:
      'https://ui-avatars.com/api/?name=James+Wilson&background=059669&color=fff&size=128&bold=true',
  },
]

export function AvatarCirclesDemo() {
  return (
    <div className='flex w-full items-center justify-center'>
      <AvatarCircles numPeople={99} avatarUrls={avatars} />
    </div>
  )
}

export default AvatarCirclesDemo
