import { MatchEntity } from '@/types/model/Match'
import { FullKnockout } from '../draw/bracket/FullKnockout'

export class MatchContest {
  private matches: MatchEntity[]
  private knockout: FullKnockout

  constructor(matches: MatchEntity[]) {
    this.matches = matches
    this.knockout = new FullKnockout(this.matches)
  }

  getCurrentRoundMatch(): MatchEntity[] {
    // group match by category

    // get total round per category

    // get the current round

    // verify if all contests in current round is finished, if true get next round

    // return the categories's matchtes with the highest round

    // category with superior number of matches go first

    //
    return []
  }
}
