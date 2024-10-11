'use server'
import { StageConfig } from '@prisma/client'

export async function saveDrawConfig(
  competition: string,
  weightCategory: string,
  data: any
): Promise<StageConfig> {
  console.log('config to save', data)
  let config = await prisma.stageConfig.create({
    data: {
      competition,
      weightCategory,
      configData: data,
    },
  })

  return config
}
