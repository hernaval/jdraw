'use client'

import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SelectBoxData } from '@/types/SelectBoxData'
import { SelectGroup, SelectLabel } from '@radix-ui/react-select'

interface SelectBoxProps {
  label: string
  data: SelectBoxData[]
  onChange?: (value: any) => void
  groupable: boolean
}
const SelectBox: React.FC<SelectBoxProps> = ({
  label,
  data,
  onChange,
  groupable = false,
}) => {
  const groupedData = data.reduce<{ [key: string]: SelectBoxData[] }>(
    (acc, d) => {
      const group = d.group!!
      if (!acc[group]) {
        acc[group] = []
      }
      acc[group].push(d)
      return acc
    },
    {}
  )

  console.log(groupedData)
  return (
    <div className='m-1'>
      <Select onValueChange={onChange}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {!groupable &&
            data.map(d => (
              <SelectItem key={d.id} value={d.value}>
                {d.label}
              </SelectItem>
            ))}

          {groupable &&
            Object.entries(groupedData).map(([group, data]) => (
              <SelectGroup key={group}>
                <SelectLabel>{group}</SelectLabel>
                {data.map(d => (
                  <SelectItem key={d.id} value={d.value}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectBox
