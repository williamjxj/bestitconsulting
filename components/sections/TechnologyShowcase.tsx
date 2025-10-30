'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { IconCloudDemo } from '@/components/ui/IconCloudDemo'
import BorderBeam from '@/components/ui/border-beam'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Technology {
  name: string
  icon: React.ReactNode
  color: string
}

interface TechCardProps {
  name: string
  icon: React.ReactNode
  color: string
}

const TechCard = ({ name, icon, color }: TechCardProps) => (
  <div className='flex-shrink-0 mx-2'>
    <div className='relative w-20 h-20 rounded-xl p-[1px] bg-gradient-to-br from-gray-200 to-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300'>
      <div className='w-full h-full bg-white rounded-[10px] border border-gray-200/70 flex flex-col items-center justify-center hover:border-blue-300/60 transition-all duration-300 group'>
        <div
          className={`text-white bg-gradient-to-br ${color} p-2 rounded-lg mb-1 group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
        <span className='text-xs font-medium text-gray-700 group-hover:text-blue-600 transition-colors text-center leading-tight'>
          {name}
        </span>
      </div>
    </div>
  </div>
)

const TechnologyShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const [progress, setProgress] = useState(0) // 0..1 autoplay progress
  const rafRef = useRef<number | null>(null)
  const autoplayDurationMs = 4000

  // Parallax tilt state for active slide
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })

  // Technology data
  const frontendTechs: Technology[] = [
    {
      name: 'React',
      color: 'from-blue-400 to-blue-600',
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89-1.87-.84-1.87-1.89.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95z' />
        </svg>
      ),
    },
    {
      name: 'Next.js',
      color: 'from-gray-800 to-black',
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 01-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 004.7344 7.1706l1.9002 2.8782.096-.0633c.8518-.5536 1.7525-1.3418 2.4657-2.1627 1.5179-1.7429 2.4963-3.868 2.8247-6.134.0961-.6591.1078-.8531.1078-1.7475 0-.8937-.012-1.0884-.1078-1.7474-.6522-4.506-3.8592-8.2919-8.2087-9.6945-.7672-.2487-1.5836-.42-2.4985-.5232-.169-.0176-1.0835-.0366-1.6123-.037zm4.0685 7.217c.3473 0 .4082.0053.4857.047.1127.0562.204.1686.237.2909.0186.0721.0234 1.3618.0186 4.3708l-.0067 4.2759-.7436-1.1271-.7461-1.1271v-3.2143a47.9316 47.9316 0 01.0093-3.2441c.0139-.14.0293-.2008.0653-.2856.0533-.1313.1513-.2237.2696-.2513.0552-.0141.1476-.0188.6991-.0188z' />
        </svg>
      ),
    },
    {
      name: 'TypeScript',
      color: 'from-blue-500 to-blue-700',
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z' />
        </svg>
      ),
    },
    {
      name: 'Tailwind',
      color: 'from-cyan-400 to-cyan-600',
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z' />
        </svg>
      ),
    },
    {
      name: 'shadcn/ui',
      color: 'from-slate-600 to-slate-800',
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
        </svg>
      ),
    },
    {
      name: 'Angular',
      color: 'from-red-500 to-red-700',
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M9.93 12.645h4.134L12 7.615l-2.07 5.03zm.378-9.578l11.117 3.87-1.894 14.777L12 24l-7.531-2.286L2.575 6.937l8.733-3.87zM12 2.597l-1.372 4.072L12 11.73l1.372-5.061L12 2.597z' />
        </svg>
      ),
    },
  ]

  const backendTechs: Technology[] = [
    {
      name: 'Node.js',
      color: 'from-green-500 to-green-700',
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z' />
        </svg>
      ),
    },
    {
      name: 'Python',
      color: 'from-blue-500 to-yellow-500',
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z' />
        </svg>
      ),
    },
    {
      name: 'Express',
      color: 'from-purple-500 to-purple-700',
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M3.1635 7.5176l-.8153 1.9999a.2652.2652 0 0 0 .0023.2011c.0131.0265.0358.0472.0644.0585.0286.0112.0606.0119.0897.0019l9.6147-3.2732a.2652.2652 0 0 0 .1819-.252V.5515a.2652.2652 0 0 0-.4471-.1919L3.1635 7.5176zm17.4695-1.9704L12 9.7793l8.6329 4.2321c.4472.2193.9896-.0742.9896-.5353V5.4515c0-.1449-.1178-.2627-.2627-.2627-.0719 0-.1408.0294-.1906.0816l-.7062.3768z' />
        </svg>
      ),
    },
    {
      name: 'Django',
      color: 'from-orange-500 to-red-600',
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639' />
        </svg>
      ),
    },
    {
      name: 'PostgreSQL',
      color: 'from-cyan-400 to-blue-500',
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M1.811 10.231c-.047 0-.058-.023-.035-.059l.246-.315c.023-.035.081-.058.128-.058h4.172c.046 0 .058.035.035.07l-.199.303c-.023.036-.082.059-.117.059zM.047 11.306c-.047 0-.058-.024-.035-.059l.245-.315c.023-.035.082-.059.129-.059h5.328c.047 0 .07.024.058.059l-.093.315c-.012.035-.047.059-.082.059zM2.828 12.381c-.047 0-.07-.024-.058-.059l.163-.315c.023-.035.070-.059.117-.059h2.222c.047 0 .070.024.070.059l-.023.315c0 .035-.023.059-.070.059zm8.269-3.006a3.25 3.25 0 0 0-2.298-.897c-1.78 0-2.876.897-2.876 2.314 0 2.418 3.74 2.233 3.74 3.477 0 .315-.233.607-.803.607-.557 0-1.224-.315-1.575-.734l-.631.84c.468.537 1.353.954 2.206.954 1.704 0 2.981-.897 2.981-2.337 0-2.512-3.74-2.326-3.74-3.57 0-.257.21-.537.688-.537.432 0 .978.246 1.293.537zM14.7 11.094h-1.468v-2.233h1.468c.688 0 1.118.339 1.118.897 0 .56-.43.897-1.118.897zm2.147-1.895c.688-.28 1.118-.84 1.118-1.617 0-1.338-.897-2.077-2.359-2.077h-3.441v7.354h3.93c1.659 0 2.712-.735 2.712-2.077 0-1.106-.618-1.583-1.96-1.583zm-.479-1.617c0 .537-.374.897-1.06.897h-1.468v-1.793h1.468c.686 0 1.06.36 1.06.896z' />
        </svg>
      ),
    },
    {
      name: 'MongoDB',
      color: 'from-pink-500 to-purple-600',
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M5.8 3.6l.7-.7 1.9.8 1.73.73 3.4-2 1.73.73 1.9-.8.7.7L5.8 3.6zm6.2 16.4l6.2-3.6-.7-.7-1.9.8-1.73-.73-3.4 2-1.73-.73-1.9.8-.7.7L12 20z' />
        </svg>
      ),
    },
  ]

  const cloudTechs: Technology[] = [
    {
      name: 'AWS',
      color: 'from-orange-400 to-orange-600',
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335c-.072.048-.144.070-.2.070-.08 0-.16-.04-.239-.112a2.417 2.417 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.588-.894-.588-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.27 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.030-.375-1.277-.255-.248-.686-.367-1.297-.367-.279 0-.567.032-.863.104-.296.064-.583.16-.862.272-.128.056-.224.088-.279.104-.056.016-.096.024-.128.024-.112 0-.168-.08-.168-.248v-.391c0-.128.016-.224.056-.28.04-.064.112-.128.207-.184.279-.144.614-.264 1.005-.36A4.86 4.86 0 0 1 4.96 5.43c.918 0 1.59.209 2.011.622.415.415.631 1.045.631 1.893v2.091zm-3.221 1.197c.263 0 .535-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.279-.503.056-.184.088-.407.088-.67v-.319a6.486 6.486 0 0 0-.55-.14 5.69 5.69 0 0 0-.646-.048c-.447 0-.774.088-1.005.264-.23.176-.343.43-.343.758 0 .303.08.535.231.695.152.16.375.24.67.24zm6.415.774c-.144 0-.24-.024-.304-.08-.064-.048-.12-.144-.168-.28L7.918 6.534c-.048-.16-.072-.263-.072-.311 0-.128.064-.2.192-.2h.783c.151 0 .255.024.31.08.065.048.113.144.160.28l1.774 6.985 1.646-6.985c.04-.16.096-.24.16-.28.065-.056.168-.08.32-.08h.638c.151 0 .255.024.32.08.064.048.12.144.159.28l1.67 7.058 1.838-7.058c.048-.16.104-.24.168-.28.064-.056.16-.08.303-.08h.742c.128 0 .2.064.2.2 0 .04-.008.08-.024.128-.016.048-.048.12-.104.24L14.177 11.615c-.048.16-.104.24-.168.28-.064.056-.168.08-.312.08h-.687c-.152 0-.256-.024-.32-.08-.065-.048-.12-.144-.16-.28L11.2 5.69l-1.614 6.914c-.04.16-.096.24-.16.28-.065.056-.168.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.144-.399-.096-.71-.2-.918-.32-.128-.071-.216-.151-.256-.223-.04-.072-.064-.151-.064-.24v-.407c0-.167.064-.247.183-.247.048 0 .096.008.151.032.048.024.12.056.2.104.279.12.574.215.886.279.32.064.63.096.95.096.502 0 .894-.088 1.166-.264.279-.176.414-.415.414-.726 0-.215-.08-.399-.24-.559-.159-.16-.462-.304-.886-.44l-1.27-.399c-.646-.2-1.117-.494-1.405-.886-.287-.391-.43-.83-.43-1.317 0-.383.08-.726.248-1.021.167-.296.39-.543.67-.742.28-.2.598-.351.958-.447.36-.096.734-.144 1.125-.144.183 0 .375.016.567.04.192.032.375.072.551.112.175.048.336.096.487.151.151.056.272.112.358.16.128.08.224.167.272.256.048.088.08.199.08.32v.375c0 .168-.065.256-.184.256-.064 0-.168-.032-.32-.104-.455-.2-.967-.304-1.534-.304-.454 0-.83.072-1.117.223-.287.152-.438.375-.438.67 0 .215.087.399.255.558.168.16.502.32.99.479l1.246.391c.638.2 1.093.479 1.365.838.271.36.414.767.414 1.229 0 .391-.08.75-.24 1.077-.159.328-.375.614-.646.838-.271.224-.591.391-.966.511-.375.112-.774.176-1.205.176zm1.789-3.023v-.432c0-.406-.088-.782-.255-1.109-.168-.327-.39-.606-.67-.83-.279-.223-.599-.391-.958-.511-.36-.12-.734-.183-1.125-.183-.391 0-.766.063-1.125.183-.36.12-.679.288-.958.511-.279.224-.502.503-.67.83-.167.327-.255.703-.255 1.109v.432c0 .406.088.774.255 1.101.168.327.391.598.67.814.279.215.598.375.958.487.36.112.734.168 1.125.168.391 0 .766-.056 1.125-.168.36-.112.679-.272.958-.487.279-.216.502-.487.67-.814.167-.327.255-.695.255-1.101z' />
        </svg>
      ),
    },
    {
      name: 'Docker',
      color: 'from-blue-500 to-indigo-600',
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z' />
        </svg>
      ),
    },
    {
      name: 'Kubernetes',
      color: 'from-blue-600 to-blue-800',
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M5.483 21.3h8.966l2.103-1.968H7.586l9.026-15.367L14.316 2.7 5.483 21.3zm13.034 0l-4.541-8.965-2.085 3.855h2.936L13.517 21.3h5z' />
        </svg>
      ),
    },
    {
      name: 'Vercel',
      color: 'from-black to-gray-800',
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M24 22.525H0l12-21.05 12 21.05z' />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      color: 'from-gray-700 to-gray-900',
      icon: (
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 10.956-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.719-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.82.479-.09.36-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.747-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z' />
        </svg>
      ),
    },
  ]

  const categories = [
    {
      title: 'Frontend Development',
      technologies: frontendTechs,
    },
    {
      title: 'Backend Development',
      technologies: backendTechs,
    },
    {
      title: 'Cloud & DevOps',
      technologies: cloudTechs,
    },
  ]

  useEffect(() => {
    if (typeof window === 'undefined') return

    const cards = cardsRef.current.filter(Boolean)

    // Set initial state
    gsap.set(cards, {
      y: 100,
      opacity: 0,
    })

    // Create scroll trigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.to(cards, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.1,
    })

    return () => {
      tl.kill()
    }
  }, [])

  // Auto-play functionality
  useEffect(() => {
    const startAutoPlay = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const elapsed = now - start
        const p = Math.min(1, elapsed / autoplayDurationMs)
        setProgress(p)
        if (p >= 1) {
          setCurrentSlide(prev => (prev + 1) % categories.length)
        } else {
          rafRef.current = requestAnimationFrame(tick)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const stopAutoPlay = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      setProgress(0)
    }

    startAutoPlay()

    return () => {
      stopAutoPlay()
    }
  }, [categories.length])

  // Restart progress when slide changes (if autoplay running)
  useEffect(() => {
    if (rafRef.current) {
      // already running; stop and start to reset progress
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      setProgress(0)
      const start = performance.now()
      const tick = (now: number) => {
        const elapsed = now - start
        const p = Math.min(1, elapsed / autoplayDurationMs)
        setProgress(p)
        if (p >= 1) {
          setCurrentSlide(prev => (prev + 1) % categories.length)
        } else {
          rafRef.current = requestAnimationFrame(tick)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
  }, [currentSlide, categories.length])

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % categories.length)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + categories.length) % categories.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
  }

  const handleMouseLeave = () => {
    if (!rafRef.current) {
      const start = performance.now()
      const tick = (now: number) => {
        const elapsed = now - start
        const p = Math.min(1, elapsed / autoplayDurationMs)
        setProgress(p)
        if (p >= 1) {
          setCurrentSlide(prev => (prev + 1) % categories.length)
        } else {
          rafRef.current = requestAnimationFrame(tick)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
  }

  // Mouse move parallax for active slide
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const pctX = (x / rect.width) * 2 - 1 // -1..1
    const pctY = (y / rect.height) * 2 - 1 // -1..1
    const maxTilt = 6 // degrees
    setTilt({ rotateX: -pctY * maxTilt, rotateY: pctX * maxTilt })
  }
  const handleMouseOut = () => setTilt({ rotateX: 0, rotateY: 0 })

  return (
    <section
      ref={sectionRef}
      className='py-12 bg-gradient-to-br from-slate-50 to-blue-50'
    >
      <div className='container mx-auto px-4'>
        <div className='text-center mb-8'>
          <span className='inline-block px-3 py-1 text-sm font-medium bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 rounded-full mb-3 border border-blue-200/50'>
            Technology Stack
          </span>
          <h2 className='text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
            Built with Modern Technologies
          </h2>
          <p className='text-base text-muted-foreground max-w-xl mx-auto'>
            We leverage cutting-edge tools and frameworks to deliver superior
            results.
          </p>
        </div>

        {/* Layout: carousel + icon cloud aside */}
        <div
          className='relative mx-auto max-w-6xl grid grid-cols-1 gap-8 items-center'
          aria-roledescription='carousel'
          aria-label='Technology categories carousel'
        >
          {/* 3D Carousel Container */}
          <div
            className='relative lg:col-span-12 flex justify-center'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* 3D Carousel Track */}
            <div
              ref={carouselRef}
              className='relative h-72 md:h-80 lg:h-96 xl:h-[28rem] w-full max-w-[760px]'
              style={{ perspective: '1000px', overflow: 'visible' }}
            >
              <div className='relative w-full h-full will-change-transform'>
                {categories.map((category, index) => {
                  const isActive = index === currentSlide
                  const isPrev =
                    index ===
                    (currentSlide - 1 + categories.length) % categories.length
                  const isNext =
                    index === (currentSlide + 1) % categories.length

                  // Calculate 3D positioning
                  let transform = ''
                  let opacity = 0.25
                  let scale = 0.8
                  let zIndex = 1
                  let blurClass = 'blur-[0.5px]'

                  if (isActive) {
                    transform = 'translateZ(0px) rotateY(0deg)'
                    opacity = 1
                    scale = 1
                    zIndex = 10
                    blurClass = ''
                  } else if (isPrev) {
                    transform =
                      'translateZ(-200px) translateX(-300px) rotateY(45deg)'
                    opacity = 0.25
                    scale = 0.9
                    zIndex = 5
                  } else if (isNext) {
                    transform =
                      'translateZ(-200px) translateX(300px) rotateY(-45deg)'
                    opacity = 0.25
                    scale = 0.9
                    zIndex = 5
                  } else {
                    transform =
                      'translateZ(-400px) translateX(0px) rotateY(0deg)'
                    opacity = 0.2
                    scale = 0.7
                    zIndex = 1
                  }

                  const transformFull = `${transform} scale(${scale})`
                  return (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 ease-out will-change-transform ${
                        isActive ? 'pointer-events-auto' : 'pointer-events-none'
                      }`}
                      style={{
                        transform: transformFull,
                        opacity,
                        zIndex,
                        transformStyle: 'preserve-3d',
                      }}
                      ref={el => {
                        if (el) cardsRef.current[index] = el
                      }}
                    >
                      {isActive ? (
                        <BorderBeam>
                          <div
                            className={`relative z-0 w-full h-full rounded-2xl p-6 flex flex-col items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm shadow-lg`}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseOut}
                            style={{
                              transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                              transition: 'transform 120ms ease-out',
                              backfaceVisibility: 'hidden',
                            }}
                          >
                            {/* overlay gradient for depth (above content while animating) */}
                            <div className='pointer-events-none absolute inset-0 rounded-2xl z-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.35),transparent_35%,transparent_65%,rgba(0,0,0,0.05))]' />
                            <div className='text-center mb-3'>
                              <h3 className='text-xl font-bold text-gray-900 mb-1'>
                                {category.title}
                              </h3>
                              <div className='w-12 h-1 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-cyan-500'></div>
                            </div>
                            <div className='flex flex-nowrap justify-center items-center gap-3 max-w-full overflow-hidden'>
                              {category.technologies.map((tech, techIndex) => (
                                <TechCard
                                  key={techIndex}
                                  name={tech.name}
                                  icon={tech.icon}
                                  color={tech.color}
                                />
                              ))}
                            </div>
                          </div>
                        </BorderBeam>
                      ) : (
                        <div
                          className={`relative z-0 w-full h-full rounded-2xl p-6 flex flex-col items-center justify-center overflow-hidden bg-white/5 ${blurClass}`}
                          aria-hidden='true'
                        >
                          <div className='text-center mb-3 opacity-70'>
                            <h3 className='text-xl font-bold text-gray-900/70 mb-1'>
                              {category.title}
                            </h3>
                            <div className='w-12 h-1 mx-auto rounded-full bg-gradient-to-r from-gray-300 to-gray-200'></div>
                          </div>
                          <div className='flex flex-nowrap justify-center items-center gap-3 max-w-full overflow-hidden opacity-80'>
                            {category.technologies.map((tech, techIndex) => (
                              <TechCard
                                key={techIndex}
                                name={tech.name}
                                icon={tech.icon}
                                color={tech.color}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              {/* progress bar removed per request */}
            </div>
            {/* close 3D Carousel Container */}
          </div>
          {/* Removed aside Icon Cloud to use as headline background */}
        </div>
      </div>
    </section>
  )
}

export default TechnologyShowcase
