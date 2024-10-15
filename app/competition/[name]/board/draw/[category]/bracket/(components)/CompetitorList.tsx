import { cn } from '@/lib/utils'
import { Competitor } from '@/types/model/competitor'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

interface CompetitorListProps {
  competitors: Competitor[]
  activeCompetitor: Competitor | null
}
const CompetitorList: React.FC<CompetitorListProps> = ({
  competitors,
  activeCompetitor,
}) => {
  return (
    <ul>
      <AnimatePresence>
        {competitors.map((competitor, index) => (
          <motion.li
            key={competitor.id}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={cn(
              'text-sm my-2 text-gray',
              activeCompetitor?.id == competitor.id ? 'text-lg' : 'sm'
            )}>
            {competitor.firstname} {competitor.lastname}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}

export default CompetitorList
