import { useCallback, useEffect, useRef, useState } from 'react'

const useTimer = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState(initialTime) // Starting at 10 seconds
  const [isPaused, setIsPaused] = useState<boolean>(false)

  let intval: any = null
  const startTime = useCallback(() => {
    if (intval || isPaused) return
    setIsPaused(false)
    intval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) {
          stopTime()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
  }, [timeLeft, isPaused])

  const stopTime = () => {
    clearInterval(intval)
    intval = null
    setIsPaused(true)
  }
  useEffect(() => {
    if (timeLeft == 0) stopTime()
    return () => {
      stopTime()
    }
  }, [])

  return { timeLeft, isPaused, startTime, stopTime }
}
export default useTimer
