'use client'

import React, { useCallback } from 'react'
import SelectBox from '../form/select-box'
import { FilterSelect } from '@/types/FilterSelect'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

interface FilterProps {
  title: string
  filters: FilterSelect[]
}

const Filter: React.FC<FilterProps> = ({ title, filters }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )
  const putQueryString = () => {}

  const handleChange = (value: string, key: string) => {
    console.log(`omit value from ${key} with value : ${value}`)

    router.push(`${pathname}?${createQueryString(key, value)}`)
  }
  return (
    <div className='flex justify-between items-center bg-white-500'>
      <div className='flex'>
        {filters.map((f, i) => (
          <SelectBox
            key={f.key}
            label={f.label}
            data={f.data}
            onChange={(value: string) => handleChange(value, f.key)}
          />
        ))}
      </div>
      {/* <div>
        <Button size='sm' className='ml-4' onClick={putQueryString}>
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
            Filtrer
          </span>
        </Button>
      </div> */}
    </div>
  )
}

export default Filter
