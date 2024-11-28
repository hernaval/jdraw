import { MatchEntity } from '@/types/model/Match'

export interface TournamentDraw {
  generate(): MatchEntity[]
}
