import Filter from '@/components/block/filter'
import { mapObSelect } from '@/lib/utils'
import { FilterSelect } from '@/types/FilterSelect'
import { Club } from '@/types/model/Club'
import { WeightCategory } from '@/types/model/WeightCategory'
import Link from 'next/link'
import React, { Suspense } from 'react'

const clubs: Club[] = [
  { id: 1, name: 'CJC' },
  { id: 2, name: 'Barca' },
  { id: 3, name: 'Real' },
]
const weights: WeightCategory[] = [
  { id: 1, label: '60' },
  { id: 2, label: '66' },
  { id: 3, label: '73' },
]

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
const DelegationList = () => {
  return (
    <div>
      <Suspense>
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
