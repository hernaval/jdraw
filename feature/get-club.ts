import prisma from '@/lib/prisma'
import { ClubEntity } from '@/types/model/Club'

export const getClub = async (): Promise<ClubEntity[]> => {
  const clubs = await prisma.club.findMany({
    orderBy: { name: 'asc' },
  })
  return clubs.map(c => ({ id: c.id, name: c.name }))
}
