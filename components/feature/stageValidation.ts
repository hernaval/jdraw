import { sum } from '@/lib/math'
import { Stage } from '@/types/model/Stage'

function someAthletNotPresentNonFinalStage(
  stages: Stage[],
  athletsCount: number
): boolean {
  const eliminationStages: Stage[] = stages.filter(s => !s.isFinal)

  return (
    sum(eliminationStages.map(s => Number(s.nbParticipants))) != athletsCount
  )
}

function customFormatOnlyOneStage(stages: Stage[]): boolean {
  return stages.length == 1
}

function customFormatWithNoFinalStage(stages: Stage[]): boolean {
  return stages.every(s => !s.isFinal)
}

function someStagesAfterAFinalStageNotFinal(stages: Stage[]): boolean {
  const firstFinalStageIdx = stages.findIndex(s => s.isFinal)
  let subArr: Stage[] = stages.slice(firstFinalStageIdx)

  return subArr.find(s => !s.isFinal) != undefined
}

export default {
  someAthletNotPresentNonFinalStage,
  customFormatOnlyOneStage,
  customFormatWithNoFinalStage,
  someStagesAfterAFinalStageNotFinal,
}
