import DrawFormatSelector from '@/components/block/draw-format-selector'
import getDelegationList from '@/feature/delegation/get-delegation-list'
import { getDrawConfig } from '@/feature/draw/get-draw-config'
import { AthletEntity } from '@/types/model/athlet'
import { StageConfig } from '@prisma/client'
import React, { Suspense, useState } from 'react'

const DrawFormatPage = async ({ searchParams, params }: any) => {
  const competition = params.name
  const athlets: AthletEntity[] = await getDelegationList({
    category: params.category,
    competition: competition,
  })
  const drawConfig: StageConfig | null = await getDrawConfig(
    competition,
    params.category
  )

  return (
    <div className='mt-8'>
      <h2 className='text-xl'>Catégorie {params.category}kg</h2>
      <p>{athlets.length} athlètes </p>

      <Suspense fallback='loading...'>
        <DrawFormatSelector
          athletsCount={athlets.length}
          category={params.category}
          competition={competition}
          configDone={drawConfig != null && drawConfig.generated == true}
        />
      </Suspense>
    </div>
  )
}

export default DrawFormatPage
