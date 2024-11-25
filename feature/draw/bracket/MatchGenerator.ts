import { MatchEntity } from '@/types/model/Match'
import { TournamentBracket } from './TournamentBracket'
import { Athlet } from '@prisma/client'

export abstract class MatchGenerator implements TournamentBracket {
  protected athlets: Array<Partial<Athlet>>

  constructor(athlets: Array<Partial<Athlet>>) {
    this.athlets = athlets
  }
  abstract generate(): MatchEntity[]
}
