'use server'
import prisma from '@/lib/prisma'
import { Stage } from '@/types/model/Stage'
import { Match } from '@prisma/client'
import next from 'next'
export async function setWinner(
  matchId: number,
  winnerAthletId: number
): Promise<void> {
  const currentMatch = await prisma.match.findFirst({
    where: {
      id: matchId,
    },
    include: {
      stageConfig: true,
      whiteAthlet: true,
    },
  })
  if (!currentMatch) throw Error(`Match with id ${matchId} is not found`)

  const stageConfig: any = currentMatch.stageConfig.configData
  if (!stageConfig)
    throw Error(
      `SEVERE: stage is not configured well. Fix it before continuing`
    )
  const nextPos = Math.ceil(
    (Math.pow(2, Math.ceil(Math.log2(stageConfig[0].nbParticipants))) +
      currentMatch.position) /
      2
  )
  let nextMatch: Match | null = await prisma.match.findFirst({
    where: {
      stageConfigId: currentMatch.stageConfigId,
      position: nextPos,
    },
  })
  // match already created, white athlet already assigned, add blue athlet
  if (nextMatch) {
    console.log(`next match already created with id ${nextMatch.id}`)
    await prisma.match.update({
      where: {
        id: nextMatch.id,
      },
      data: {
        blueAthletId: winnerAthletId,
        finished: false,
      },
    })
  } else {
    // create next match
    console.log('create next match')
    nextMatch = await prisma.match.create({
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
  }
  //update current match winner
  await prisma.match.update({
    where: {
      id: matchId,
    },
    data: {
      // ...currentMatch,
      nextMatchId: nextMatch.id,
      finished: true,
      winnerAthletId,
    },
  })
}
