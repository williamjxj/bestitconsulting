'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Technology data with icons
const ReactIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89-1.87-.84-1.87-1.89.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639' />
  </svg>
)

const NextJSIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 01-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 004.7344 7.1706l1.9002 2.8782.096-.0633c.8518-.5536 1.7525-1.3418 2.4657-2.1627 1.5179-1.7429 2.4963-3.868 2.8247-6.134.0961-.6591.1078-.8531.1078-1.7475 0-.8937-.012-1.0884-.1078-1.7474-.6522-4.506-3.8592-8.2919-8.2087-9.6945-.7672-.2487-1.5836-.42-2.4985-.5232-.169-.0176-1.0835-.0366-1.6123-.037zm4.0685 7.217c.3473 0 .4082.0053.4857.047.1127.0562.204.1686.237.2909.0186.0721.0234 1.3618.0186 4.3708l-.0067 4.2759-.7436-1.1271-.7461-1.1271v-3.2143a47.9316 47.9316 0 01.0093-3.2441c.0139-.14.0293-.2008.0653-.2856.0533-.1313.1513-.2237.2696-.2513.0552-.0141.1476-.0188.6991-.0188z' />
  </svg>
)

const TypeScriptIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z' />
  </svg>
)

const TailwindIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639' />
  </svg>
)

const ShadcnUIIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
  </svg>
)

const GatsbyIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6S17.302 21.6 12 21.6 2.4 17.302 2.4 12 6.698 2.4 12 2.4z' />
  </svg>
)

const NodeJSIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z' />
  </svg>
)

const PythonIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z' />
  </svg>
)

const PostgreSQLIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M23.4 6.6c-.2-.4-.5-.7-.9-.9L12.9.2c-.4-.2-.9-.2-1.3 0L1.5 5.7c-.4.2-.7.5-.9.9-.2.4-.2.9 0 1.3v9.8c0 .4.2.9.5 1.2.3.3.8.5 1.2.5h19.2c.4 0 .9-.2 1.2-.5.3-.3.5-.8.5-1.2V7.9c.2-.4.2-.9 0-1.3zM12 1.8l8.1 4.1L12 10 3.9 5.9 12 1.8zm9.6 15.1c0 .2-.1.4-.3.5-.2.1-.4.2-.6.2H3.3c-.2 0-.4-.1-.6-.2-.2-.1-.3-.3-.3-.5V8.1l8.1 4.1 8.1-4.1v8.8z' />
  </svg>
)

const MongoDBIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M17.193 9.555c-1.51-3.119-3.342-5.85-5.193-7.701C10.568 1.5 9.431 1.5 8.5 1.5c-.931 0-2.068 0-3.5.354C3.342 2.705 1.51 5.436 0 8.555c1.51 3.119 3.342 5.85 5.193 7.701C7.431 18.5 8.568 18.5 9.5 18.5c.931 0 2.068 0 3.5-.354 1.658-.851 3.49-3.582 5-6.701zm-5.193 7.701c-1.51-3.119-3.342-5.85-5.193-7.701C5.431 9.5 4.568 9.5 3.5 9.5c-.931 0-2.068 0-3.5.354C-1.658 10.705-3.49 13.436-5 16.555c1.51 3.119 3.342 5.85 5.193 7.701C2.431 25.5 3.568 25.5 4.5 25.5c.931 0 2.068 0 3.5-.354 1.658-.851 3.49-3.582 5-6.701z' />
  </svg>
)

const JavaIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639' />
  </svg>
)

const AWSIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335c-.072.048-.144.070-.2.070-.08 0-.16-.04-.239-.112a2.417 2.417 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.588-.894-.588-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.27 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.030-.375-1.277-.255-.248-.686-.367-1.297-.367-.279 0-.567.032-.863.104-.296.064-.583.16-.862.272-.128.056-.224.088-.279.104-.056.016-.096.024-.128.024-.112 0-.168-.08-.168-.248v-.391c0-.128.016-.224.056-.28.04-.064.112-.128.207-.184.279-.144.614-.264 1.005-.36A4.86 4.86 0 0 1 4.96 5.43c.918 0 1.59.209 2.011.622.415.415.631 1.045.631 1.893v2.091zm-3.221 1.197c.263 0 .535-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.279-.503.056-.184.088-.407.088-.67v-.319a6.486 6.486 0 0 0-.55-.14 5.69 5.69 0 0 0-.646-.048c-.447 0-.774.088-1.005.264-.23.176-.343.43-.343.758 0 .303.08.535.231.695.152.16.375.24.67.24zm6.415.774l1.678 1.915.003-.003a.44.44 0 0 1-.24.054l-.007.01-2.413-.001a5.171 5.171 0 0 1 2.597 2.075l.437-2.578-.005-.004a.44.44 0 0 1-.611 0l.004-.005a5.739 5.739 0 0 1 .056-.049 5.18 5.18 0 0 1-3.966-1.003l-.437 2.578.005.004a.44.44 0 0 1 .829.145l-.005.004a5.739 5.739 0 0 1-.056.049 5.18 5.18 0 0 1-1.003-3.966l-2.578-.437.004.005a.44.44 0 0 1-.145-.829l-.004.005a5.739 5.739 0 0 1-.049-.056 5.18 5.18 0 0 1 3.966-1.003l-.437-2.578.005.004a.44.44 0 0 1 .829.145l-.005-.004a5.739 5.739 0 0 1 .056.049 5.18 5.18 0 0 1-1.003 3.966l2.578.437-.004-.005a.44.44 0 0 1 .145.829l.004-.005a5.739 5.739 0 0 1 .049.056 5.18 5.18 0 0 1-3.966 1.003l.437 2.578-.005-.004a.44.44 0 0 1-.829-.145l.005.004a5.739 5.739 0 0 1-.056-.049 5.18 5.18 0 0 1-1.003-3.966l-2.578-.437.004.005a.44.44 0 0 1-.145-.829l-.004.005a5.739 5.739 0 0 1-.049-.056 5.18 5.18 0 0 1 3.966-1.003l-.437-2.578.005.004a.44.44 0 0 1 .829.145z' />
  </svg>
)

const DockerIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.184-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z' />
  </svg>
)

const KubernetesIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 1 0-.611l.005.004 1.67-1.906a5.739 5.739 0 0 1 .049-.056 5.18 5.18 0 0 1 1.003 3.966l-2.578.437-.004-.005a.44.44 0 0 1-.145-.829zm.173-2.983l.002.005a.44.44 0 0 1 .284-.022l.005-.003 2.573.422a5.165 5.165 0 0 1-1.003-3.966 5.739 5.739 0 0 1-.05.056l-1.669 1.906-.005-.004a.44.44 0 0 1-.137.606zm1.084 2.132l1.678 1.915.003-.003a.44.44 0 0 1-.24.054l-.007.01-2.413-.001a5.171 5.171 0 0 1 2.597 2.075l.437-2.578-.005-.004a.44.44 0 0 1-.611 0l.004-.005a5.739 5.739 0 0 1 .056-.049 5.18 5.18 0 0 1-3.966-1.003l-.437 2.578.005.004a.44.44 0 0 1 .829.145l-.005.004a5.739 5.739 0 0 1-.056.049 5.18 5.18 0 0 1-1.003-3.966l-2.578-.437.004.005a.44.44 0 0 1-.145-.829l-.004.005a5.739 5.739 0 0 1-.049-.056 5.18 5.18 0 0 1 3.966-1.003l-.437-2.578.005.004a.44.44 0 0 1 .829.145l-.005-.004a5.739 5.739 0 0 1 .056.049 5.18 5.18 0 0 1-1.003 3.966l2.578.437-.004-.005a.44.44 0 0 1 .145.829l.004-.005a5.739 5.739 0 0 1 .049.056 5.18 5.18 0 0 1-3.966 1.003l.437 2.578-.005-.004a.44.44 0 0 1-.829-.145l.005.004a5.739 5.739 0 0 1-.056-.049 5.18 5.18 0 0 1-1.003-3.966l-2.578-.437.004.005a.44.44 0 0 1-.145-.829l-.004.005a5.739 5.739 0 0 1-.049-.056 5.18 5.18 0 0 1 3.966-1.003l-.437-2.578.005.004a.44.44 0 0 1 .829.145z' />
  </svg>
)

const AzureIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M5.483 21.3h8.966l2.103-1.968H7.586l9.026-15.367L14.316 2.7 5.483 21.3zm13.034 0l-4.541-8.965-2.085 3.855h2.936L13.517 21.3h5z' />
  </svg>
)

const GCPIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12.19 2.38a9.344 9.344 0 0 0-5.362 1.693 9.363 9.363 0 0 0-3.477 4.51 9.527 9.527 0 0 0-.524 5.906 9.39 9.39 0 0 0 2.777 4.803 9.302 9.302 0 0 0 4.74 2.77 9.252 9.252 0 0 0 5.847-.525 9.32 9.32 0 0 0 4.473-3.503 9.456 9.456 0 0 0 1.676-5.406c.01-.425-.01-.851-.062-1.274H12.19v4.566h6.885a5.68 5.68 0 0 1-2.445 3.726 5.626 5.626 0 0 1-4.44.802 5.693 5.693 0 0 1-2.893-1.69 5.768 5.768 0 0 1-1.685-2.935 5.84 5.84 0 0 1 .32-3.596 5.724 5.724 0 0 1 2.18-2.76 5.648 5.648 0 0 1 3.274-1.034c1.348-.003 2.648.466 3.695 1.334l3.414-3.414a9.807 9.807 0 0 0-6.889-2.78z' />
  </svg>
)

const GitHubIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 10.956-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.719-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.82.479-.09.36-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.747-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z' />
  </svg>
)

// AI & Machine Learning Icons
const TensorFlowIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M1.292 5.856L11.54.033a1.127 1.127 0 0 1 1.292.033l10.248 5.823a1.127 1.127 0 0 1 0 1.942L12.832 13.63a1.127 1.127 0 0 1-1.292 0L1.292 7.798a1.127 1.127 0 0 1 0-1.942z' />
  </svg>
)

const PyTorchIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 10.956-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.719-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.82.479-.09.36-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.747-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z' />
  </svg>
)

const OpenAIIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M22.281 9.28l-7.19-3.2c-.15-.07-.31-.07-.45 0L7.719 9.28c-.15.07-.25.22-.25.39v6.62c0 .17.1.32.25.39l7.19 3.2c.15.07.31.07.45 0l7.19-3.2c.15-.07.25-.22.25-.39V9.67c0-.17-.1-.32-.25-.39zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z' />
  </svg>
)

const HuggingFaceIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z' />
  </svg>
)

const ScikitLearnIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
  </svg>
)

const JupyterIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z' />
  </svg>
)

// Additional AI & ML Icons
const AgenticAIIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
  </svg>
)

const VibeCodingIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
  </svg>
)

const SpecDrivenIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z' />
    <path d='M14 2v6h6' />
    <path d='M16 13H8' />
    <path d='M16 17H8' />
    <path d='M10 9H8' />
  </svg>
)

const SupabaseIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12v8.959a.396.396 0 0 0 .716.233l9.081-12.261.401-.562a1.04 1.04 0 0 0-.836-1.66z' />
  </svg>
)

const VercelIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M24 22.525H0l12-21.05 12 21.05z' />
  </svg>
)

const ContextEngineeringIcon = () => (
  <svg className='w-8 h-8' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
  </svg>
)

