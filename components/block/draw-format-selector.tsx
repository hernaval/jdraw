'use client'

import { Network, Table2, Bolt, Info, Plus } from 'lucide-react'
import React, { useState } from 'react'
import DrawFormatCard from './draw-format-card'
import { DrawFormatEnum } from '@/types/model/draw-format'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Separator } from '../ui/separator'
import StageConfig from './stage-config'

const formatGuide = {
  0: 'Elimation explication',
  1: 'Round robin',
  2: 'Custom',
}

const DrawFormatSelector = () => {
  const [drawFormat, setDrawFormat] = useState<DrawFormatEnum>(
    DrawFormatEnum.ELIMINATION
  )

  const handleCustomFormat = () => {
    setDrawFormat(DrawFormatEnum.CUSTOM)
  }
  return (
    <div>
      <Alert className='mt-4'>
        <Info className='h-4 w-4' />
        <AlertTitle> Guide des formats</AlertTitle>
        <AlertDescription>{formatGuide[drawFormat]}</AlertDescription>
      </Alert>

      <div className='flex flex-col  gap-8 md:flex-row mt-16'>
        <DrawFormatCard
          onClick={() => setDrawFormat(DrawFormatEnum.ELIMINATION)}
          active={drawFormat == DrawFormatEnum.ELIMINATION}
          icon={<Network />}
          title='Elimination directe'
        />
        <DrawFormatCard
          onClick={() => setDrawFormat(DrawFormatEnum.ROUND_ROBIN)}
          active={drawFormat == DrawFormatEnum.ROUND_ROBIN}
          icon={<Table2 />}
          title='Round robin'
        />
        <DrawFormatCard
          onClick={handleCustomFormat}
          active={drawFormat == DrawFormatEnum.CUSTOM}
          icon={<Bolt />}
          title='Personnalisé'
        />
      </div>

      <div>
        <h4 className='text-xl mt-16'>Configuration</h4>
        <Separator className='my-4' />

        <div className='grid grid-cols-4 gap-4'>
          <StageConfig />
          <StageConfig />
          <StageConfig />
          <StageConfig />
          <div className='border flex items-center justify-center cursor-pointer w-[350px] py-4'>
            <div className='flex flex-col items-center justify-center'>
              <Plus size={70} color='gray' />
              <p className='text-sm text-muted-foreground'>
                Ajouter un nouveau tour
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrawFormatSelector
