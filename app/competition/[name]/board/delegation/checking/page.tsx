import AthletPerClub from '@/components/block/athlet-per-club'
import DropZoneFileUpload from '@/components/block/drop-zone-file-upload'
import Filter from '@/components/block/filter'
import { Button } from '@/components/ui/button'
import { getClub } from '@/feature/get-club'
import { getWeighCategory } from '@/feature/get-weigth-category'
import { mapObSelect } from '@/lib/utils'
import { FilterSelect } from '@/types/FilterSelect'
import { ClubEntity } from '@/types/model/Club'
import { WeightCategoryEntity } from '@/types/model/WeightCategory'
import React from 'react'

const DelegationChecking = async () => {
  const weights: WeightCategoryEntity[] = await getWeighCategory()
  const filters: FilterSelect[] = [
    {
      key: 'category',
      label: 'Choisir une catégorie',
      data: mapObSelect(weights, 'id', 'label', 'label', 'sex'),
      groupable: true,
    },
  ]

  return (
    <div className=''>
      <div className='flex justify-between'>
        <Filter title='Filtre' filters={filters} />
      </div>

      <AthletPerClub />
      <div className='mt-6'>
        <DropZoneFileUpload />
      </div>
    </div>
  )
}

export default DelegationChecking
