import { MatchEntity } from './Match'

export class BracketEntity {
  round: number
  matches: MatchEntity[]

  constructor(round: number, matches: MatchEntity[]) {
    this.round = round
    this.matches = matches
  }

  static toFullSingleEliminationBracket(
    matches: MatchEntity[]
  ): BracketEntity[] {
    return []
  }
}
