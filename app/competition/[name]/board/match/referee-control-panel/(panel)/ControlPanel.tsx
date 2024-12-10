'use client'
import { Scoreboard } from '@/types/model/Scoreboard'
import React, { useState } from 'react'
import AthletPanel from './AthletPanel'
import MatchPanel from './MatchPanel'
import Keyboard from '@/components/block/Keyboard'
import { Card } from '@/components/ui/card'
import useKeyboardListener from '@/hooks/use-keyboard-listener'
import useTimer from '@/hooks/use-timer'
import { formatTimeAs } from '@/lib/date'
import useScore from './use-score'
import { MatchEntity } from '@/types/model/Match'
import { AthletEntity } from '@/types/model/athlet'
import { cn } from '@/lib/utils'
import AthletWinner from './AthletWinner'
import { setWinner } from '@/feature/match/set-winner'

const whiteKeyboardLayout = [
  ['Q', 'W', 'E', 'R', 'T'],
  ['A', 'S', 'D', 'F', 'G'],
  ['Z', 'X', 'C', 'V'],
]
const blueKeyboardLayout = [
  ['Y', 'U', 'I', 'O', 'P'],
  ['H', 'J', 'K', 'L'],
  ['B', 'N', 'M'],
]

interface ControlPanelProps {
  match: MatchEntity
  roundName: string
  category: string
}
const ControlPanel: React.FC<ControlPanelProps> = ({
  roundName,
  category,
  match,
}) => {
  const { timeLeft, playOrPause, isPaused } = useTimer(4 * 60) // 4 minutes
  const scoring: Scoreboard = {
    whitePlayer: {
      player: {
        name: `${match.whiteAthlet?.firstname} ${match.whiteAthlet?.lastname}`,
        club: 'CJC',
      },
      score: {
        ippon: false,
        shido: 0,
        wazari: 0,
      },
    },
    bluePlayer: {
      player: {
        name: `${match.blueAthlet?.firstname} ${match.blueAthlet?.lastname}`,
        club: 'CJC',
      },
      score: {
        ippon: false,
        shido: 0,
        wazari: 0,
      },
    },
  }
  const {
    giveIppon,
    giveWazari,
    giveShido,
    removeShido,
    removeWazari,
    removeIppon,
    scores,
    winner,
  } = useScore(scoring)
  const [athletWinner, setAthletWinner] = useState<{
    judogiColor: string
    athlet: Partial<AthletEntity> | null
  } | null>(null)
  const scoreCommand = (
    judogiColor: 'white' | 'blue',
    { ippon, cancel }: { ippon?: boolean; cancel?: boolean } = {
      ippon: false,
      cancel: false,
    }
  ) => {
    if (cancel) {
      if (ippon) {
        removeIppon(judogiColor)
      } else {
        removeWazari(judogiColor)
      }
      return
    }
    if (ippon) {
      giveIppon(judogiColor)
    } else {
      giveWazari(judogiColor)
    }
  }

  const penaltiesCommand = (
    judogiColor: 'white' | 'blue',
    { cancel }: { cancel: boolean } = { cancel: false }
  ) => {
    if (cancel) {
      removeShido(judogiColor)
    } else {
      giveShido(judogiColor)
    }
  }

  const winnerCommand = (
    { cancel }: { cancel: boolean } = { cancel: false }
  ) => {
    if (cancel) {
      setAthletWinner(null)
      return
    }
    // get winner
    const winPlayer = winner(timeLeft, scores)
    if (winPlayer) {
      console.log('winner ', winPlayer)
      const winnerKey =
        winPlayer == 'whitePlayer' ? 'whiteAthlet' : 'blueAthlet'
      setAthletWinner({
        judogiColor: winPlayer,
        athlet: match[winnerKey],
      })
    }
  }

  const confirmWinnerCommand = async () => {
    await setWinner(match.id!!, athletWinner!!.athlet?.id!!)
  }

  useKeyboardListener({
    ' ': () => playOrPause(),
    w: () => scoreCommand('white'),
    u: () => scoreCommand('blue'),
    a: () => scoreCommand('white', { ippon: true }),
    h: () => scoreCommand('blue', { ippon: true }),
    s: () => penaltiesCommand('white'),
    j: () => penaltiesCommand('blue'),

    W: () => scoreCommand('white', { cancel: true }),
    U: () => scoreCommand('blue', { cancel: true }),
    A: () => scoreCommand('white', { ippon: true, cancel: true }),
    H: () => scoreCommand('blue', { ippon: true, cancel: true }),
    S: () => penaltiesCommand('white', { cancel: true }),
    J: () => penaltiesCommand('blue', { cancel: true }),

    v: () => winnerCommand({ cancel: athletWinner != null }),
    Enter: () => confirmWinnerCommand(),
  })
  return (
    <div>
      <Card className='w-full p-2'>
        {athletWinner ? (
          <AthletWinner
            judogiColor={athletWinner.judogiColor}
            athlet={`${athletWinner.athlet?.firstname} ${athletWinner.athlet?.lastname}`}
          />
        ) : (
          <>
            <AthletPanel
              bgColor='white'
              textColor='black'
              scoring={scores.whitePlayer}
            />
            <AthletPanel
              bgColor='blue'
              textColor='white'
              scoring={scores.bluePlayer}
            />
            <MatchPanel
              roundName={roundName}
              time={formatTimeAs(timeLeft)}
              isPaused={isPaused}
              category={category}
            />
          </>
        )}
      </Card>
      <div className='flex mt-8'>
        <Keyboard layout={whiteKeyboardLayout} />
        <Keyboard layout={blueKeyboardLayout} />
      </div>

      <div className='flex justify-between'>
        <ul>
          <li>W: wazari</li>
          <li>S: shido</li>
          <li>A: ippon</li>
          <li>D: osae-komi (not ready)</li>
          <li>v: Affichge vainqueur</li>
          <li>Entrer: Valider le vainqueur</li>
        </ul>
        <ul>
          <li>U: wazari</li>
          <li>J: shido</li>
          <li>H: ippon</li>
          <li>K: osae-komi (not ready)</li>
        </ul>
      </div>
    </div>
  )
}

export default ControlPanel
