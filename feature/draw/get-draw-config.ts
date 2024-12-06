import { StageConfig } from '@prisma/client'
import prisma from '@/lib/prisma'

export async function getDrawConfig(
  competition: string,
  category: string
): Promise<StageConfig | null> {
  return await prisma.stageConfig.findUnique({
    where: {
      competition_weightCategory: {
        competition,
        weightCategory: category,
      },
    },
  })
}
