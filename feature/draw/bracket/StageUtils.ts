import { Stage } from '@/types/model/Stage'

export class StageUtils {
  static isSingleStage(stages: Stage[]): boolean {
    return stages.length === 1
  }
}
