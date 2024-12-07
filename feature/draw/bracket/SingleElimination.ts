import { MatchEntity } from '@/types/model/Match'
import { MatchGenerator } from './MatchGenerator'
import { fillArrayAlt, shuffleArray } from '@/lib/utils'

export class SingleElimination extends MatchGenerator {
  generate(): MatchEntity[] {
    const N = this.athlets.length
    if (N < 2) {
      throw Error('SingleElimination must have at least 2 athlets')
    }
    // total slots as the next power of 2 of N
    const totalSlots = Math.pow(2, Math.ceil(Math.log2(N)))
    const byes = totalSlots - N
    // total athets can be paired
    const pairs = N - byes
    console.log('Draw params ', N, totalSlots, byes, pairs)
    // shuffles athlets to draw in a random mode
    const competitors = shuffleArray(this.athlets)

    const byesMatches: MatchEntity[] = []
    const pairedMatches: MatchEntity[] = []
    for (let i = 0; i < byes; i++) {
      byesMatches.push({
        position: i,
        whiteAthlet: competitors[i],
        blueAthlet: null,
        winnerAthlet: competitors[i],
        finished: false,
        competition: '',
        weightCategory: '',
      })
    }
    for (let i = byes; i < N; i += 2) {
      pairedMatches.push({
        position: byes + i,
        whiteAthlet: competitors[i],
        blueAthlet: competitors[i + 1] || null,
        finished: false,
        competition: '',
        weightCategory: '',
        winnerAthlet: null,
      })
    }

    // distribute paired athlets to balanced the bracket
    const totalMatches: number = byesMatches.length + pairedMatches.length
    const totalTopMatchTableCount: number = totalMatches / 2
    const matchBracket: MatchEntity[] = new Array(totalMatches).fill(null)
    // put paired athlets alternatively in top and bottom
    fillArrayAlt(
      matchBracket,
      pairedMatches.slice(0, pairedMatches.length / 2),
      0,
      totalTopMatchTableCount - 1
    )
    fillArrayAlt(
      matchBracket,
      pairedMatches.slice(pairedMatches.length / 2, pairedMatches.length),
      totalTopMatchTableCount,
      totalMatches - 1
    )

    // fill empty match with byes
    // put match order number
    let i = 0
    matchBracket.forEach((b, index) => {
      if (!matchBracket[index]) {
        matchBracket[index] = byesMatches[i++]
      }
      matchBracket[index].position = index + 1 // skip 0
    })

    return matchBracket
  }
}
