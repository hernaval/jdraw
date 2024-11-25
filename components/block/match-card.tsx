import { MatchEntity } from '@/types/model/Match'
import React from 'react'
import { Card } from '../ui/card'
import { cn } from '@/lib/utils'
import { Separator } from '../ui/separator'
import { Shield } from 'lucide-react'
import { AthletEntity } from '@/types/model/athlet'
import { motion } from 'framer-motion'

interface MatchCardProps {
  match: MatchEntity
  highlighted: boolean
  hideNextRound: boolean
}

interface AthletRowProps {
  blueJudogi?: boolean
  athlet: Partial<AthletEntity> | null
}

const Flag = () => <Shield color='gray' size={18} />
const AthletRow: React.FC<AthletRowProps> = ({
  blueJudogi = false,
  athlet,
}) => {
  return (
    <div
      className={cn(
        blueJudogi ? 'border-l-2 border-blue-900' : '',
        'flex items-center justify-between'
      )}>
      <div className='flex items-center pl-1'>
        <span className='text-2xs text-gray-500 rotate-[-90deg] m-0'>CJC</span>
        <Flag />
        <motion.span
          key={athlet?.firstname}
          animate='visible'
          variants={{
            hidden: { scale: 0 },
            visible: {
              scale: [1.2, 0.8, 1.5, 1],
              transition: {
                duration: 0.6,
                times: [0, 0.2, 0.5, 1],
                ease: 'easeOut',
              },
            },
          }}
          className='text-xs font-medium truncate'>
          {athlet?.firstname} {athlet?.lastname}
        </motion.span>
      </div>
      {/* <span className="text-sm ">I(1) W(1) S(2)</span> */}
    </div>
  )
}

const MatchCard: React.FC<MatchCardProps> = ({
  match,
  highlighted,
  hideNextRound,
}) => {
  return (
    <motion.div
      animate={highlighted ? { scale: 1.05 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(hideNextRound ? 'opacity-40' : 'visible')}>
      <Card
        className={cn(
          'w-52 h-16 bg-white shadow-sm py-2',
          highlighted && 'border border-gold'
        )}>
        <div className='flex flex-col '>
          <AthletRow athlet={match.whiteAthlet} />
          <Separator className='my-1' />
          {match.blueAthlet && (
            <AthletRow blueJudogi athlet={match.blueAthlet} />
          )}
        </div>
      </Card>
    </motion.div>
  )
}

export default MatchCard
