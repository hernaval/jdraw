import { AthletEntity } from './athlet'

export interface MatchEntity {
  id: number
  position: number
  round: number
  whiteAthlet?: AthletEntity
  blueAthlet?: AthletEntity
  whitePlaceholder: string
  bluePlaceholder: string
  nextMatchId?: number
  winnerAthlet: AthletEntity | null
  orderNo?: number
}
