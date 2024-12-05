'use client'
import useTimer from '@/hooks/use-timer'
import { formatTimeAs } from '@/lib/date'
import { cn } from '@/lib/utils'
import React, { useEffect } from 'react'

interface MatchPanelProps {
  roundName: string
  time: string
  isPaused: boolean
}
const MatchPanel: React.FC<MatchPanelProps> = ({
  roundName,
  time,
  isPaused,
}) => {
  return (
    <div className='flex bg-slate-700 p-5 items-center'>
      <div className='flex-1'>
        <p className='text-white font-bold text-md'>{roundName}</p>
      </div>
      <div
        className={cn(
          'flex-1 text-8xl',
          isPaused ? 'text-destructive' : 'text-green-500'
        )}>
        {time}
      </div>
    </div>
  )
}

export default MatchPanel
