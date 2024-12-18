'use server'
import { Stage } from '@/types/model/Stage'
import { StageConfig } from '@prisma/client'
import { StageUtils } from './bracket/StageUtils'
import { MatchGenerator } from './bracket/MatchGenerator'
import { GeneratorFactory } from './bracket/GeneratorFactory'
import { AthletEntity } from '@/types/model/athlet'
import getDelegationList from '../delegation/get-delegation-list'
import { MatchEntity } from '@/types/model/Match'
import prisma from '@/lib/prisma'
import { FullKnockout } from './bracket/FullKnockout'
import { BracketEntity } from '@/types/model/Bracket'

export async function saveDrawConfig(
  competition: string,
  weightCategory: string,
  data: any
): Promise<StageConfig> {
  console.log('config to save', data)
  let config = await prisma.stageConfig.upsert({
    where: {
      competition_weightCategory: {
        competition: competition,
        weightCategory: weightCategory,
      },
    },
    create: {
      competition,
      weightCategory,
      configData: data,
    },
    update: {
      configData: data,
    },
  })

  // start bracket generation service
  // setTimeout is used to simulated async (background) task
  setTimeout(async () => {
    console.log('starting draw generation.....')
    const stageData: Stage[] = data as Stage[]
    const isSingleStage: boolean = StageUtils.isSingleStage(stageData)
    const athlets: Array<Partial<AthletEntity>> = await getDelegationList({
      competition,
      category: weightCategory,
    })
    console.log('Config ', stageData)
    try {
      if (isSingleStage) {
        console.log('Single Stage detected !!!, start draw')
        const matchGenerator: MatchGenerator = GeneratorFactory.createBracket(
          stageData[0].format!!,
          athlets
        )
        const matchBracket: MatchEntity[] = matchGenerator.generate()
        // console.log(matchBracket.map(m => m.position))
        prisma.$transaction(
          matchBracket.map(bracket =>
            prisma.match.create({
              data: {
                whiteAthletId: bracket.whiteAthlet!!.id!!,
                blueAthletId: bracket.blueAthlet?.id,
                winnerAthletId: bracket.winnerAthlet?.id,
                position: bracket.position,
                stageConfigId: config.id,
                round: bracket.round, // Draw generates first round
              },
            })
          )
        )
        console.log('Draw finished !!!')
      } else {
        throw Error('Custom format is not supported yet!')
      }
    } catch (e) {
      console.log('Error', e)
    }
  }, 250)
  return config
}
