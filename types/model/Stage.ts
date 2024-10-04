import { DrawFormatEnum } from './draw-format'

export interface Stage {
  id: number
  name?: string
  isFinal: boolean
  type?: DrawFormatEnum
  nbParticipants?: number
}
