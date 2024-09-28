import { SelectBoxData } from './SelectBoxData'

export interface FilterSelect {
  key: string
  label: string
  data: SelectBoxData[]
  groupable: boolean
}
