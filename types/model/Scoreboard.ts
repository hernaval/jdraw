export interface Scoreboard {
  whitePlayer: Scoring
  bluePlayer: Scoring
}

export interface Scoring {
  player: Player
  score: Score
}
export interface Score {
  wazari: number
  ippon: boolean
  shido: number
}

export interface Player {
  name: string
  club: string
}
