import AthletCard from '@/components/block/athlet-card'
import AthletPerClub from '@/components/block/athlet-per-club'
import DoubleTable from '@/components/block/double-table'
import Filter from '@/components/block/filter'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import getDelegationList from '@/feature/delegation/get-delegation-list'
import { getDelegationSummary } from '@/feature/delegation/get-delegation-summary'
import { getClub } from '@/feature/get-club'
import { getWeighCategory } from '@/feature/get-weigth-category'
import { mapObSelect } from '@/lib/utils'
import { FilterSelect } from '@/types/FilterSelect'
import { AthletEntity } from '@/types/model/athlet'
import { ClubEntity } from '@/types/model/Club'
import { WeightCategoryEntity } from '@/types/model/WeightCategory'
import { ParticipantSummary } from '@/types/ParticipantSummary'
import Link from 'next/link'
import React, { Suspense } from 'react'

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
  const summaries = await getDelegationSummary()

  const buildSummaryHeader = (): string[] => {
    return weights.map(w => w.label)
  }
  return (
    <div>
      <Suspense fallback='Loading...'>
        <div className='flex justify-between'>
          <Filter title='Filtre' filters={filters} />
          <Link href='/board/delegation/checking'>
            <Button>Charger un document</Button>
          </Link>
        </div>
      </Suspense>

      <AthletPerClub />
      <div className='flex flex-col gap-8 xl:flex-row mt-10'>
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
    </div>
  )
}

export default DelegationList
