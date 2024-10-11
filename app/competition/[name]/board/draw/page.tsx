import AthletCard from '@/components/block/athlet-card'
import Filter from '@/components/block/filter'
import { Button } from '@/components/ui/button'
import getDelegationList from '@/feature/delegation/get-delegation-list'
import { getWeighCategory } from '@/feature/get-weigth-category'
import { mapObSelect } from '@/lib/utils'
import { FilterSelect } from '@/types/FilterSelect'
import { AthletEntity } from '@/types/model/athlet'
import { WeightCategoryEntity } from '@/types/model/WeightCategory'
import { Settings } from 'lucide-react'
import Link from 'next/link'
import React, { Suspense } from 'react'

const DrawList = async ({ searchParams, params }: any) => {
  const competition = params.name
  const weights: WeightCategoryEntity[] = await getWeighCategory()
  const filters: FilterSelect[] = [
    {
      key: 'category',
      label: 'Choisir une catégorie',
      data: mapObSelect(weights, 'id', 'label', 'label', 'sex'),
      groupable: true,
    },
  ]

  const athlets: AthletEntity[] = await getDelegationList({
    category: searchParams.category,
    competition: competition,
  })

  const countClub = new Set(athlets.map(a => a.club.id)).size
  return (
    <div>
      <Suspense fallback='Loading...'>
        <div className='flex justify-between'>
          <Filter title='Filtre' filters={filters} />
          <Link
            href={`/competition/${competition}/board/draw/${searchParams.category}/format`}>
            <Button
              disabled={searchParams.category == undefined}
              className='gap-2'>
              <Settings /> Configurer le tirage
            </Button>
          </Link>
        </div>
      </Suspense>

      <div className='mt-8'>
        <h2 className='text-xl'>Catégorie {searchParams.category}kg</h2>
        <p>
          {athlets.length} athlètes / {countClub} clubs
        </p>
        <div className='flex-1 grid grid-cols-1 gap-1 md:gap-4 md:grid-cols-4 mt-8'>
          {athlets.map((a: AthletEntity) => (
            <AthletCard athlet={a} key={a.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DrawList
