import { cn } from '@/lib/utils'
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
      className={cn(
        isActive && ' my-2 ',
        'group flex flex-col h-8 w-8 shrink-0 items-center justify-center text-primary transition-colors hover:text-foreground md:h-8 md:w-8'
      )}>
      <div
        className={cn(
          isActive &&
            'transition-transform duration-300 rotate-45 scale-150 translate-x-4 mb-2 text-gold'
        )}>
        {icon}
      </div>
      <div className={cn(isActive && 'hidden')}>
        <span className='text-xs '>{label}</span>
      </div>
    </Link>
  )
}

export default SidebarItem
