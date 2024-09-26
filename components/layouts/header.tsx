import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu'
import { PanelLeft, Link, Search, User, LogOut } from 'lucide-react'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { boardMenu } from '@/app/board/menu'

const Header = () => {
  return (
    <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
      <Sheet>
        <SheetTrigger asChild>
          <Button size='icon' variant='outline' className='sm:hidden'>
            <PanelLeft className='h-5 w-5' />
            <span className='sr-only'>Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='sm:max-w-xs'>
          <nav className='grid gap-6 text-lg font-medium'>
            {boardMenu.map(({ label, to, icon }, i) => (
              <Link
                key={label}
                href={to}
                className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'>
                {icon}
                <span className='sr-only'>{label}</span>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <h1 className='text-3xl font-bold'>Nom de la page</h1>
      <div className='relative ml-auto flex-1 md:grow-0'>
        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          type='search'
          placeholder='Trouver quelques choses...'
          className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='overflow-hidden rounded-full'>
            <User className='overflow-hidden rounded' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Administrateur</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button className='destructure'>
              <LogOut className='mr-2' /> Se déconnecter
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default Header
