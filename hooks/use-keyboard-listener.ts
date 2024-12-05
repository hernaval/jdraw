import { useEffect } from 'react'

const useKeyboardListener = (keysMap: any) => {
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      console.log(`${event.key} is pressed`)
      const hander = keysMap[event.key]
      if (hander) {
        hander(event)
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [keysMap])
}

export default useKeyboardListener
