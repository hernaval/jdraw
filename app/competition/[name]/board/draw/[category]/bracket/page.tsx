import React from 'react'
import BracketTree from './(components)/BracketTree'
import { BracketEntity } from '@/types/model/Bracket'
import { Competitor } from '@/types/model/competitor'

const rounds: BracketEntity[] = [
  {
    round: 1,
    matches: [
      {
        id: 1,
        position: 1,
        whiteAthlet: {
          id: 1,
          firstname: 'Herinavalona',
          lastname: 'Ranarivola',
        },
        blueAthlet: { id: 2, firstname: 'John', lastname: 'Doe' },
        winnerAthlet: null,
      },
      {
        id: 2,
        position: 2,
        whiteAthlet: { id: 3, firstname: 'Karvil', lastname: 'Sahan' },
        blueAthlet: { id: 4, firstname: 'Besouza', lastname: 'Ernesto' },
        winnerAthlet: null,
      },
      {
        id: 3,
        position: 3,
        whiteAthlet: { id: 5, firstname: 'Rafael', lastname: 'Tiarno' },
        blueAthlet: { id: 6, firstname: 'Klark', lastname: 'Klins' },
        winnerAthlet: null,
      },
      {
        id: 4,
        position: 4,
        whiteAthlet: { id: 7, firstname: 'Arniel', lastname: 'Mattiew' },
        blueAthlet: { id: 8, firstname: 'Behavel', lastname: 'Bernard' },
        winnerAthlet: null,
      },
      {
        id: 5,
        position: 5,
        whiteAthlet: { id: 9, firstname: 'Larry', lastname: 'Arison' },
        blueAthlet: { id: 10, firstname: 'Hervé', lastname: 'Gascow' },
        winnerAthlet: null,
      },
      {
        id: 6,
        position: 6,
        whiteAthlet: { id: 11, firstname: 'Hardy', lastname: 'LeJean' },
        blueAthlet: { id: 12, firstname: 'Bateau', lastname: 'Christian' },
        winnerAthlet: null,
      },
      {
        id: 7,
        position: 7,
        whiteAthlet: { id: 13, firstname: 'Lemond', lastname: 'Carter' },
        blueAthlet: { id: 14, firstname: 'Vivier', lastname: 'Martin' },
        winnerAthlet: null,
      },
      {
        id: 8,
        position: 8,
        whiteAthlet: { id: 15, firstname: 'Arnaud', lastname: 'Perchard' },
        blueAthlet: { id: 16, firstname: 'Jacques', lastname: 'Lecoq' },
        winnerAthlet: null,
      },
    ],
  },
  {
    round: 2,
    matches: Array.from({ length: 4 }, (v, k) => ({
      id: k + 9,
      position: 9 + k,
      whiteAthlet: null,
      blueAthlet: null,
      winnerAthlet: null,
    })),
  },
  {
    round: 3,
    matches: Array.from({ length: 2 }, (v, k) => ({
      id: k + 9,
      position: 9 + k,
      whiteAthlet: null,
      blueAthlet: null,
      winnerAthlet: null,
    })),
  },
  {
    round: 4,
    matches: [
      {
        id: 25,
        position: 15,
        whiteAthlet: null,
        blueAthlet: null,
        winnerAthlet: null,
      },
    ],
  },
]

const BracketGenerationPage = async ({ searchParams, params }: any) => {
  const competition = params.name
  // const drawConfig: StageConfig | null = await getDrawConfig(
  //   competition,
  //   params.category
  // )
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
          id: match.blueAthlet?.id,
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
