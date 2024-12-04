'use client'
import useTimer from '@/hooks/use-timer'
import { formatTimeAs } from '@/lib/date'
import React, { useEffect } from 'react'

interface MatchPanelProps {
  roundName: string
}
const MatchPanel: React.FC<MatchPanelProps> = ({ roundName }) => {
  const { timeLeft, startTime, stopTime, isPaused } = useTimer(4 * 60) // 4 minutes
  return (
    <div className='flex bg-slate-700 p-5 items-center'>
      <div className='flex-1'>
        <p className='text-white font-bold text-md'>{roundName}</p>
      </div>
      <div className='text-green-500 flex-1 text-8xl'>
        {formatTimeAs(timeLeft)}
      </div>
    </div>
  )
}

export default MatchPanel
