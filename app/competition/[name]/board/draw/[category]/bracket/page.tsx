import React from 'react'
import BracketTree from './(components)/BracketTree'
import { BracketEntity } from '@/types/model/Bracket'

const rounds: BracketEntity[] = [
  {
    round: 1,
    matches: [
      {
        id: 1,
        position: 1,
        whiteAthlet: { firstname: 'Herinavalona', lastname: 'Ranarivola' },
        blueAthlet: { firstname: 'John', lastname: 'Doe' },
        winnerAthlet: null,
      },
      {
        id: 2,
        position: 2,
        whiteAthlet: { firstname: 'Herinavalona', lastname: 'Ranarivola' },
        blueAthlet: null,
        winnerAthlet: null,
      },
      {
        id: 3,
        position: 3,
        whiteAthlet: { firstname: 'Herinavalona', lastname: 'Ranarivola' },
        blueAthlet: { firstname: 'John', lastname: 'Doe' },
        winnerAthlet: null,
      },
      {
        id: 4,
        position: 4,
        whiteAthlet: { firstname: 'Herinavalona', lastname: 'Ranarivola' },
        blueAthlet: { firstname: 'John', lastname: 'Doe' },
        winnerAthlet: null,
      },
      {
        id: 5,
        position: 5,
        whiteAthlet: { firstname: 'Herinavalona', lastname: 'Ranarivola' },
        blueAthlet: { firstname: 'John', lastname: 'Doe' },
        winnerAthlet: null,
      },
      {
        id: 6,
        position: 6,
        whiteAthlet: { firstname: 'Herinavalona', lastname: 'Ranarivola' },
        blueAthlet: { firstname: 'John', lastname: 'Doe' },
        winnerAthlet: null,
      },
      {
        id: 7,
        position: 7,
        whiteAthlet: { firstname: 'Herinavalona', lastname: 'Ranarivola' },
        blueAthlet: { firstname: 'John', lastname: 'Doe' },
        winnerAthlet: null,
      },
      {
        id: 8,
        position: 8,
        whiteAthlet: { firstname: 'Herinavalona', lastname: 'Ranarivola' },
        blueAthlet: { firstname: 'John', lastname: 'Doe' },
        winnerAthlet: null,
      },
    ],
  },
  {
    round: 2,
    matches: [
      {
        id: 1,
        position: 9,
        whiteAthlet: { firstname: 'Herinavalona', lastname: 'Ranarivola' },
        blueAthlet: { firstname: 'John', lastname: 'Doe' },
        winnerAthlet: null,
      },
      {
        id: 2,
        position: 10,
        whiteAthlet: { firstname: 'Herinavalona', lastname: 'Ranarivola' },
        blueAthlet: { firstname: 'John', lastname: 'Doe' },
        winnerAthlet: null,
      },
      {
        id: 3,
        position: 11,
        whiteAthlet: { firstname: 'Herinavalona', lastname: 'Ranarivola' },
        blueAthlet: { firstname: 'John', lastname: 'Doe' },
        winnerAthlet: null,
      },
      {
        id: 4,
        position: 12,
        whiteAthlet: { firstname: 'Herinavalona', lastname: 'Ranarivola' },
        blueAthlet: { firstname: 'John', lastname: 'Doe' },
        winnerAthlet: null,
      },
    ],
  },
  {
    round: 3,
    matches: [
      {
        id: 1,
        position: 13,
        whiteAthlet: { firstname: 'Herinavalona', lastname: 'Ranarivola' },
        blueAthlet: { firstname: 'John', lastname: 'Doe' },
        winnerAthlet: null,
      },
      {
        id: 2,
        position: 14,
        whiteAthlet: { firstname: 'Herinavalona', lastname: 'Ranarivola' },
        blueAthlet: { firstname: 'John', lastname: 'Doe' },
        winnerAthlet: null,
      },
    ],
  },
  {
    round: 4,
    matches: [
      {
        id: 1,
        position: 15,
        whiteAthlet: { firstname: 'Herinavalona', lastname: 'Ranarivola' },
        blueAthlet: { firstname: 'John', lastname: 'Doe' },
        winnerAthlet: null,
      },
    ],
  },
]

const BracketGenerationPage = ({ searchParams, params }: any) => {
  return (
    <div>
      <BracketTree rounds={rounds} />
    </div>
  )
}

export default BracketGenerationPage
