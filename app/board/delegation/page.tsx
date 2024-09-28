import AthletCard from '@/components/block/athlet-card'
import DoubleTable from '@/components/block/double-table'
import Filter from '@/components/block/filter'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import getDelegationList from '@/feature/delegation/get-delegation-list'
import { getClub } from '@/feature/get-club'
import { getWeighCategory } from '@/feature/get-weigth-category'
import { mapObSelect } from '@/lib/utils'
import { FilterSelect } from '@/types/FilterSelect'
import { AthletEntity } from '@/types/model/athlet'
import { ClubEntity } from '@/types/model/Club'
import { WeightCategoryEntity } from '@/types/model/WeightCategory'
import { ParticipantSummary } from '@/types/ParticipantSummary'
import React, { Suspense } from 'react'

const summaries: ParticipantSummary = {
  clubs: [
    { name: 'CJC', participants: [1, 2, 3], total: 6 },
    { name: 'Barca', participants: [1, 2, 3], total: 6 },
    { name: 'Real', participants: [1, 2, 3], total: 6 },
  ],
  categories: [3, 6, 9],
  overall: 18,
}

const DelegationList = async ({ searchParams }: any) => {
  const clubs: ClubEntity[] = await getClub()
  const weights: WeightCategoryEntity[] = await getWeighCategory()
  const filters: FilterSelect[] = [
    {
      key: 'club',
      label: 'Choisir un club',
      data: mapObSelect(clubs, 'id', 'name', 'name', null),
      groupable: false,
    },
    {
      key: 'category',
      label: 'Choisir une catégorie',
      data: mapObSelect(weights, 'id', 'label', 'label', 'sex'),
      groupable: true,
    },
  ]

  const athlets: AthletEntity[] = await getDelegationList({
    club: searchParams.club,
    category: searchParams.category,
  })

  const buildSummaryHeader = (): string[] => {
    return weights.map(w => w.label)
  }
  return (
    <div className='mt-6'>
      <Suspense fallback='Loading...'>
        <Filter title='Filtre' filters={filters} />
      </Suspense>

      <section className='mt-8'>
        <h1 className='text-2xl'>Athlète</h1>
        <p className='text-primary'>31 athlètes / 15 clubs</p>
        <div className='flex flex-col gap-8 md:flex-row mt-10'>
          <div className='flex-1 grid grid-cols-1 gap-1 md:gap-4 md:grid-cols-2'>
            {athlets.map((a: AthletEntity) => (
              <AthletCard athlet={a} key={a.id} />
            ))}
          </div>
          <div className=''>
            <Card className=''>
              <CardHeader>
                <CardTitle>Participants / club / catégorie</CardTitle>
              </CardHeader>
              <CardContent>
                <DoubleTable header={buildSummaryHeader()} data={summaries} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DelegationList
