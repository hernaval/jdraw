import LinkButton from '@/components/action/link-button'
import { Command } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const MatchBoardPage = ({ searchParams, params }: any) => {
  const competition = params.name
  return (
    <div>
      <ul>
        <LinkButton
          href={`/competition/${competition}/board/match/contest`}
          label='Order des matchs'
        />

        <LinkButton
          href={`/competition/${competition}/board/match/bracket`}
          label='Tirages'
        />

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
