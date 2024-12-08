import { MatchEntity } from '@/types/model/Match'
import prisma from '@/lib/prisma'

export async function getNextMatch(competition: string): Promise<MatchEntity> {
  const match = await prisma.match.findFirst({
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
  return match as MatchEntity
}
