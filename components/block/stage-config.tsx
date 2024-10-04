import React from 'react'
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
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { Label } from '../ui/label'

const StageConfig = () => {
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Tour #1</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='drawFormat'>Format de tirage</Label>
              <Select>
                <SelectTrigger id='drawFormat'>
                  <SelectValue placeholder='Select' />
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
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default StageConfig
