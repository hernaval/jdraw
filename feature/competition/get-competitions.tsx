import { CompetitionEntity } from '@/types/model/competition'

export async function getCompetitions(): Promise<CompetitionEntity[]> {
  const compets = await prisma.competition.findMany()

  return compets.map(c => ({ ...c }))
}
