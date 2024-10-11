import { StageConfig } from '@prisma/client'

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
