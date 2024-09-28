export interface ParticipantSummary {
  clubs: Clubs[]
  categories: number[]
  overall: number
}

export interface Clubs {
  name: string
  participants: number[]
  total: number
}
