'use client'

import { Network, Table2, Bolt, Info, Plus, Settings } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DrawFormatCard from './draw-format-card'
import { DrawFormatEnum } from '@/types/model/draw-format'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Separator } from '../ui/separator'
import StageConfig from './stage-config'
import { SelectBoxData } from '@/types/SelectBoxData'
import { Stage } from '@/types/model/Stage'

const formatGuide = {
  0: 'Elimation explication',
  1: 'Round robin',
  2: 'Custom',
}

const rankedParticipants: SelectBoxData[] = [
  { id: 1, label: '1er', group: '1', value: '1st' },
  { id: 2, label: '2e', group: '1', value: '1er' },
  { id: 3, label: '3e', group: '1', value: '2e' },
  { id: 4, label: '4e', group: '1', value: '4e' },
]

const initialStage: Stage = {
  id: 0,
  isFinal: false,
  type: DrawFormatEnum.ELIMINATION,
}

const DrawFormatSelector = () => {
  const [drawFormat, setDrawFormat] = useState<DrawFormatEnum>(
    DrawFormatEnum.ELIMINATION
  )
  const [stages, setStages] = useState<Stage[]>([initialStage])

  const handleCustomFormat = () => {
    setDrawFormat(DrawFormatEnum.CUSTOM)
  }

  const addStage = () => {
    const newStage: Stage = {
      id: 1,
      isFinal: false,
      type: DrawFormatEnum.ELIMINATION,
    }
    setStages([...stages, newStage])
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
        <div className='flex gap-1  mt-16 items-center'>
          <h4 className='text-xl'>Configuration </h4>
          <Settings size={24} />
        </div>
        <Separator className='my-4' />

        <div className='grid grid-cols-4 gap-4'>
          {stages.map(s => (
            <StageConfig
              stage={s}
              rankedParticipants={rankedParticipants}
              key={s.id}
            />
          ))}
          <div
            className='border flex items-center justify-center cursor-pointer w-[350px] py-4'
            onClick={addStage}>
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
