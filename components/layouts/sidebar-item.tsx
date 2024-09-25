import { SidebarItemProps } from '@/types/SidebarItemProps'
import Link from 'next/link'
import React from 'react'

const SidebarItem: React.FC<SidebarItemProps & { isActive: boolean }> = ({
  label,
  to,
  icon,
  isActive,
}) => {
  return (
    <Link
      href={to}
      className={
        isActive
          ? ''
          : 'group flex flex-col h-8 w-8 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
      }>
      <div>{icon}</div>
      <div>
        <span className='text-xs'>{label}</span>
      </div>
    </Link>
  )
}

export default SidebarItem
