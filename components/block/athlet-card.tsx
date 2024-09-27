import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { AthletEntity } from '@/types/model/athlet'

interface AthetCardProps {
  athlet: AthletEntity
}
const AthletCard: React.FC<AthetCardProps> = ({ athlet }) => {
  return (
    <Card>
      <CardContent className='grid p-4'>
        <div className='flex items-center gap-4 w-full'>
          <div className='flex flex-col items-center justify-center'>
            <Avatar className='hidden h-9 w-9 sm:flex'>
              <AvatarImage src={athlet.photoUrl} alt='Avatar' />
              <AvatarFallback>
                {athlet.firstname[0].toUpperCase()}
                {athlet.lastname[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className='text-sm'>{athlet.club.name}</p>
          </div>
          <div className='grid gap-1'>
            <p className='text-sm font-medium leading-none'>
              {athlet.firstname} {athlet.lastname}
            </p>
            <p className='text-sm text-muted-foreground'>
              Catégorie -<span className='font-bold'>{athlet.weight}kg</span>
            </p>
          </div>
          <div className='ml-auto font-medium '>{athlet.sex}</div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AthletCard
