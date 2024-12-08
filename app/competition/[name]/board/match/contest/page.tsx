import React from 'react'
import ContestList from './(components)/ContestList'
import { BracketEntity } from '@/types/model/Bracket'
import { Separator } from '@/components/ui/separator'
import { getMatch } from '@/feature/match/get-match'
import EndedContest from './(components)/EndedContest'
import { roundNumToName } from './roundUtils'

const ContestOrder = async ({ searchParams, params }: any) => {
  const competition = params.name
  const brackets: BracketEntity[] = await getMatch(competition)
  const runningMatchId: number = brackets[0].matches[0].id || 1
  return (
    <div>
      {/* <h1 className='text-2xl'>Prochains combats</h1> */}
      {brackets.map((b, i) => (
        <div key={b.round} className='mt-8'>
          <div className='sticky top-0 mb-4'>
            <h4 className='text-2xl text-gold font-bold'>
              {roundNumToName(b.round)}
            </h4>
          </div>
          {b.matches.length > 0 ? (
            <ContestList matches={b.matches} runningMatchId={runningMatchId} />
          ) : (
            <EndedContest />
          )}
          <Separator />
        </div>
      ))}
    </div>
  )
}

export default ContestOrder
