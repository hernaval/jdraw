import DrawFormatSelector from '@/components/block/draw-format-selector'
import getDelegationList from '@/feature/delegation/get-delegation-list'
import { AthletEntity } from '@/types/model/athlet'
import React, { Suspense } from 'react'

const DrawFormatPage = async ({ searchParams, params }: any) => {
  const competition = params.name
  const athlets: AthletEntity[] = await getDelegationList({
    category: searchParams.category,
    competition: competition,
  })

  return (
    <div className='mt-8'>
      <h2 className='text-xl'>Catégorie {searchParams.category}kg</h2>
      <p>{athlets.length} athlètes </p>

      <Suspense fallback='loading...'>
        <DrawFormatSelector athletsCount={athlets.length} />
      </Suspense>
    </div>
  )
}

export default DrawFormatPage
