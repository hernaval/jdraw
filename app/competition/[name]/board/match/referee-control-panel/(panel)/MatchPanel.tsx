import React from 'react'

interface MatchPanelProps {
  roundName: string
}
const MatchPanel: React.FC<MatchPanelProps> = ({ roundName }) => {
  return (
    <div className='flex bg-slate-700 p-5 items-center'>
      <div className='flex-1'>
        <p className='text-white font-bold text-md'>{roundName}</p>
      </div>
      <div className='text-green-500 flex-1 text-8xl'>04:00</div>
    </div>
  )
}

export default MatchPanel
