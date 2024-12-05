import LinkButton from '@/components/action/link-button'
import { Command } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const MatchBoardPage = ({ searchParams, params }: any) => {
  const competition = params.name
  return (
    <div>
      <ul>
        <Link href='/board/match/contest'>contest</Link>
        <Link href='/board/match/bracket'>bracket</Link>
        <LinkButton
          href={`/competition/${competition}/board/match/referee-control-panel`}
          label="Ouvrir le panneau d'arbitrage"
          className='bg-gold text-primary hover:bg-gold'
          icon={<Command />}
        />
        <li></li>
      </ul>
    </div>
  )
}

export default MatchBoardPage
