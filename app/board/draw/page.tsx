import Link from 'next/link'
import React from 'react'

const DrawList = () => {
  return (
    <div>
      Stepper
      <ul>
        <li>Category list</li>
        <li>next button</li>
        <li>Dialog / drawer draw format</li>
        <li>Elimination / round robin custom</li>
        <li>
          Custom: Create round and type (Elimination / round robin) with
          participant number
        </li>
        <Link href='/board/draw/athlet'>Start</Link>
      </ul>
    </div>
  )
}

export default DrawList
