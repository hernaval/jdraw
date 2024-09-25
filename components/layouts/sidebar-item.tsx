import { SidebarItemProps } from '@/types/SidebarItemProps'
import Link from 'next/link'
import React from 'react'

const SidebarItem: React.FC<SidebarItemProps> = ({ label, to, icon }) => {
  return (
    <Link
      href={to}
      className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'>
      {icon}
      <span className='sr-only'>{label}</span>
    </Link>
  )
}

export default SidebarItem
