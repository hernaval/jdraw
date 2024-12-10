'use server'
import prisma from '@/lib/prisma'
import { Match } from '@prisma/client'
import next from 'next'
export async function setWinner(
  matchId: number,
  winnerAthletId: number
): Promise<void> {
  const currentMatch: Match | null = await prisma.match.findUnique({
    where: {
      id: matchId,
    },
  })
  if (!currentMatch) throw Error(`Match with id ${matchId} is not found`)

  // match already created, white athlet already assigned, add blue athlet
  if (currentMatch.nextMatchId !== null) {
    await prisma.match.update({
      where: {
        id: currentMatch.nextMatchId,
      },
      data: {
        blueAthletId: winnerAthletId,
        finished: true,
      },
    })
    return
  }
  // create next match
  const nextPos = Math.ceil(currentMatch.position + currentMatch.round!! / 2)
  const nextMatch = await prisma.match.create({
    data: {
      position: nextPos,
      whiteAthletId: winnerAthletId,
      blueAthletId: null,
      round: currentMatch.round!! / 2,
      stageConfigId: currentMatch.stageConfigId,
      nextMatchId: null,
      finished: false,
    },
  })

  //update current match winner
  await prisma.match.update({
    where: {
      id: matchId,
    },
    data: {
      ...currentMatch,
      nextMatchId: nextMatch.id,
      finished: true,
    },
  })
}
