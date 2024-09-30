import React, { ReactNode } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

interface EditableProps {
  header: string[]
  children: ReactNode
}
const Editable: React.FC<EditableProps> = ({ header, children }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {header.map(value => (
            <TableHead key={value}>{value}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  )
}

export default Editable
