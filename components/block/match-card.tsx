import { MatchEntity } from '@/types/model/Match'
import React from 'react'
import { Card } from '../ui/card'
import { cn } from '@/lib/utils'
import { Separator } from '../ui/separator'
import { Shield } from 'lucide-react'
import { AthletEntity } from '@/types/model/athlet'

interface MatchCardProps {
  match: MatchEntity
  extraMargin?: string
}

interface AthletRowProps {
  blueJudogi?: boolean
  athlet?: Partial<AthletEntity>
}

const Flag = () => <Shield color='gray' size={18} />
const AthletRow: React.FC<AthletRowProps> = ({
  blueJudogi = false,
  athlet,
}) => {
  return (
    <div
      className={cn(
        blueJudogi ? ' border-blue-900' : '',
        'flex items-center justify-between'
      )}>
      <div className='flex items-center pl-1'>
        <span className='text-2xs text-gray-500 rotate-[-90deg] m-0'>CJC</span>
        <Flag />
        <span className='ml-2 text-xs font-medium'>{athlet?.firstname}</span>
      </div>
      {/* <span className="text-sm ">I(1) W(1) S(2)</span> */}
    </div>
  )
}

const MatchCard: React.FC<MatchCardProps> = ({ match, extraMargin }) => {
  return (
    <Card className={cn('w-52 bg-white shadow-sm py-2', extraMargin)}>
      <div className=''>
        <AthletRow athlet={match.whiteAthlet} />
        <Separator className='my-2' />
        <AthletRow blueJudogi athlet={match.blueAthlet} />
      </div>
    </Card>
  )
}

export default MatchCard
