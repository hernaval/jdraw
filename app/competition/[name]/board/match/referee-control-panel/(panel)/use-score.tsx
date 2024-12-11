import { Scoreboard } from '@/types/model/Scoreboard'
import { produce } from 'immer'
import { useState } from 'react'

const useScore = (scoring: Scoreboard) => {
  const [scores, setScores] = useState<Scoreboard>(scoring)
  const giveIppon = (player: string) => {
    if (player == '') throw Error('Player to be scored must be specified')
    setScores(
      produce(scores, draft => {
        draft[scoringKey(player)].score.ippon = true
      })
    )
  }
  const removeIppon = (player: string) => {
    if (player == '') throw Error('Player to be scored must be specified')
    setScores(
      produce(scores, draft => {
        draft[scoringKey(player)].score.ippon = false
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
  const removeWazari = (player: string) => {
    if (player == '') throw Error('Player to be scored must be specified')
    setScores(
      produce(scores, draft => {
        if (
          scores[scoringKey(player)].score.wazari == 1 &&
          scores[scoringKey(player)].score.ippon
        ) {
          draft[scoringKey(player)].score.ippon = false
        }
        draft[scoringKey(player)].score.wazari =
          scores[scoringKey(player)].score.wazari == 1 &&
          scores[scoringKey(player)].score.ippon
            ? 1
            : 0
      })
    )
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

  const removeShido = (player: string) => {
    if (player == '') throw Error('Player to be penalized must be specified')
    if (scores[scoringKey(player)].score.shido > 0) {
      setScores(
        produce(scores, draft => {
          const updatedShido = --draft[scoringKey(player)].score.shido
          draft[scoringKey(opponentPlayer(player))].score.ippon = false
        })
      )
    }
  }

  const winner = (
    timeLeft: number,
    score: Scoreboard
  ): 'whitePlayer' | 'bluePlayer' | null => {
    // search ippon
    if (score.whitePlayer.score.ippon && score.bluePlayer.score.ippon) {
      throw Error('Only one player can win by ippon')
    }
    if (score.whitePlayer.score.ippon) return 'whitePlayer'
    if (score.bluePlayer.score.ippon) return 'bluePlayer'

    // check timeLeft and search wazari
    if (
      score.whitePlayer.score.wazari == 1 &&
      score.bluePlayer.score.wazari == 0 &&
      timeLeft == 0
    )
      return 'whitePlayer'

    if (
      score.bluePlayer.score.wazari == 1 &&
      score.whitePlayer.score.wazari == 0 &&
      timeLeft == 0
    )
      return 'bluePlayer'
    return null
  }

  const scoringKey = (player: string) =>
    player == 'white' ? 'whitePlayer' : 'bluePlayer'
  const opponentPlayer = (player: string) =>
    player == 'white' ? 'blue' : 'white'
  return {
    giveIppon,
    giveWazari,
    giveShido,
    removeShido,
    removeIppon,
    removeWazari,
    scores,
    winner,
  }
}

export default useScore
