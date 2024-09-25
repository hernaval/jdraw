import { HelpCircle, Package2, Settings } from 'lucide-react'
import React from 'react'
import SidebarItem from './sidebar-item'
import { boardMenu } from '@/app/board/menu'

const Sidebar = () => {
  return (
    <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
      <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
        {boardMenu.map(({label, to, icon}, _) => (
          <SidebarItem
            key={label}
            label={label}
            to={to}
            icon={icon}
          />
        ))}
      </nav>
      <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
        <SidebarItem to='/' label='Help' icon={<HelpCircle />} />
      </nav>
    </aside>
  )
}
export default Sidebar
