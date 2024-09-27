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
  valueKey: string
): SelectBoxData[] {
  const selectBoxData: SelectBoxData[] = []
  objects.forEach(o => {
    selectBoxData.push({ id: o[idKey], label: o[labelKey], value: o[valueKey] })
  })
  return selectBoxData
}
