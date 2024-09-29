'use client'

import React, { useState } from 'react'
import DropFileUploader from '../form/drop-file-uploader'
import { ScrollText } from 'lucide-react'
import readXlsxFile from 'read-excel-file'
import { useToast } from '@/hooks/use-toast'
import { AthletEntity } from '@/types/model/athlet'
const DropZoneFileUpload = () => {
  const { toast } = useToast()
  const [athlets, setAthlets] = useState<AthletEntity[]>([])
  const handleFileUpload = (file: File) => {
    readXlsxFile(file).then(rows => {
      if (!isFileValid(rows)) {
        toast({
          variant: 'destructive',
          title: 'Erreur de format',
          description:
            'Veuillez vérifier que le document est conforme au format attendu.',
          duration: 5000,
        })
      }
      const sheetRows: AthletEntity[] = []
      for (let i = 8; i < rows.length; i++) {
        sheetRows.push({
          id: i,
          club: { id: 0, name: 'CJC' },
          firstname: rows[i][0].toString(),
          lastname: rows[i][1].toString(),
          photoUrl: '',
          sex: rows[i][3].toString(),
          weight: rows[i][4].toString(),
        })
      }

      console.log(sheetRows)
    })
  }

  const isFileValid = (rows: any[][]): boolean => {
    if (
      rows[0][0] != 'CLUB' ||
      rows[1][0] != 'LIGUE' ||
      rows[2][0] != 'CONTACT' ||
      rows[3][0] != 'COMPETITION'
    ) {
      return false
    }
    return true
  }
  return (
    <div>
      <DropFileUploader
        accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        icon={<ScrollText />}
        label="Charger le document d'engagement"
        onDrop={handleFileUpload}
      />

      <div></div>
    </div>
  )
}

export default DropZoneFileUpload
