import { SelectBoxData } from '@/types/SelectBoxData'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mapObSelect(
  objects: any[],
  idKey: string,
  labelKey: string,
  valueKey: string,
  groupKey: string | null
): SelectBoxData[] {
  const selectBoxData: SelectBoxData[] = []
  objects.forEach(o => {
    selectBoxData.push({
      id: o[idKey],
      label: o[labelKey],
      value: o[valueKey],
      group: groupKey ? o[groupKey] : null,
    })
  })
  return selectBoxData
}

export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export function fillArrayAlt(
  output: any[],
  input: any[],
  from: number,
  to: number
) {
  let low = from
  let high = to
  let i = 0

  while (low <= high && i < input.length) {
    output[low++] = input[i++]
    if (low < high) {
      output[high--] = input[i++]
    }
  }
}
