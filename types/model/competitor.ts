import { AthletEntity } from './athlet'

export interface CompetitorMatch {
  position: number
  judogi: 'whiteAthlet' | 'blueAthlet'
}

export type Competitor = AthletEntity & CompetitorMatch
