import { useCallback, useEffect, useRef, useState } from 'react'

const useTimer = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState(initialTime) // Starting at 10 seconds
  const [isPaused, setIsPaused] = useState<boolean>(true)

  const intval: any = useRef(null)
  const startTime = useCallback(() => {
    setIsPaused(false)
    console.log(intval)
    if (intval.current) return
    intval.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) {
          stopTime()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
  }, [timeLeft])

  const playOrPause = () => {
    if (isPaused) {
      startTime()
    } else {
      stopTime()
    }
  }

  const stopTime = () => {
    setIsPaused(true)
    if (intval.current) {
      clearInterval(intval.current)
      intval.current = null
    }
  }
  useEffect(() => {
    if (timeLeft == 0) stopTime()
    return () => {
      stopTime()
    }
  }, [])

  return { timeLeft, isPaused, playOrPause, startTime, stopTime }
}
export default useTimer
