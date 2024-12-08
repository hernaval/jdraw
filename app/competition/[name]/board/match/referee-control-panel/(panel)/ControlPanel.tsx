'use client'
import { Score, Scoreboard } from '@/types/model/Scoreboard'
import React, { useEffect, useState } from 'react'
import AthletPanel from './AthletPanel'
import MatchPanel from './MatchPanel'
import Keyboard from '@/components/block/Keyboard'
import { Card } from '@/components/ui/card'
import useKeyboardListener from '@/hooks/use-keyboard-listener'
import useTimer from '@/hooks/use-timer'
import { formatTimeAs } from '@/lib/date'
import { produce } from 'immer'
import useScore from './use-score'

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
  scoring: Scoreboard
  roundName: string
}
const ControlPanel: React.FC<ControlPanelProps> = ({ scoring, roundName }) => {
  const { timeLeft, playOrPause, isPaused } = useTimer(4 * 60) // 4 minutes
  const {
    giveIppon,
    giveWazari,
    giveShido,
    removeShido,
    removeWazari,
    removeIppon,
    scores,
  } = useScore(scoring)
  const scoreCommand = (
    judogiColor: 'white' | 'blue',
    { ippon, cancel }: { ippon?: boolean; cancel?: boolean } = {
      ippon: false,
      cancel: false,
    }
    // { cancel }: { cancel: boolean } = { cancel: false }
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

  useKeyboardListener({
    Enter: () => {},
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
  })
  return (
    <div>
      <Card className='w-full p-2'>
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
        />
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
