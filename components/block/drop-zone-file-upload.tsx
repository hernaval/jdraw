'use client'

import React, { Suspense, useEffect, useRef, useState } from 'react'
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
} from '../ui/dialog'
import { sendDelegationList } from '@/feature/delegation/send-delegation-list'
import { formatDateAs } from '@/lib/date'
import { useFormState } from 'react-dom'
import { useParams } from 'next/navigation'

const initialState = {
  code: 200,
  message: '',
}
const DropZoneFileUpload = () => {
  const competition: any = useParams()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [athlets, setAthlets] = useState<AthletEntity[]>([])
  const formRef = useRef<HTMLFormElement | null>(null)
  const sendAsAthletList = sendDelegationList.bind(null, athlets)
  const [state, formAction] = useFormState(sendAsAthletList, initialState)
  const handleFileUpload = async (file: File) => {
    const read = new Promise((resolve, reject) => {
      readXlsxFile(file).then(rows => {
        if (!isFileValid(rows)) {
          reject()
        }
        const sheetRows: AthletEntity[] = []
        for (let i = 8; i < rows.length; i++) {
          sheetRows.push({
            id: i,
            club: { id: Number(rows[0][1]) },
            firstname: rows[i][0].toString(),
            lastname: rows[i][1].toString(),
            photoUrl: '',
            sex: rows[i][3].toString(),
            weight: rows[i][4].toString(),
            birthdate: rows[i][2].toString(),
            competition: competition.name,
          })
        }
        resolve(sheetRows)
      })
    })

    read
      .then(rows => {
        setAthlets(rows as AthletEntity[])
      })
      .catch(e => {
        toast({
          variant: 'destructive',
          title: 'Erreur de format',
          description:
            'Veuillez vérifier que le document est conforme au format attendu.',
          duration: 5000,
        })
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

  const sendList = () => {
    setIsOpen(false)
    formRef.current?.requestSubmit()
  }

  useEffect(() => {
    if (state.code == 201) {
      toast({
        variant: 'default',
        title: 'Traitement terminé',
        duration: 3000,
        description:
          "La liste d'engagement de cette délégation est désormais validée et fermée.",
      })
    }
  }, [state.code])

  return (
    <div>
      <DropFileUploader
        accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        icon={<ScrollText />}
        label='Charger le document engagement'
        onDrop={handleFileUpload}
      />

      {athlets.length > 0 && (
        <Suspense fallback={'Loading...'}>
          <form className='mt-8' action={formAction} ref={formRef}>
            <h2 className='text-2xl '>Liste d'engagement </h2>
            <Editable
              header={[
                'Nom',
                'Prénoms',
                'Date de naissance',
                'Sexe',
                'Catégorie',
              ]}>
              {athlets.map((a, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Input
                      type='text'
                      defaultValue={a.firstname}
                      name='firstname'
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type='text'
                      defaultValue={a.lastname}
                      name='firstname'
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type='text'
                      defaultValue={formatDateAs(a.birthdate, 'dd/MM/yyyy')}
                      name='birthdate'
                    />
                  </TableCell>
                  <TableCell>{a.sex}</TableCell>
                  <TableCell>{a.weight}</TableCell>
                </TableRow>
              ))}
            </Editable>

            <div className='flex items-center justify-end mt-2'>
              <Button type='button' onClick={() => setIsOpen(!isOpen)}>
                Envoyer et valider
              </Button>
            </div>
            <Dialog open={isOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className='text-destructive'>
                    Etes-vous sûr de vouloir continuer ?
                  </DialogTitle>
                  <DialogDescription>
                    Cette action validera la liste d'engagement de la délégation
                    de ce Club. Une fois envoyée, cette ne sera en aucun cas
                    modifiable
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className='sm:justify-start mt-4 gap-1'>
                  <DialogClose asChild>
                    <Button type='button' variant='secondary'>
                      Non, j'annulle
                    </Button>
                  </DialogClose>
                  <Button
                    type='button'
                    variant='destructive'
                    onClick={sendList}>
                    Oui, je suis sûr
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </form>
        </Suspense>
      )}
    </div>
  )
}

export default DropZoneFileUpload
