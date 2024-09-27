import { AthletEntity } from '@/types/model/athlet'
import React from 'react'

interface AthletListFilterProps {
  club?: string
  category?: string
}
const AthletList: React.FC<AthletListFilterProps> = async ({
  category,
  club,
}) => {
  return <div>AthletList</div>
}

export default AthletList
