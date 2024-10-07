import React, { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { SelectBoxData } from '@/types/SelectBoxData'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { useStageStore } from '@/lib/store/stage-ranked-store'

interface MultiSelectBoxProps {
  title: string
  label: string
  data: SelectBoxData[]
  onChecked: (data: SelectBoxData) => void
}
const MultiSelectBox: React.FC<MultiSelectBoxProps> = ({
  label,
  title,
  data,
  onChecked,
}) => {
  const [checkList, setCheckList] = useState<Set<number>>(new Set())

  // TODO use a global state to manage it
  const handleCheck = (data: SelectBoxData, checked: boolean) => {
    const list = new Set(checkList)
    if (list.has(data.id)) {
      list.delete(data.id)
    } else {
      list.add(data.id)
    }
    setCheckList(list)
    onChecked(data)
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary'>{title}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          <Separator />
          {data.map(d => (
            <DropdownMenuCheckboxItem
              key={d.id}
              onCheckedChange={value => handleCheck(d, value)}
              checked={checkList.has(d.id)}
              disabled={d.disabled}>
              {d.group} {d.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default MultiSelectBox
