import { AthletEntity } from './athlet'

export interface MatchEntity {
  id: number
  position: number
  round?: number
  whiteAthlet?: Partial<AthletEntity>
  blueAthlet?: Partial<AthletEntity>
  whitePlaceholder?: string
  bluePlaceholder?: string
  nextMatchId?: number
  winnerAthlet: AthletEntity | null
  orderNo?: number
}
