import { cn } from '@/lib/utils'
import { CircleCheckBig } from 'lucide-react'
import React, { ReactNode } from 'react'

interface DrawFormatCardProps {
  active: boolean
  icon: ReactNode
  title: string
  onClick: () => void
}
const DrawFormatCard: React.FC<DrawFormatCardProps> = ({
  active = false,
  icon,
  title,
  onClick,
}) => {
  return (
    <div
      className={cn(
        active ? 'border border-yellow-500 shadow-0' : '',
        'shadow cursor-pointer flex flex-col items-center justify-center rounded gap-4 w-[250px] h-[150px]'
      )}
      onClick={onClick}>
      <h3 className='text-md font-medium'>{title}</h3>
      <div className='flex gap-1'>
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i}>{icon}</div>
        ))}
      </div>
      {active && <CircleCheckBig color='green' className='mt-2' />}
    </div>
  )
}

export default DrawFormatCard
