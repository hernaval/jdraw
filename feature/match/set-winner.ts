'use server'
import prisma from '@/lib/prisma'
export async function setWinner(
  matchId: number,
  round: number,
  winnerAthletId: number
): Promise<void> {
  await prisma.match.update({
    data: {
      winnerAthletId,
    },
    where: {
      id: matchId,
    },
  })
  // next next match
}
