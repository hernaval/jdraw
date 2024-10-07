import { StageFrom, StageRankedGroup } from '@/types/model/StageRankedGroup'
import { SelectBoxData } from '@/types/SelectBoxData'
import { create } from 'zustand'
import { produce } from 'immer'

type StageRankedState = {
  selected: StageRankedGroup[]
  add: (stageId: number, group: number, data: SelectBoxData) => void
  has: (data: SelectBoxData) => boolean
  belongsTo: (stageId: number, data: SelectBoxData) => boolean
}

export const useStageStore = create<StageRankedState>()((set, get) => ({
  selected: [],
  add: (stageId, group, data) =>
    set(state => {
      const { selected } = state
      const currentStage = selected.findIndex(s => s.stageId == stageId)

      if (currentStage == -1) {
        console.log('add for stage')
        return produce(state, draft => {
          draft.selected.push({
            stageId,
            rankingFromStage: [{ id: group, selected: [data.value] }],
          })
        })
      }

      const currentGroup = selected[currentStage].rankingFromStage.findIndex(
        s => s.id == group
      )
      if (currentGroup == -1) {
        console.log('add for group')
        return produce(state, draft => {
          draft.selected[currentStage].rankingFromStage.push({
            id: group,
            selected: [data.value],
          })
        })
      }

      console.log('add direct')
      const currentRanking = selected[currentStage].rankingFromStage[
        currentGroup
      ].selected.findIndex(v => v === data.value)
      // remove value from list if already exist
      if (currentRanking !== -1) {
        return produce(state, draft => {
          draft.selected[currentStage].rankingFromStage[
            currentGroup
          ].selected.splice(currentRanking, 1)
        })
      } else {
        return produce(state, draft => {
          draft.selected[currentStage].rankingFromStage[
            currentGroup
          ].selected.push(data.value)
        })
      }
    }),
  has: (data: SelectBoxData) => {
    const { selected } = get()
    const rankingFromStage: StageFrom[][] = selected.map(
      s => s.rankingFromStage
    )
    for (const group of rankingFromStage) {
      // Find the rankingFromStage entry where the id matches
      const ranking = group.find(r => r.id === Number(data.group))
      if (ranking) {
        // Check if the selected array contains the rankValue
        return ranking.selected.includes(data.value)
      }
    }
    return false
  },
  belongsTo: (stageId, data) => {
    console.log('to check', stageId, data.group, data.value)
    const { selected } = get()

    const rankingFromStage: StageRankedGroup[] = selected
      .map(stage => ({
        ...stage,
        rankingFromStage: stage.rankingFromStage.filter(
          r => r.id == Number(data.group!) && r.selected.includes(data.value)
        ),
      }))
      .filter(s => s.rankingFromStage.length > 0)

    console.log('here is my belongs', rankingFromStage)
    return rankingFromStage.find(r => r.stageId == stageId) != undefined
  },
}))
