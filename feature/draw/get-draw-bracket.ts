import { BracketEntity } from '@/types/model/Bracket'
import { MatchEntity } from '@/types/model/Match'
import { FullKnockout } from './bracket/FullKnockout'
import { Match } from '@prisma/client'

export async function getDrawBracket(
  competition: string,
  category: string
): Promise<BracketEntity[]> {
  const matches = await prisma.match.findMany({
    where: {
      stageConfig: {
        weightCategory: category,
        competition,
      },
    },
    include: {
      blueAthlet: true,
      whiteAthlet: true,
      winnerAthlet: true,
    },
  })
  const generator = new FullKnockout(matches as MatchEntity[])

  return generator.generate()
}
