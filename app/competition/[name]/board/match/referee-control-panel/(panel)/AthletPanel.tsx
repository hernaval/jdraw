import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Player, Score, Scoreboard, Scoring } from '@/types/model/Scoreboard'
import { Flag, Shield } from 'lucide-react'
import React from 'react'

interface AthletPanelProps {
  bgColor: string
  textColor: string
  scoring: Scoring
}
export interface ScoringRowProps {
  player: Player
  score: Score
}
const ShidoCard: React.FC<{ count: number }> = ({ count }) => (
  <>
    {Array.from({ length: count }, (c: number, i) => (
      <Card
        key={i}
        className={cn(
          ' h-20 w-20 absolute right-16 shadow-md rounded-none border-none',
          count == 3 ? ' bg-red-300' : ' bg-yellow-300'
        )}
        style={{
          transform: `rotate(${i * 7 - 7.5}deg)`,
          marginTop: i === 0 ? '0px' : '-10px',
        }}
      />
    ))}
  </>
)
const ScorePoint: React.FC<{ value: number }> = ({ value }) => (
  <div className='text-8xl'>{value}</div>
)
const ScoringRow: React.FC<ScoringRowProps> = ({ score, player }) => {
  return (
    <div className='flex justify-between'>
      <div className=''>
        <div className='flex items-center'>
          <Shield size={48} />
          <span className='text-6xl'>{player.club}</span>
        </div>
      </div>
      <div className='self-center'>
        <div className='flex items-center'>
          {(score.wazari == 2 || score.ippon) && (
            <>
              <span className='font-bold-500 text-8xl mr-8'>IPPON</span>
              <ScorePoint value={1} />
            </>
          )}
          <ScorePoint value={score.wazari} />
        </div>
      </div>
      <div className=''>
        <ShidoCard count={2} />
      </div>
    </div>
  )
}
const AthletPanel: React.FC<AthletPanelProps> = ({
  bgColor,
  textColor,
  scoring,
}) => {
  return (
    <div style={{ backgroundColor: bgColor, color: textColor }}>
      <span className='text-5xl'>{scoring.player.name}</span>
      <ScoringRow player={scoring.player} score={scoring.score} />
    </div>
  )
}

export default AthletPanel
