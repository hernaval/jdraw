import { Scoreboard } from '@/types/model/Scoreboard'
import ControlPanel from './(panel)/ControlPanel'
import { getNextMatch } from '@/feature/match/get-next-match'
import { roundNumToName } from '../contest/roundUtils'

const RefereeControlPanel = async ({ params }: any) => {
  const competition = params.name
  const match = await getNextMatch(competition)
  return (
    <div className=''>
      {match ? (
        <ControlPanel
          match={match}
          roundName={roundNumToName(match.round || 16)}
          category={match.stageConfig?.weightCategory || ''}
        />
      ) : (
        <h1>Compétition terminée</h1>
      )}
    </div>
  )
}

export default RefereeControlPanel
