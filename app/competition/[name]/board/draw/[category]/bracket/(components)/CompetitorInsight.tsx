import { Card, CardContent } from '@/components/ui/card'
import { Competitor } from '@/types/model/competitor'
import { useEffect } from 'react'
import { motion } from 'framer-motion'

const CompetitorInsight: React.FC<{ competitor: Competitor | null }> = ({
  competitor,
}) => {
  if (!competitor) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -50 }}
      transition={{ duration: 0.3 }}
      className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
      <div className='w-64 bg-white shadow-lg p-4 rounded-lg'>
        <h3 className='text-lg font-bold mb-2 text-center'>
          {competitor.firstname} {competitor.lastname}
        </h3>
      </div>
    </motion.div>
  )
}

export default CompetitorInsight
