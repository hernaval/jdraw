import { Scoreboard } from '@/types/model/Scoreboard'
import ControlPanel from './(panel)/ControlPanel'

const scoring: Scoreboard = {
  whitePlayer: {
    player: {
      name: 'Herinavalona',
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
      name: 'John Doe',
      club: 'CJC',
    },
    score: {
      ippon: false,
      shido: 0,
      wazari: 0,
    },
  },
}

const RefereeControlPanel = () => {
  return (
    <div className=''>
      <ControlPanel scoring={scoring} />
    </div>
  )
}

export default RefereeControlPanel
