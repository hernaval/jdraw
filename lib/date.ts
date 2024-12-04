import { format } from 'date-fns'

export function formatDateAs(date: Date | string, pattern: string) {
  return format(date, pattern)
}

export function formatTimeAs(second: number): string {
  const minutes = Math.floor(second / 60)
  const ss = second % 60

  const fomrattedMinutes = String(minutes).padStart(2, '0')
  const fomrattedSeconds = String(ss).padStart(2, '0')

  return `${fomrattedMinutes}:${fomrattedSeconds}`
}
