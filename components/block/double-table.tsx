import React from 'react'
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from '../ui/table'
import { ParticipantSummary } from '@/types/ParticipantSummary'

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
]
interface DoubleTableProps {
  header: string[]
  data: ParticipantSummary
}
const DoubleTable: React.FC<DoubleTableProps> = ({ header, data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead />
          {header.map(h => (
            <TableHead key={h}>{h}</TableHead>
          ))}
          <TableHead className='font-bold'>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow></TableRow>
        {data.clubs.map(c => (
          <TableRow key={c.name}>
            <TableCell className='font-medium'>{c.name}</TableCell>
            {c.participants.map((n, i) => (
              <TableCell key={i} className='font-medium'>
                {n}
              </TableCell>
            ))}
            <TableCell className='font-bold text-center'>{c.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          {data.categories.map((n, i) => (
            <TableCell className='font-bold' key={i}>
              {n}
            </TableCell>
          ))}
          <TableCell className='text-center font-bold'>
            {data.overall}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default DoubleTable
