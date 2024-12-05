import { Scoreboard } from '@/types/model/Scoreboard'
import { produce } from 'immer'
import { useState } from 'react'

const useScore = (scoring: Scoreboard) => {
  const [scores, setScores] = useState<Scoreboard>(scoring)
  const [triggerIppon, setTriggerIppon] = useState(null)

  const giveIppon = (player: string) => {
    if (player == '') throw Error('Player to be scored must be specified')
    setScores(
      produce(scores, draft => {
        draft[scoringKey(player)].score.ippon = true
      })
    )
  }

  const giveWazari = (player: string) => {
    if (player == '') throw Error('Player to be scored must be specified')
    if (scores[scoringKey(player)].score.wazari == 1) {
      giveIppon(player)
    } else {
      setScores(
        produce(scores, draft => {
          draft[scoringKey(player)].score.wazari = 1
        })
      )
    }
  }

  const giveShido = (player: string) => {
    if (player == '') throw Error('Player to be penalized must be specified')
    if (scores[scoringKey(player)].score.shido < 3) {
      setScores(
        produce(scores, draft => {
          const updatedShido = ++draft[scoringKey(player)].score.shido
          draft[scoringKey(opponentPlayer(player))].score.ippon =
            updatedShido === 3
        })
      )
    }
  }
  const scoringKey = (player: string) =>
    player == 'white' ? 'whitePlayer' : 'bluePlayer'
  const opponentPlayer = (player: string) =>
    player == 'white' ? 'blue' : 'white'
  return { giveIppon, giveWazari, giveShido, scores }
}

export default useScore
