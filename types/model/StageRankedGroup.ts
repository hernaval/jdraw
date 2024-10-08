export interface StageRankedGroup {
  stageId: number
  rankingFromStage: StageFrom[]
}

export interface StageFrom {
  id: number
  selected: Array<string>
}
