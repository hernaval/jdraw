import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Input } from '../ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Label } from '../ui/label'
import MultiSelectBox from '../form/multi-select-box'
import { SelectBoxData } from '@/types/SelectBoxData'
import { Stage } from '@/types/model/Stage'

interface StageConfigProps {
  stage: Stage
  rankedParticipants: SelectBoxData[]
}

const StageConfig: React.FC<StageConfigProps> = ({
  stage,
  rankedParticipants,
}) => {
  const [isFinal, setIsFinal] = useState<boolean>(false)

  const selectParticipant = (id: number, checked: boolean) => {}
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Tour #1</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-row space-x-1.5'>
              <input
                disabled={stage.id == 0}
                type='checkbox'
                id={`finalTour${stage.id}`}
                onChange={() => setIsFinal(!isFinal)}
              />{' '}
              <Label htmlFor={`finalTour${stage.id}`}>
                Ce tour est issu de classements{' '}
              </Label>
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='drawFormat'>Format de tirage</Label>
              <Select>
                <SelectTrigger id='drawFormat'>
                  <SelectValue placeholder='' />
                </SelectTrigger>
                <SelectContent position='popper'>
                  <SelectItem value='next'>Elimination</SelectItem>
                  <SelectItem value='sveltekit'>Round robin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label>Nombre de participants</Label>
              <Input id='name' placeholder='Ex: 8' />
            </div>

            {isFinal && (
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
        </form>
      </CardContent>
    </Card>
  )
}

export default StageConfig
