'use client'

import React from 'react'
import { cn } from '@/lib/utils'
const specialKeys = {
  Enter: { width: 'w-20', text: '↵' },
  Space: { width: 'w-64', text: '' },
}

interface KeyProps {
  children: React.ReactNode
  className?: string
  isSpace?: boolean
}

const Key: React.FC<KeyProps> = ({ children, className, isSpace = false }) => (
  <button
    className={cn(
      'bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow',
      'transition-all duration-200 ease-in-out',
      'hover:bg-gray-300 hover:shadow-md hover:-translate-y-0.5',
      'focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50',
      isSpace && 'relative',
      className
    )}>
    {children}
  </button>
)

interface KeyboardProps {
  layout: string[][]
}
const Keyboard: React.FC<KeyboardProps> = ({ layout }) => {
  return (
    <div className='max-w-4xl mx-auto p-4 bg-gray-100 rounded-xl shadow-lg'>
      <div className='space-y-2'>
        {layout.map((row, rowIndex) => (
          <div key={rowIndex} className='flex justify-center space-x-2'>
            {row.map(key => (
              <Key key={key}>{key}</Key>
            ))}
            {rowIndex === 1 && (
              <Key className={specialKeys.Enter.width}>
                {specialKeys.Enter.text}
              </Key>
            )}
          </div>
        ))}
        <div className='flex justify-center space-x-2 mt-8'>
          <Key className='w-20'>Alt</Key>
          <Key className={specialKeys.Space.width} isSpace={true}>
            {specialKeys.Space.text}
          </Key>
        </div>
      </div>
    </div>
  )
}
export default Keyboard
