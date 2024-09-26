import { SidebarItemProps } from '@/types/SidebarItemProps'
import {
  GitBranch,
  Home,
  Keyboard,
  NotepadText,
  Trophy,
  Users2,
} from 'lucide-react'

export const boardMenu: SidebarItemProps[] = [
  {
    label: 'Accueil',
    to: '/board',
    icon: <Home className='h-8 w-8' />,
  },
  {
    label: 'Règlement',
    to: '/board/outline',
    icon: <NotepadText className='h-8 w-8' />,
  },
  {
    label: 'Délégations',
    to: '/board/delegation',
    icon: <Users2 className='h-8 w-8' />,
  },
  {
    label: 'Tirages',
    to: '/board/draw',
    icon: <GitBranch className='h-8 w-8' />,
  },
  {
    label: 'Tableaux',
    to: '/board/match',
    icon: <Keyboard className='h-8 w-8' />,
  },
  {
    label: 'Résultats',
    to: '/board/results',
    icon: <Trophy className='h-8 w-8' />,
  },
]
