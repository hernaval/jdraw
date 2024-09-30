import { format } from 'date-fns'

export function formatDateAs(date: Date | string, pattern: string) {
  return format(date, pattern)
}
