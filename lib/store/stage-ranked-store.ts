import { SelectBoxData } from '@/types/SelectBoxData'
import { create } from 'zustand'

type StageRankedState = {
  rankedParticipants: SelectBoxData[]
  init: () => void
  remove: (data: SelectBoxData) => void
}

export const useStageStore = create<StageRankedState>()(set => ({
  rankedParticipants: [],
  init: () =>
    set(state => ({
      rankedParticipants: [{ id: 1, label: '1er', value: '1st' }],
    })),
  remove: data => {},
}))
