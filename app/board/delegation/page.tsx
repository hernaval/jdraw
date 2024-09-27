import AthletCard from '@/components/block/athlet-card'
import Filter from '@/components/block/filter'
import getDelegationList from '@/feature/delegation/get-delegation-list'
import { getClub } from '@/feature/get-club'
import { getWeighCategory } from '@/feature/get-weigth-category'
import { mapObSelect } from '@/lib/utils'
import { FilterSelect } from '@/types/FilterSelect'
import { AthletEntity } from '@/types/model/athlet'
import { ClubEntity } from '@/types/model/Club'
import { WeightCategoryEntity } from '@/types/model/WeightCategory'
import React, { Suspense } from 'react'

const DelegationList = async ({ searchParams }: any) => {
  const clubs: ClubEntity[] = await getClub()
  const weights: WeightCategoryEntity[] = await getWeighCategory()
  const filters: FilterSelect[] = [
    {
      key: 'club',
      label: 'Choisir un club',
      data: mapObSelect(clubs, 'id', 'name', 'name'),
    },
    {
      key: 'category',
      label: 'Choisir une catégorie',
      data: mapObSelect(weights, 'id', 'label', 'label'),
    },
  ]

  const athlets: AthletEntity[] = await getDelegationList({
    club: searchParams.club,
    category: searchParams.category,
  })
  return (
    <div className='mt-6'>
      <Suspense fallback='Loading...'>
        <Filter title='Filtre' filters={filters} />
      </Suspense>

      <section className='mt-8'>
        <h1 className='text-2xl'>Athlète</h1>
        <p className='text-primary'>31 athlètes / 15 clubs</p>
        <div className='flex flex-col md:flex-row mt-10'>
          <div className='flex-1 grid grid-cols-1 gap-1 md:gap-4 md:grid-cols-2'>
            {athlets.map((a: AthletEntity) => (
              <AthletCard athlet={a} key={a.id} />
            ))}
          </div>
          <div className='w-[700px]'>
            <h2>Summary</h2>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DelegationList
