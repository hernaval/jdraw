import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import Image from 'next/image'
import { Calendar, MapPin } from 'lucide-react'
import { CompetitionEntity } from '@/types/model/competition'

interface CompetitionCardProps {
  competition: CompetitionEntity
}
const CompetitionCard: React.FC<CompetitionCardProps> = ({ competition }) => {
  return (
    <div>
      <Card className='w-[350px] transform-transitions ease-in-out duration-300 hover:scale-110'>
        <CardHeader className='p-0'>
          <Image
            src='/competition_banner.webp'
            alt='banner'
            width={350}
            height={200}
          />
        </CardHeader>
        <CardContent className='p-4'>
          <div className='flex justify-between items-center'>
            <h3 className='text-xl'>Paris Grand Slam</h3>
            <div className='flex items-center text-muted-foreground text-xss'>
              <MapPin size={15} />
              Antananarivo
            </div>
          </div>
          <div className='mt-4'>
            <div className='flex justify-between'>
              <div className='flex flex-col border text-center px-4 py-2 text-sm'>
                <p>Date de début</p>
                <p className='font-bold'>10 Octobre 2024</p>
              </div>
              <div className='flex flex-col border text-center px-4 py-2 text-sm'>
                <p>Date de fin</p>
                <p className='font-bold'>12 Octobre 2024</p>
              </div>
            </div>
            <div className='flex justify-between text-sm text-muted-foreground border p-4 mt-2'>
              <div className='flex'>
                <Calendar size={15} /> Fermeture d'inscription
              </div>
              <div>10 Octobre 2024</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CompetitionCard
