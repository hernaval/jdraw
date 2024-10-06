export interface StageRankedGroup {
  stageId: number
  rankingFromStage: StageFrom[]
}

interface StageFrom {
  id: number
  selected: Array<string>
}
