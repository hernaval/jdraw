import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
interface TimerProps {
  starting: number
  onComplete: () => void
}
const CountdownTimer: React.FC<TimerProps> = ({ starting, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(starting) // Starting at 10 seconds

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)

      return () => clearTimeout(timer) // Cleanup on unmount
    }

    if (timeLeft == 0) onComplete()
  }, [timeLeft])

  const timerVariants = {
    animate: {
      scale: [1, 1.5, 1], // Scale up and back down
      opacity: [1, 0.7, 1],
      transition: { duration: 0.5 }, // Animation duration
    },
  }
  return (
    <motion.div
      className='text-8xl font-bold text-gray-500'
      key={timeLeft} // Ensure animation resets on each new time value
      variants={timerVariants}
      animate='animate'>
      {timeLeft}
    </motion.div>
  )
}

export default CountdownTimer
