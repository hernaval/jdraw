import MatchCard from '@/components/block/match-card'
import { BracketEntity } from '@/types/model/Bracket'
import React from 'react'

interface BracketTreeProps {
  rounds: BracketEntity[]
}

const BracketTree: React.FC<BracketTreeProps> = ({ rounds }) => {
  const totalRounds = rounds.length
  const maxMatches = Math.pow(2, totalRounds - 1)

  const getRowSpan = (roundIndex: number) => {
    return Math.pow(2, roundIndex)
  }

  const getStartRow = (matchIndex: number, roundIndex: number) => {
    const spacing = Math.pow(2, roundIndex)
    return matchIndex * spacing + 1
  }
  return (
    <div className='h-full overflow-auto '>
      <div
        className='grid'
        style={{
          gridTemplateColumns: `repeat(${totalRounds}, minmax(160px, 250px))`,
          gridTemplateRows: `repeat(${maxMatches}, minmax(80px, auto))`,
        }}>
        {rounds.map((round, roundIndex) => (
          <React.Fragment key={round.round}>
            {round.matches.map((match, matchIndex) => {
              const rowSpan = getRowSpan(roundIndex)
              const startRow = getStartRow(matchIndex, roundIndex)

              return (
                <div
                  key={match.position}
                  className='relative'
                  style={{
                    gridColumn: roundIndex + 1,
                    gridRow: `${startRow} / span ${rowSpan}`,
                  }}>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <MatchCard match={match} />
                  </div>
                </div>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
export default BracketTree
