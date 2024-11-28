'use client'

import MatchCard from '@/components/block/match-card'
import { cn, shuffleArray } from '@/lib/utils'
import { BracketEntity } from '@/types/model/Bracket'
import { Competitor } from '@/types/model/competitor'
import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import CompetitorInsight from './CompetitorInsight'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { MatchEntity } from '@/types/model/Match'
import { produce } from 'immer'
import CompetitorList from './CompetitorList'
import CountdownTimer from '@/components/block/countdown-timer'

interface BracketTreeProps {
  rounds: BracketEntity[]
  competitors: Competitor[]
}

const BracketTree: React.FC<BracketTreeProps> = ({
  rounds: initialRounds,
  competitors: initialCompetitors,
}) => {
  const [rounds, setRounds] = useState(initialRounds)
  const [competitors, setCompetitors] = useState(initialCompetitors)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [currentCompetitor, setCurrentCompetitor] = useState<Competitor | null>(
    null
  )
  const [highlightedMatch, setHighlightedMatch] = useState<number | null>(null)
  const [showAthletList, setshowAthletList] = useState<boolean>(true)
  const [drawFinished, setDrawFinished] = useState(false)
  const totalRounds = rounds.length
  const maxMatches = Math.pow(2, totalRounds - 1)

  const getRowSpan = (roundIndex: number) => {
    return Math.pow(2, roundIndex)
  }

  const getStartRow = (matchIndex: number, roundIndex: number) => {
    const spacing = Math.pow(2, roundIndex)
    return matchIndex * spacing + 1
  }

  const fillBracket = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsAnimating(true)
    const firstRound = rounds[0]
    const matchPositions = shuffleArray(
      Array.from(Array(firstRound.matches.length).keys())
    )

    // Fill the white athlet first, then the blue

    for (let judogi = 0; judogi < 2; judogi++) {
      for (const matchIndex of matchPositions) {
        const match: MatchEntity = firstRound.matches[matchIndex]
        const position = judogi === 0 ? 'whiteAthlet' : 'blueAthlet'

        // skip if already filled
        if (match[position]) continue

        // get the matched competitor and show in insight
        const competitor: Competitor = competitors.find(
          c => c.position == matchIndex + 1 && c.judogi == position
        )!
        if (!competitor.firstname || !competitor.lastname) continue // ignore animation for byes
        console.log('cmopetitor', competitor)
        setCurrentCompetitor(competitor)

        await new Promise(resolve => setTimeout(resolve, 1000))

        setHighlightedMatch(match.id!!)

        // active the highlight in bracket card
        await new Promise(resolve => setTimeout(resolve, 700))

        setRounds(prevRounds => {
          const newRounds = [...prevRounds]
          newRounds[0].matches[matchIndex][position] = competitor
          return newRounds
        })

        setCompetitors(prev => prev.filter(c => c.id != competitor.id))
        // setCompetitors(prev => prev.filter(c => c.id != competitor.id))
        setCurrentCompetitor(null)
        setHighlightedMatch(null)

        // some delay before starting next
        await new Promise(resolve => setTimeout(resolve, 400))
      }
    }
    setIsAnimating(false)
    setshowAthletList(false)
    setDrawFinished(true)
  }
  return (
    <div className='flex justify-around'>
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
                    <MatchCard
                      match={match}
                      highlighted={match.id === highlightedMatch}
                      hideNextRound={roundIndex > 0 && !drawFinished}
                    />
                  </div>
                </div>
              )
            })}
          </React.Fragment>
        ))}
      </div>

      <motion.div
        animate={showAthletList ? 'visible' : 'hidden'}
        variants={{
          hidden: {
            opacity: 0,
            x: 200,
            visibility: 'hidden',
            transition: { duration: 0.5 },
          },
          visible: {
            opacity: 1,
            visibility: 'visible',
            transition: { duration: 0.5 },
          },
        }}
        className='bg-white py-4 px-8 w-[300px]'>
        <h3 className='font-2xl font-bold'>Athlètes</h3>

        <CompetitorList
          competitors={competitors}
          activeCompetitor={currentCompetitor}
        />
      </motion.div>

      <AnimatePresence>
        {currentCompetitor && (
          <CompetitorInsight competitor={currentCompetitor} />
        )}
      </AnimatePresence>

      {!isAnimating && !drawFinished && (
        <div className='fixed top-1/2 left-1/2'>
          <CountdownTimer starting={3} onComplete={fillBracket} />
        </div>
      )}
    </div>
  )
}
export default BracketTree
