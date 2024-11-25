import { MatchEntity } from '@/types/model/Match'

export interface TournamentBracket {
  generate(): MatchEntity[]
}
