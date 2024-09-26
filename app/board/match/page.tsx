import Link from 'next/link'
import React from 'react'

const MatchBoardPage = () => {
  return (
    <div>
      <ul>
        <li>start the board</li>
        <Link href='/board/match/contest'>contest</Link>
        <Link href='/board/match/bracket'>bracket</Link>
        <li></li>
      </ul>
    </div>
  )
}

export default MatchBoardPage
