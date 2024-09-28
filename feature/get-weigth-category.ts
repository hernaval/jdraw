import prisma from '@/lib/prisma'
import { WeightCategoryEntity } from '@/types/model/WeightCategory'

export const getWeighCategory = async (): Promise<WeightCategoryEntity[]> => {
  const weights = await prisma.weightCategory.findMany({
    orderBy: { label: 'asc' },
  })
  weights.sort((a, b) => Math.abs(Number(a.label)) - Math.abs(Number(b.label)))

  return [
    ...weights.filter(w => w.sex == 'F'),
    ...weights.filter(w => w.sex == 'M'),
  ]
}
