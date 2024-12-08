import { Scoreboard } from '@/types/model/Scoreboard'
import ControlPanel from './(panel)/ControlPanel'
import { getNextMatch } from '@/feature/match/get-next-match'
import { roundNumToName } from '../contest/roundUtils'

const RefereeControlPanel = async ({ params }: any) => {
  const competition = params.name
  const match = await getNextMatch(competition)
  const scoring: Scoreboard = {
    whitePlayer: {
      player: {
        name: `${match.whiteAthlet?.firstname} ${match.whiteAthlet?.lastname}`,
        club: 'CJC',
      },
      score: {
        ippon: false,
        shido: 0,
        wazari: 0,
      },
    },
    bluePlayer: {
      player: {
        name: `${match.blueAthlet?.firstname} ${match.blueAthlet?.lastname}`,
        club: 'CJC',
      },
      score: {
        ippon: false,
        shido: 0,
        wazari: 0,
      },
    },
  }

  return (
    <div className=''>
      <ControlPanel
        scoring={scoring}
        roundName={roundNumToName(match.round || 16)}
      />
    </div>
  )
}

export default RefereeControlPanel
