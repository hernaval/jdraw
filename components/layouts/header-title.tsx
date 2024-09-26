'use client'

import { boardMenu, pathToTitleMap } from '@/app/board/menu'
import { usePathname } from 'next/navigation'
import React from 'react'

const getTitleFromPathname = (pathname: string): string => {
  for (const [pattern, title] of Object.entries(pathToTitleMap)) {
    const regEx = new RegExp(pattern)
    if (regEx.test(pathname)) {
      return title
    }
  }

  return 'Général'
}

const HeaderTitle = () => {
  const pathname = usePathname()
  const title = getTitleFromPathname(pathname)
  return <h1 className='text-3xl font-fond'>{title}</h1>
}

export default HeaderTitle
