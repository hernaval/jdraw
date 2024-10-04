import DrawFormatSelector from '@/components/block/draw-format-selector'
import React from 'react'

const DrawFormatPage = async () => {
  return (
    <div className='mt-8'>
      <h2 className='text-xl'>
        Format <span className='font-bold'>Elimination directe</span>{' '}
      </h2>
      <DrawFormatSelector />
    </div>
  )
}

export default DrawFormatPage
