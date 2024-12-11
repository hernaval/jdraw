'use client'
import MatchCard from '@/components/block/match-card'
import { cn } from '@/lib/utils'
import { MatchEntity } from '@/types/model/Match'
import React from 'react'
import { roundNumToName } from '../roundUtils'

interface ContestOrderProps {
  matches: MatchEntity[]
  runningMatchId: number
}

const Contest: React.FC<{
  match: MatchEntity
  category: string
  running: boolean
}> = ({ match, category, running }) => {
  return (
    <div
      className={cn(
        'mb-5 flex flex-col bg-white p-4 shadow-sm rounded',
        running ? 'border border-gold' : ''
      )}>
      <div className='mb-8'>
        <span className='font-bold mr-2'>MATCH</span>
        <span className='bg-slate-700 text-white text-sm p-1 mr-4'>
          #{match.position}
        </span>
        <span className='text-gray-500 text-sm mr-4'>
          {roundNumToName(match.round || 16)}{' '}
        </span>
        <span className='font-bold text-sm mr-4'>{category}</span>
        {running && (
          <span className='font-bold text-sm text-white bg-green-500 p-1 '>
            En cours...
          </span>
        )}
      </div>
      <MatchCard match={match} highlighted={false} hideNextRound={false} />
    </div>
  )
}

const ContestList: React.FC<ContestOrderProps> = ({
  matches,
  runningMatchId,
}) => {
  return (
    <div className='grid grid-cols-3 gap-4'>
      {matches.map((m, i) => (
        <Contest
          match={m}
          key={m.id}
          category={m.stageConfig?.weightCategory || ''}
          running={m.id == runningMatchId}
        />
      ))}
    </div>
  )
}

export default ContestList
