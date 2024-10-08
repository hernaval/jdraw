import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Label } from '../ui/label'
import MultiSelectBox from '../form/multi-select-box'
import { SelectBoxData } from '@/types/SelectBoxData'
import { Stage } from '@/types/model/Stage'
import { Field } from 'formik'
import { useStageStore } from '@/lib/store/stage-ranked-store'
import { toast } from '@/hooks/use-toast'

interface StageConfigProps {
  stage: Stage
}

const StageConfig: React.FC<StageConfigProps> = ({ stage }) => {
  const { add, selected, has, belongsTo } = useStageStore()
  const selectParticipant = (data: SelectBoxData) => {
    if (has(data) && !belongsTo(stage.id!, data)) {
      toast({
        title: 'Mauvais placement',
        description: 'Cet athlète est déjà assigné à un autre tour',
      })
      return
    }
    add(stage.id!, Number(data.group), data)

    console.log('results', selected)
  }

  const buildRankedParticipants = (currStage: Stage): SelectBoxData[] => {
    const lastStage = Number(currStage.id)
    const data: SelectBoxData[] = []
    for (let i = 0; i < lastStage; i++) {
      data.push(
        ...Array.from({ length: 4 }, (_, index) => {
          const selectData: SelectBoxData = {
            id: index + 4 * i,
            label: `#${index + 1}`,
            group: `${i}`,
            value: `${index + 1}`,
          }
          return selectData
        })
      )
    }
    console.log(data)
    return data
  }

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Tour #{stage.id}</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        {JSON.stringify(selected)}
        <div className='grid w-full items-center gap-4'>
          <div className='flex flex-row space-x-1.5'>
            <Field
              type='checkbox'
              id={`finalTour${stage.id}`}
              name={`stages.${stage.id}.isFinal`}
            />
            <Label htmlFor={`finalTour${stage.id}`}>
              Ce tour est issu de classements{' '}
            </Label>
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='drawFormat'>Format de tirage</Label>
            <Field
              as='select'
              name={`stages.${stage.id}.format`}
              className='border p-2 text-sm'>
              <option value='elimination'>Elimination</option>
              <option value='roundRobin'>Round robin</option>
            </Field>
          </div>
          {!stage.isFinal && (
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='nb'>Nombre de participants</Label>
              <Field
                id='nb'
                placeholder='Ex: 8'
                name={`stages.${stage.id}.nbParticipants`}
                className='border p-2'
              />
            </div>
          )}

          {stage.isFinal && (
            <div className='flex flex-col space-y-1.5'>
              <MultiSelectBox
                data={buildRankedParticipants(stage)}
                title='Choisir les participants'
                label='Participants classés'
                onChecked={selectParticipant}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default StageConfig
