import { DrawFormatEnum } from './draw-format'
import { StageRankedGroup } from './StageRankedGroup'

export interface Stage {
  id?: number
  name?: string
  isFinal: boolean
  format?: DrawFormatEnum | string
  nbParticipants: number
  rankedParticipants?: StageRankedGroup
}
