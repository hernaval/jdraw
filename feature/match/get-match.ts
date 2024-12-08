import { MatchEntity } from '@/types/model/Match'
import prisma from '@/lib/prisma'
import { BracketEntity } from '@/types/model/Bracket'
import { FullKnockout } from '../draw/bracket/FullKnockout'

export async function getMatch(competition: string): Promise<BracketEntity[]> {
  const matches = await prisma.match.findMany({
    orderBy: {
      round: 'desc',
    },
    where: {
      stageConfig: {
        competition,
      },
      finished: false,
    },
    include: {
      stageConfig: true,
      blueAthlet: true,
      whiteAthlet: true,
      winnerAthlet: true,
    },
  })
  const knockoutUtil = new FullKnockout(matches as MatchEntity[])
  return knockoutUtil.matchToBrackets()
}
