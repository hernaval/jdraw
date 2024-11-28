import { FullKnockout } from '@/feature/draw/bracket/FullKnockout'
import { sum } from '@/lib/math'
import { BracketEntity } from '@/types/model/Bracket'
import { MatchEntity } from '@/types/model/Match'

describe('Full bracket of a Single Elimination knockout generation', () => {
  it('should get correct total round', () => {
    const roundOne: MatchEntity[] = matchBuilder(8, 1)
    const roundTwo: MatchEntity[] = matchBuilder(4, 2)
    const match: MatchEntity[] = [...roundOne, ...roundTwo]
    const generator = new FullKnockout(match)
    const totalRounds = generator.getTotalRounds()
    expect(totalRounds).toBe(4)
  })

  it('all round is generated', () => {
    const roundOne: MatchEntity[] = matchBuilder(8, 1)
    const roundTwo: MatchEntity[] = matchBuilder(4, 2)
    const match: MatchEntity[] = [...roundOne, ...roundTwo]
    const generator = new FullKnockout(match)
    const fullBracket = generator.generate()
    expect(fullBracket.length).toBe(4)
    expect(sum(fullBracket.map(f => f.round))).toBe(10)
  })
})

const matchBuilder = (length: number, round: number) =>
  Array.from({ length }, (v, k) => ({
    round,
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
  }))
