import { MatchEntity } from '@/types/model/Match'
import { TournamentDraw } from './TournamentDraw'
import { Athlet } from '@prisma/client'

export abstract class MatchGenerator implements TournamentDraw {
  protected athlets: Array<Partial<Athlet>>

  constructor(athlets: Array<Partial<Athlet>>) {
    this.athlets = athlets
  }
  abstract generate(): MatchEntity[]
}
