import { CompetitionEntity } from '@/types/model/competition'
import prisma from '@/lib/prisma'

export async function getCompetitions(): Promise<CompetitionEntity[]> {
  const compets = await prisma.competition.findMany()

  return compets.map(c => ({ ...c }))
}
