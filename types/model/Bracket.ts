import { MatchEntity } from './Match'

export interface BracketEntity {
  round: number
  matches: MatchEntity[]
}
