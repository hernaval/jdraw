import CompetitionCard from '@/components/block/competition-card'
import { getCompetitions } from '@/feature/competition/get-competitions'
import { CompetitionEntity } from '@/types/model/competition'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// const competitionList: CompetitionEntity[] = [
//   {
//     id: 1,
//     name: 'Tournoi du capricore',
//     location: 'Antananarivo',
//     startDate: '10/10/2024',
//     endDate: '12/10/2024',
//     registrationEndDate: '25/09/2024',
//     slug: 'trn_capricorne',
//     bannerUrl: '',
//   },
//   {
//     id: 2,
//     name: 'Tournoi du capricore',
//     location: 'Antananarivo',
//     startDate: '10/10/2024',
//     endDate: '12/10/2024',
//     registrationEndDate: '25/09/2024',
//     slug: 'trn_capricorne',
//     bannerUrl: '',
//   },
//   {
//     id: 3,
//     name: 'Tournoi du capricore',
//     location: 'Antananarivo',
//     startDate: '10/10/2024',
//     endDate: '12/10/2024',
//     registrationEndDate: '25/09/2024',
//     slug: 'trn_capricorne',
//     bannerUrl: '',
//   },
//   {
//     id: 4,
//     name: 'Tournoi du capricore',
//     location: 'Antananarivo',
//     startDate: '10/10/2024',
//     endDate: '12/10/2024',
//     registrationEndDate: '25/09/2024',
//     slug: 'trn_capricorne',
//     bannerUrl: '',
//   },
// ]
const CompetitionPage = async () => {
  const competitionList: CompetitionEntity[] = await getCompetitions()
  return (
    <div className='h-full grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-6'>
      <header className='sticky top-0 flex'>
        <Image alt='jdraw logo' src='/logo.svg' width={70} height={50} />
      </header>

      <section>
        <h2 className='text-3xl'>Prochaines compétitions</h2>
        <div className='flex grid grid-cols-1  gap-8 lg:grid-cols-3 mt-8'>
          {competitionList.map(competition => (
            <Link href={`/competiton/${competition.slug}`} key={competition.id}>
              <CompetitionCard competition={competition} />
            </Link>
          ))}
        </div>
      </section>

      <Image
        alt='ijf logo'
        src='/ijf_logo_300.png'
        width={300}
        height={300}
        className='fixed inset-0 top-[30%] left-[40%] opacity-10'
      />
    </div>
  )
}

export default CompetitionPage
