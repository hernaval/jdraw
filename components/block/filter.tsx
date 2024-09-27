'use client'

import React from 'react'
import SelectBox from '../form/select-box'
import { FilterSelect } from '@/types/FilterSelect'
import { Button } from '../ui/button'

interface FilterProps {
  title: string
  filters: FilterSelect[]
}

const Filter: React.FC<FilterProps> = ({ title, filters }) => {
  const applyFilter = () => {}
  return (
    <div className='flex justify-between items-center bg-white-500'>
      <div className='flex'>
        {filters.map((f, i) => (
          <SelectBox key={f.key} label={f.label} data={f.data} />
        ))}
      </div>
      <div>
        <Button size='sm' className='ml-4' onClick={applyFilter}>
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
            Filtrer
          </span>
        </Button>
      </div>
    </div>
  )
}

export default Filter
