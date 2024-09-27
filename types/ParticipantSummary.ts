export interface ParticipantSummary {
  clubs: Clubs[]
  categories: number[]
  overall: number
}

interface Clubs {
  name: string
  participants: number[]
  total: number
}
