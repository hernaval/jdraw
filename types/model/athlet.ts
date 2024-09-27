import { ClubEntity } from './Club'

export interface AthletEntity {
  id: number
  firstname: string
  lastname: string
  weight: string
  photoUrl: string
  sex: string
  club: ClubEntity
}
