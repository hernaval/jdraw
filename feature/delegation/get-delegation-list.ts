import { AthletEntity } from '@/types/model/athlet'

export default async function getDelegationList(query?: {
  club?: string
  category?: string
  competition: string
}): Promise<AthletEntity[]> {
  const athlets = await prisma.athlet.findMany({
    include: {
      club: true,
    },
    where: {
      club: {
        name: query?.club,
      },
      weight: query?.category,
      competition: query?.competition,
    },
  })

  return athlets.map(a => ({ ...a }))
}
