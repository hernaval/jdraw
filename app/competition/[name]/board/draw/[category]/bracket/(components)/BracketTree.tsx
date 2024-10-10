import MatchCard from '@/components/block/match-card'
import { BracketEntity } from '@/types/model/Bracket'
import React from 'react'

interface BracketTreeProps {
  rounds: BracketEntity[]
}

const BracketTree: React.FC<BracketTreeProps> = ({ rounds }) => {
  const totalRounds = rounds.length
  const bracketHeight = Math.pow(2, totalRounds) * 80
  return (
    <div className='h-full'>
      <div className='relative' style={{ height: `${bracketHeight}px` }}>
        {rounds.map((round, roundIndex) => (
          <div
            key={roundIndex}
            className='absolute top-0 bottom-0 w-48'
            style={{
              left: `${roundIndex * 250}px`,
            }}>
            {round.matches.map((match, matchIndex) => {
              const matchHeight = bracketHeight / round.matches.length
              const yPos = matchHeight * matchIndex + matchHeight / 2

              return (
                <div
                  key={match.id}
                  className='absolute'
                  style={{
                    top: `${yPos - 20}px`,
                  }}>
                  <MatchCard
                    match={match}
                    extraMargin={roundIndex > 0 ? '' : ''}
                  />
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
export default BracketTree
