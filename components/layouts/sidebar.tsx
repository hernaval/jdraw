'use client'
import { HelpCircle } from 'lucide-react'
import React from 'react'
import SidebarItem from './sidebar-item'
import { boardMenu, pathToTitleMap } from '@/app/board/menu'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const Sidebar = () => {
  const pathname: string = usePathname()

  const isActive = (to: string): boolean => {
    for (const [pattern, title] of Object.entries(pathToTitleMap)) {
      const regEx = new RegExp(pattern)
      if (regEx.test(to) && regEx.test(pathname)) {
        return true
      }
    }
    return false
  }
  return (
    <aside className='fixed inset-y-0 left-0 z-10 hidden w-28 flex flex-col items-center justify-between border-r bg-background sm:flex'>
      <div>
        <Image alt='jdraw logo' src='/logo.svg' width={70} height={50} />
      </div>
      <div>
        <nav className='flex flex-col items-center gap-12 px-2 sm:py-5'>
          {boardMenu.map(({ label, to, icon }, _) => (
            <SidebarItem
              key={label}
              label={label}
              to={to}
              icon={icon}
              isActive={
                (new RegExp('^/board/.+').test(to) && pathname.includes(to)) ||
                to === pathname
              }
            />
          ))}
        </nav>
      </div>

      <div>
        <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
          <SidebarItem
            to='/'
            label='Aide'
            icon={<HelpCircle />}
            isActive={false}
          />
        </nav>
      </div>
    </aside>
  )
}
export default Sidebar