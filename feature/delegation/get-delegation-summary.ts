import { sum } from '@/lib/math'
import { ParticipantSummary, Clubs } from '@/types/ParticipantSummary'
import { getWeighCategory } from '../get-weigth-category'

export async function getDelegationSummary(): Promise<ParticipantSummary> {
  const clubs = await prisma.club.findMany()
  const athlets = await prisma.athlet.findMany()
  const weights = await getWeighCategory()

  const clubSummary: Clubs[] = []
  clubs.forEach(c => {
    const participants: number[] = []
    weights.forEach(w => {
      participants.push(
        athlets.filter(a => a.weight == w.label && a.clubId == c.id).length
      )
    })
    clubSummary.push({ name: c.name, participants, total: sum(participants) })
  })
  const weightParticipants: number[][] = clubSummary.map(c => c.participants)
  const categoriesSummary: number[] = weightParticipants[0].map((_, i) => {
    return weightParticipants.reduce((s, currentArr) => s + currentArr[i], 0)
  })
  const total = weightParticipants.reduce((s, currentArr) => {
    return s + currentArr.reduce((ss, t) => ss + t, 0)
  }, 0)
  return { clubs: clubSummary, categories: categoriesSummary, overall: total }
}
