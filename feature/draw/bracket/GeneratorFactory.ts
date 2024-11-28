import { AthletEntity } from '@/types/model/athlet'
import { DrawFormatEnum } from '@/types/model/draw-format'
import { SingleElimination } from './SingleElimination'
import { ELIMINATION_PHASE, ROUND_ROBIN_PHASE } from '@/lib/constants'

export class GeneratorFactory {
  static createBracket(
    format: DrawFormatEnum | string,
    athlets: Array<Partial<AthletEntity>>
  ) {
    switch (format) {
      case DrawFormatEnum.ELIMINATION || ELIMINATION_PHASE:
        return new SingleElimination(athlets)
      case DrawFormatEnum.ROUND_ROBIN || ROUND_ROBIN_PHASE:
        // TODO
        throw Error('Unsupported format!')
      default:
        throw Error('Unsupported format!')
    }
  }
}
