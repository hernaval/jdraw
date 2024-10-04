import React from 'react'
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
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary'>{title}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuLabel>{label}</DropdownMenuLabel>

          {data.map(({ id, label, group }) => (
            <DropdownMenuCheckboxItem
              key={id}
              onCheckedChange={value => onChecked(id, value)}>
              {group} {label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default MultiSelectBox
