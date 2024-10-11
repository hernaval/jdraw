import DrawFormatSelector from '@/components/block/draw-format-selector'
import getDelegationList from '@/feature/delegation/get-delegation-list'
import { AthletEntity } from '@/types/model/athlet'
import React, { Suspense } from 'react'

const DrawFormatPage = async ({ searchParams, params }: any) => {
  const competition = params.name
  console.log(params)
  const athlets: AthletEntity[] = await getDelegationList({
    category: params.category,
    competition: competition,
  })

  return (
    <div className='mt-8'>
      <h2 className='text-xl'>Catégorie {params.category}kg</h2>
      <p>{athlets.length} athlètes </p>

      <Suspense fallback='loading...'>
        <DrawFormatSelector
          athletsCount={athlets.length}
          category={params.category}
          competition={competition}
        />
      </Suspense>
    </div>
  )
}

export default DrawFormatPage
