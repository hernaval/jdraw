import React from 'react'
import BracketTree from './(components)/BracketTree'
import { BracketEntity } from '@/types/model/Bracket'
import { Competitor } from '@/types/model/competitor'
import { getDrawBracket } from '@/feature/draw/get-draw-bracket'

const BracketGenerationPage = async ({ searchParams, params }: any) => {
  const competition = params.name
  // const drawConfig: StageConfig | null = await getDrawConfig(
  //   competition,
  //   params.category
  // )
  const rounds = await getDrawBracket(competition, params.category)
  const competitors: Competitor[] = rounds[0].matches.flatMap(
    match =>
      [
        {
          id: match.whiteAthlet?.id,
          firstname: match.whiteAthlet?.firstname,
          lastname: match.whiteAthlet?.lastname,
          position: match.position,
          judogi: 'whiteAthlet',
        },
        {
          id: match.blueAthlet?.id || Math.random(),
          firstname: match.blueAthlet?.firstname,
          lastname: match.blueAthlet?.lastname,
          position: match.position,
          judogi: 'blueAthlet',
        },
      ] as Competitor[]
  ) // only pick first round to draw
  let emptyBrackets: BracketEntity[] = structuredClone(rounds)
  emptyBrackets[0].matches.forEach(m => {
    ;(m.whiteAthlet = null), (m.blueAthlet = null)
  })
  return (
    <div className=''>
      <BracketTree rounds={emptyBrackets} competitors={competitors} />
    </div>
  )
}

export default BracketGenerationPage