// Technology categories data
const technologyCategories = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    technologies: [
      {
        id: 'react',
        name: 'React',
        icon: <ReactIcon />,
        color: 'from-blue-400 to-blue-600',
      },
      {
        id: 'nextjs',
        name: 'Next.js',
        icon: <NextJSIcon />,
        color: 'from-gray-800 to-black',
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        icon: <TypeScriptIcon />,
        color: 'from-blue-500 to-blue-700',
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        icon: <TailwindIcon />,
        color: 'from-cyan-400 to-cyan-600',
      },
      {
        id: 'shadcn-ui',
        name: 'shadcn/ui',
        icon: <ShadcnUIIcon />,
        color: 'from-slate-500 to-slate-700',
      },
      {
        id: 'gatsby',
        name: 'Gatsby',
        icon: <GatsbyIcon />,
        color: 'from-purple-500 to-purple-700',
      },
    ],
  },
  {
    id: 'backend',
    name: 'Backend Development',
    technologies: [
      {
        id: 'nodejs',
        name: 'Node.js',
        icon: <NodeJSIcon />,
        color: 'from-green-500 to-green-700',
      },
      {
        id: 'python',
        name: 'Python',
        icon: <PythonIcon />,
        color: 'from-blue-500 to-yellow-500',
      },
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        icon: <PostgreSQLIcon />,
        color: 'from-blue-600 to-blue-800',
      },
      {
        id: 'mongodb',
        name: 'MongoDB',
        icon: <MongoDBIcon />,
        color: 'from-green-600 to-green-800',
      },
      {
        id: 'java',
        name: 'Java',
        icon: <JavaIcon />,
        color: 'from-orange-500 to-red-600',
      },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    technologies: [
      {
        id: 'aws',
        name: 'AWS',
        icon: <AWSIcon />,
        color: 'from-orange-400 to-orange-600',
      },
      {
        id: 'docker',
        name: 'Docker',
        icon: <DockerIcon />,
        color: 'from-blue-400 to-blue-600',
      },
      {
        id: 'kubernetes',
        name: 'Kubernetes',
        icon: <KubernetesIcon />,
        color: 'from-blue-500 to-blue-700',
      },
      {
        id: 'azure',
        name: 'Azure',
        icon: <AzureIcon />,
        color: 'from-blue-500 to-blue-600',
      },
      {
        id: 'gcp',
        name: 'GCP',
        icon: <GCPIcon />,
        color: 'from-green-500 to-blue-500',
      },
      {
        id: 'github',
        name: 'GitHub',
        icon: <GitHubIcon />,
        color: 'from-gray-700 to-gray-900',
      },
    ],
  },
  {
    id: 'ai',
    name: 'AI & Machine Learning',
    technologies: [
      {
        id: 'tensorflow',
        name: 'TensorFlow',
        icon: <TensorFlowIcon />,
        color: 'from-orange-500 to-orange-700',
      },
      {
        id: 'pytorch',
        name: 'PyTorch',
        icon: <PyTorchIcon />,
        color: 'from-red-500 to-red-700',
      },
      {
        id: 'openai',
        name: 'OpenAI',
        icon: <OpenAIIcon />,
        color: 'from-green-500 to-green-700',
      },
      {
        id: 'huggingface',
        name: 'Hugging Face',
        icon: <HuggingFaceIcon />,
        color: 'from-yellow-500 to-yellow-700',
      },
      {
        id: 'scikit-learn',
        name: 'Scikit-learn',
        icon: <ScikitLearnIcon />,
        color: 'from-blue-500 to-blue-700',
      },
      {
        id: 'jupyter',
        name: 'Jupyter',
        icon: <JupyterIcon />,
        color: 'from-purple-500 to-purple-700',
      },
      {
        id: 'agentic-ai',
        name: 'Agentic AI',
        icon: <AgenticAIIcon />,
        color: 'from-indigo-500 to-indigo-700',
      },
      {
        id: 'vibe-coding',
        name: 'Vibe Coding',
        icon: <VibeCodingIcon />,
        color: 'from-pink-500 to-pink-700',
      },
      {
        id: 'spec-driven',
        name: 'Spec-Driven Development',
        icon: <SpecDrivenIcon />,
        color: 'from-teal-500 to-teal-700',
      },
      {
        id: 'supabase',
        name: 'Supabase',
        icon: <SupabaseIcon />,
        color: 'from-emerald-500 to-emerald-700',
      },
      {
        id: 'vercel',
        name: 'Vercel',
        icon: <VercelIcon />,
        color: 'from-gray-600 to-gray-800',
      },
      {
        id: 'context-engineering',
        name: 'Context Engineering',
        icon: <ContextEngineeringIcon />,
        color: 'from-violet-500 to-violet-700',
      },
    ],
  },
]

