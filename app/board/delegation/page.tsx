import Filter from '@/components/block/filter'
import { getClub } from '@/feature/get-club'
import { getWeighCategory } from '@/feature/get-weigth-category'
import { mapObSelect } from '@/lib/utils'
import { FilterSelect } from '@/types/FilterSelect'
import { ClubEntity } from '@/types/model/Club'
import { WeightCategoryEntity } from '@/types/model/WeightCategory'
import Link from 'next/link'
import React, { Suspense } from 'react'

const DelegationList = async () => {
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

  return (
    <div>
      <Suspense fallback='Loading...'>
        <Filter title='Filtre' filters={filters} />
      </Suspense>
      <ul>
        <li>List judoka</li>
        <li>Tableau categorie/club/nb participants</li>
        <li>Filter categorie / club</li>
      </ul>
      <Link href='/board/delegation/checking'>Charger</Link>
    </div>
  )
}

export default DelegationList
