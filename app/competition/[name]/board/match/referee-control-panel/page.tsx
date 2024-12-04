import { Scoreboard } from '@/types/model/Scoreboard'
import AthletPanel from './(panel)/AthletPanel'
import MatchPanel from './(panel)/MatchPanel'
import { Card } from '@/components/ui/card'
import Keyboard from '@/components/block/Keyboard'

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

const whiteKeyboardLayout = [
  ['Q', 'W', 'E', 'R', 'T'],
  ['A', 'S', 'D', 'F', 'G'],
  ['Z', 'X', 'C', 'V'],
]
const blueKeyboardLayout = [
  ['Y', 'U', 'I', 'O', 'P'],
  ['H', 'J', 'K', 'L'],
  ['B', 'N', 'M'],
]

const RefereeControlPanel = () => {
  return (
    <div className=''>
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
      <div className='flex mt-8'>
        <Keyboard layout={whiteKeyboardLayout} />
        <Keyboard layout={blueKeyboardLayout} />
      </div>
    </div>
  )
}

export default RefereeControlPanel