// Enhanced animation system using CSS keyframes and transitions

export default function TechnologyShowcase() {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance categories
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentCategoryIndex(prev => (prev + 1) % technologyCategories.length)
    }, 4000) // Change category every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToNextCategory = () => {
    setCurrentCategoryIndex(prev => (prev + 1) % technologyCategories.length)
  }

  const goToPreviousCategory = () => {
    setCurrentCategoryIndex(prev =>
      prev === 0 ? technologyCategories.length - 1 : prev - 1
    )
  }

  const goToCategory = (index: number) => {
    setCurrentCategoryIndex(index)
  }

  const currentCategory = technologyCategories[currentCategoryIndex]

  return (
    <section className='py-16 bg-gray-50 animate-fade-in'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-12 animate-slide-up'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Built with Modern Technologies
          </h2>
          <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
            We leverage cutting-edge technologies to deliver exceptional digital
            experiences and superior results.
          </p>
        </div>

        {/* Category Navigation */}
        <div className='flex justify-center mb-8 animate-slide-up'>
          <div className='flex space-x-2 bg-white rounded-lg p-1 shadow-sm'>
            {technologyCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => goToCategory(index)}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  index === currentCategoryIndex
                    ? 'bg-blue-600 text-white shadow-md animate-pulse-glow'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Current Category Display */}
        <div className='relative'>
          {/* Category Title */}
          <div
            key={`category-title-${currentCategoryIndex}`}
            className='text-center mb-8 animate-slide-in'
          >
            <h3 className='text-2xl font-semibold text-gray-800 mb-2'>
              {currentCategory.name}
            </h3>
            <div className='w-16 h-1 bg-blue-600 mx-auto rounded-full animate-expand-bar'></div>
          </div>

          {/* Technology Grid */}
          <div
            key={`tech-grid-${currentCategoryIndex}`}
            className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 animate-fade-in-stagger'
          >
            {currentCategory.technologies.map((tech, index) => (
              <div
                key={tech.id}
                className='group cursor-pointer tech-card animate-slide-up'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className='relative w-full h-32 bg-white rounded-2xl flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden'>
                  <div
                    className={`text-white bg-gradient-to-br ${tech.color} p-3 rounded-xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    {tech.icon}
                  </div>
                  <span className='text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors text-center px-2'>
                    {tech.name}
                  </span>

                  {/* Animated background gradient */}
                  <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                  {/* Shimmer effect */}
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700' />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPreviousCategory}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-all duration-200 hover:scale-110 active:scale-95 animate-float'
          >
            <ChevronLeft className='w-5 h-5 text-gray-600' />
          </button>

          <button
            onClick={goToNextCategory}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-all duration-200 hover:scale-110 active:scale-95 animate-float'
            style={{ animationDelay: '0.5s' }}
          >
            <ChevronRight className='w-5 h-5 text-gray-600' />
          </button>
        </div>

        {/* Category Indicators */}
        <div className='flex justify-center mt-8 space-x-2 animate-fade-in'>
          {technologyCategories.map((_, index) => (
            <button
              key={index}
              onClick={() => goToCategory(index)}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 active:scale-95 ${
                index === currentCategoryIndex
                  ? 'bg-blue-600 scale-125 animate-pulse'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes expand-bar {
          from {
            width: 0;
          }
          to {
            width: 4rem;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
            transform: scale(1.02);
          }
        }

        @keyframes fade-in-stagger {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }

        .animate-expand-bar {
          animation: expand-bar 0.8s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-fade-in-stagger {
          animation: fade-in-stagger 0.6s ease-out;
        }

        /* Enhanced hover effects */
        .tech-card {
          position: relative;
          overflow: hidden;
        }

        .tech-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.6s ease-out;
        }

        .tech-card:hover::before {
          left: 100%;
        }

        .tech-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        /* Responsive animations */
        @media (max-width: 768px) {
          .animate-float {
            animation-duration: 2s;
          }

          .animate-fade-in-stagger {
            animation-duration: 0.4s;
          }
        }

        /* Smooth transitions for category changes */
        .category-transition {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  )
}
