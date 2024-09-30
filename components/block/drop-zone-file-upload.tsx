'use client'

import React, { Suspense, useRef, useState } from 'react'
import DropFileUploader from '../form/drop-file-uploader'
import { ScrollText } from 'lucide-react'
import readXlsxFile from 'read-excel-file'
import { useToast } from '@/hooks/use-toast'
import { AthletEntity } from '@/types/model/athlet'
import Editable from './Editable'
import { TableCell, TableRow } from '../ui/table'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { sendDelegationList } from '@/feature/delegation/send-delegation-list'
const DropZoneFileUpload = () => {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [athlets, setAthlets] = useState<AthletEntity[]>([])
  const formRef = useRef<HTMLFormElement | null>(null)
  // const handleFileUpload = async (file: File) => {
  //   const read = new Promise((resolve, reject) => {

  //     readXlsxFile(file).then(rows => {
  //       if (!isFileValid(rows)) {
  //         reject()
  //       }
  //       const sheetRows: AthletEntity[] = []
  //     for (let i = 8; i < rows.length; i++) {
  //       sheetRows.push({
  //         id: i,
  //         club: { id: Number(rows[0][1]) },
  //         firstname: rows[i][0].toString(),
  //         lastname: rows[i][1].toString(),
  //         photoUrl: '',
  //         sex: rows[i][3].toString(),
  //         weight: rows[i][4].toString(),
  //         birthdate: rows[i][2].toString()
  //       })
  //     }
  //     resolve(sheetRows)
  //   })
  // })

  // read.then(rows => {
  //   setAthlets(rows as AthletEntity[])
  // }).catch(e => {
  //   toast({
  //     variant: 'destructive',
  //     title: 'Erreur de format',
  //     description:
  //     'Veuillez vérifier que le document est conforme au format attendu.',
  //     duration: 5000,
  //   })
  // })
  // }

  // const isFileValid = (rows: any[][]): boolean => {
  //   if (
  //     rows[0][0] != 'CLUB' ||
  //     rows[1][0] != 'LIGUE' ||
  //     rows[2][0] != 'CONTACT' ||
  //     rows[3][0] != 'COMPETITION'
  //   ) {
  //     return false
  //   }
  //   return true
  // }

  const sendList = () => {
    setIsOpen(false)
    formRef.current?.requestSubmit()
  }

  const sendAsAthletList = sendDelegationList.bind(null, athlets)

  return (
    <div>
      {/* <DropFileUploader
        accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        icon={<ScrollText />}
        label="Charger le document engagement"
        onDrop={handleFileUpload}
      /> */}
    </div>
  )
}

export default DropZoneFileUpload
