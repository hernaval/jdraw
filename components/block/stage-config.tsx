import React from 'react'
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

interface StageConfigProps {
  stage: Stage
  rankedParticipants: SelectBoxData[]
}

const StageConfig: React.FC<StageConfigProps> = ({
  stage,
  rankedParticipants,
}) => {
  // const [isFinal, setIsFinal] = useState<boolean>(false)

  const selectParticipant = (id: number, checked: boolean) => {}
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Tour #{stage.id}</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
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
                data={rankedParticipants}
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
