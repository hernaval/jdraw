import { cn } from '@/lib/utils'
import React from 'react'

interface AthletWinnerProps {
  judogiColor: string
  athlet: string
}
const AthletWinner: React.FC<AthletWinnerProps> = ({ judogiColor, athlet }) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-around h-64',
        judogiColor == 'whitePlayer'
          ? 'bg-white text-primary'
          : 'bg-blue-700 text-white'
      )}>
      <h1 className='text-6xl'>GAGNANT</h1>
      <h3 className='text-4xl'>({athlet})</h3>
    </div>
  )
}

export default AthletWinner
