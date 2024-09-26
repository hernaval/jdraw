import Link from 'next/link'
import React from 'react'

const DelegationList = () => {
  return (
    <div>
      <ul>
        <li>List judoka</li>
        <li>Tableau categorie/club/nb participants</li>
        <li>Filter categorie / club</li>
      </ul>
      <Link href='/board/delegation/checking'>Charger</Link>
    </div>
  )
}

export default DelegationList
