import { SingleElimination } from '@/feature/draw/bracket/SingleElimination'
import { MatchEntity } from '@/types/model/Match'
import { Athlet } from '@prisma/client'

describe('Single Elimination match generation', () => {
  it('has correct match number', () => {
    const athlets: Array<Partial<Athlet>> = athletBuilder(10)
    const generator = new SingleElimination(athlets)
    const matches: MatchEntity[] = generator.generate()

    expect(matches.length).toBe(8)
  })
  it('all athlets have opponent when number of participants is power of 2', () => {
    const athlets: Array<Partial<Athlet>> = athletBuilder(16)
    const generator = new SingleElimination(athlets)
    const matches: MatchEntity[] = generator.generate()

    expect(matches.length).toBe(8)
    expect(
      matches.filter(m => m.blueAthlet == null && m.whiteAthlet == null).length
    ).toBe(0)
  })
  it.each([
    { totalAthlets: 11, expectedByes: 5 },
    { totalAthlets: 10, expectedByes: 6 },
    { totalAthlets: 21, expectedByes: 11 },
  ])('.generate(%i, %i)', ({ totalAthlets, expectedByes }) => {
    const athlets: Array<Partial<Athlet>> = athletBuilder(Number(totalAthlets))
    const generator = new SingleElimination(athlets)
    const matches: MatchEntity[] = generator.generate()

    expect(matches.filter(m => m.blueAthlet == null).length).toBe(
      Number(expectedByes)
    )
  })
})

const athletBuilder = (length: number) =>
  Array.from({ length }, (_, index) => ({
    firstname: `Athlet-${index}`,
    lastname: '',
    id: index,
  }))
