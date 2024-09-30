'use server'

import { AthletEntity } from '@/types/model/athlet'
import { Athlet } from '@prisma/client'

export async function sendDelegationList(
  athlets: AthletEntity[],
  prevState: any,
  form: FormData
) {
  // verify if delegation list already sent and validated
  console.log('delegation list', athlets)
  try {
    const athletsDao = athlets.map(({ club, id, ...athlet }) => ({
      ...athlet,
      clubId: Number(club.id),
    }))
    console.log('save delegation list')
    await prisma.athlet.createMany({ data: athletsDao })
    return {
      code: 201,
    }
  } catch (e) {
    console.error('error inserting delegation list', e)
    return {
      code: 500,
      message: "Une erreur est survenue lors de l'insertion de la liste",
    }
  }
}
