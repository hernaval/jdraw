import prisma from '@/lib/prisma'
import { WeightCategoryEntity } from '@/types/model/WeightCategory'

export const getWeighCategory = async (): Promise<WeightCategoryEntity[]> => {
  const weights = await prisma.weightCategory.findMany({
    orderBy: { label: 'asc' },
  })
  return weights.map(c => ({ id: c.id, label: c.label }))
}
