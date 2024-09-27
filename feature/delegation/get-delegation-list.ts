import { AthletEntity } from '@/types/model/athlet'

export default async function getDelegationList(query?: {
  club?: string
  category?: string
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
    },
  })

  return athlets.map(a => ({ ...a }))
}
