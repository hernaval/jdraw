import { StageConfig } from '@prisma/client'
import { AthletEntity } from './athlet'

export interface MatchEntity {
  id?: number
  position: number
  round?: number
  whiteAthlet: Partial<AthletEntity> | null
  blueAthlet: Partial<AthletEntity> | null
  whitePlaceholder?: string
  bluePlaceholder?: string
  nextMatchId?: number
  winnerAthlet: Partial<AthletEntity> | null
  stageConfig?: StageConfig
  finished: boolean
}
