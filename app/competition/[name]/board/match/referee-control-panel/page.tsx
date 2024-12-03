import { Scoreboard } from '@/types/model/Scoreboard'
import AthletPanel from './(panel)/AthletPanel'
import MatchPanel from './(panel)/MatchPanel'
import { Card } from '@/components/ui/card'

const scoring: Scoreboard = {
  whitePlayer: {
    player: {
      name: 'Herinavalona',
      club: 'CJC',
    },
    score: {
      ippon: true,
      shido: 1,
      wazari: 0,
    },
  },
  bluePlayer: {
    player: {
      name: 'John Doe',
      club: 'CJC',
    },
    score: {
      ippon: false,
      shido: 2,
      wazari: 1,
    },
  },
}

const RefereeControlPanel = () => {
  return (
    <Card className='w-full p-2'>
      <AthletPanel
        bgColor='white'
        textColor='black'
        scoring={scoring.whitePlayer}
      />
      <AthletPanel
        bgColor='blue'
        textColor='white'
        scoring={scoring.bluePlayer}
      />
      <MatchPanel roundName='Quart - final' />
    </Card>
  )
}

export default RefereeControlPanel
