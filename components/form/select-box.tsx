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

interface SelectBoxProps {
  label: string
  data: SelectBoxData[]
  onChange?: (value: any) => void
}
const SelectBox: React.FC<SelectBoxProps> = ({ label, data, onChange }) => {
  return (
    <div className='m-1'>
      <Select onValueChange={onChange}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {data.map(d => (
            <SelectItem key={d.id} value={d.value}>
              {d.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectBox
