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

interface MultiSelectBoxProps {
  title: string
  label: string
  data: SelectBoxData[]
  onChecked: (id: number, value: boolean) => void
}
const MultiSelectBox: React.FC<MultiSelectBoxProps> = ({
  label,
  title,
  data,
  onChecked,
}) => {
  const [checkList, setCheckList] = useState<Set<number>>(new Set())
  const handleCheck = (data: SelectBoxData, checked: boolean) => {
    const list = new Set(checkList)
    if (list.has(data.id)) {
      list.delete(data.id)
    } else {
      list.add(data.id)
    }
    setCheckList(list)
    onChecked(data.id, checked)
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
              checked={checkList.has(d.id)}>
              {d.group} {d.label} {JSON.stringify(checkList)}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default MultiSelectBox
