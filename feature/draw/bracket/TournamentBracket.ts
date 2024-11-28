import { BracketEntity } from '@/types/model/Bracket'

export interface TournamentBracket {
  generate(): BracketEntity[]
}
