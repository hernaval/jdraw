import { MatchEntity } from '@/types/model/Match'
import prisma from '@/lib/prisma'
import { setWinner } from './set-winner'

export async function getNextMatch(competition: string): Promise<MatchEntity> {
  console.log('get next match for in', competition)
  const match = await prisma.match.findFirst({
    orderBy: [{ round: 'desc' }, { position: 'asc' }],
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
  // if match byes match, do the update get next match
  if (match && match.blueAthlet == null && !match.finished) {
    console.log(`find bye match with id ${match.id}, auto create next match`)
    await setWinner(match.id, match.whiteAthlet.id)
    return getNextMatch(competition)
  }
  return match as MatchEntity
}
