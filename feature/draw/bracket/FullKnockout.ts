import { BracketEntity } from '@/types/model/Bracket'
import { TournamentBracket } from './TournamentBracket'
import { MatchEntity } from '@/types/model/Match'

export class FullKnockout implements TournamentBracket {
  private matches: MatchEntity[]

  constructor(matches: MatchEntity[]) {
    this.matches = matches
  }
  generate(): BracketEntity[] {
    const brackets = this.matchToBrackets()
    const remainingRounds = this.getRemainingRounds()
    for (let i = 1; i <= remainingRounds; i++) {
      const lastBrackets = brackets[brackets.length - 1]
      const currentRound = lastBrackets.round / 2
      brackets.push({
        round: currentRound,
        matches: Array.from(
          { length: lastBrackets.matches.length / 2 },
          (v, k) => ({
            round: currentRound,
            position: 9 + k,
            whiteAthlet: null,
            blueAthlet: null,
            winnerAthlet: null,
            stageConfig: {
              id: 1,
              competition: '',
              configData: '',
              weightCategory: '',
              generated: false,
            },
            finished: false,
          })
        ),
      })
    }
    return brackets
  }

  matchToBrackets(): BracketEntity[] {
    const bracket: BracketEntity[] = []
    this.matches.forEach((match, i) => {
      let currentRound = bracket.find(b => b.round == match.round)
      if (currentRound == undefined) {
        currentRound = { round: match.round!!, matches: [] }
        bracket.push(currentRound)
      }
      currentRound?.matches.push(match)
    })
    return bracket
  }
  getTotalRounds() {
    return Math.log2(this.matchToBrackets()[0].matches.length) + 1 //+1 is final match
  }
  private getRemainingRounds() {
    return this.getTotalRounds() - this.matchToBrackets().length
  }
}
