'use client'

import { Network, Table2, Bolt, Info, Plus, Settings } from 'lucide-react'
import React, { useRef, useState } from 'react'
import DrawFormatCard from './draw-format-card'
import { DrawFormatEnum } from '@/types/model/draw-format'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Separator } from '../ui/separator'
import StageConfig from './stage-config'
import { Stage } from '@/types/model/Stage'
import { useToast } from '@/hooks/use-toast'
import { FieldArray, Form, Formik } from 'formik'
import { Button } from '../ui/button'
import stageValidation from '../feature/stageValidation'
import { useStageStore } from '@/lib/store/stage-ranked-store'

const formatGuide = {
  0: 'Elimation explication',
  1: 'Round robin',
  2: 'Custom',
}

// const rankedParticipants: SelectBoxData[] = [
//   { id: 1, label: '1er', group: '1', value: '1st' },
//   { id: 2, label: '2e', group: '1', value: '1er' },
//   { id: 3, label: '3e', group: '1', value: '2e' },
//   { id: 4, label: '4e', group: '1', value: '4e' },
//   { id: 5, label: '1er', group: '2', value: '1st' },
//   { id: 6, label: '2e', group: '2', value: '1er' },
//   { id: 7, label: '3e', group: '2', value: '2e' },
// ]

// const selected: StageRankedGroup[] = [
//   {
//     stageId: 1,
//     rankingFromStage: [
//       { id: 0, selected: ['1st', '3rd'] },
//       { id: 1, selected: ['2nd'] },
//     ],
//   },
//   {
//     stageId: 2,
//     rankingFromStage: [
//       { id: 0, selected: ['1st', '3rd'] },
//       { id: 1, selected: ['2nd'] },
//     ],
//   },
// ]

const initialStage: { [key: string]: Stage[] } = {
  stages: [
    {
      isFinal: false,
      format: 'elimination',
      nbParticipants: 0,
    },
  ],
}

interface DrawFormatSelectorProps {
  athletsCount: number
}
const DrawFormatSelector: React.FC<DrawFormatSelectorProps> = ({
  athletsCount,
}) => {
  const drawRef = useRef(null)
  const { toast } = useToast()
  const { selected } = useStageStore()
  const [drawFormat, setDrawFormat] = useState<DrawFormatEnum>(
    DrawFormatEnum.ELIMINATION
  )
  const handleCustomFormat = () => {
    setDrawFormat(DrawFormatEnum.CUSTOM)
  }

  const addStage = (push: any) => {
    if (
      drawFormat == DrawFormatEnum.ELIMINATION ||
      drawFormat == DrawFormatEnum.ROUND_ROBIN
    ) {
      toast({
        variant: 'default',
        title: 'Action non supportée',
        description:
          "Ce format à tour unique ne permet pas l'ajout de nouveaux tours. Utilisez le format personnalisé",
        duration: 3000,
      })
      return
    }
    const newStage: Stage = {
      isFinal: false,
      format: 'elimination',
      nbParticipants: 0,
    }

    push(newStage)
  }

  const createStages = async (values: any) => {
    const stages: Stage[] = values.stages
    if (drawFormat == DrawFormatEnum.CUSTOM) {
      createStagesForCustom(stages)
    }
    stages.forEach((s, index) => {
      if (s.isFinal) {
        const ranking = selected.find(ranking => ranking.stageId == index)
        if (ranking) {
          s.rankedParticipants = ranking
        }
      }
    })

    console.log('from values after ranked', stages)
  }

  const createStagesForCustom = (stages: Stage[]) => {
    if (stageValidation.customFormatOnlyOneStage(stages)) {
      toast({
        title: 'Problème de configuration',
        description: `
        Ajouter au moins un 2e tour pour ce type personnalisé
        `,
        variant: 'destructive',
      })
      return
    }

    if (
      stageValidation.someAthletNotPresentNonFinalStage(stages, athletsCount)
    ) {
      toast({
        title: 'Participants non valides',
        description: `
        Vérifier si le nombre de participants alloués aux tours est différents du total des athlètes
        `,
        variant: 'destructive',
      })
      return
    }

    if (stageValidation.customFormatWithNoFinalStage(stages)) {
      toast({
        title: 'Absence de tour final',
        description: `
        Ajouter au moins un tour final pour ce type personnalisé
        `,
        variant: 'destructive',
      })
      return
    }

    if (stageValidation.someStagesAfterAFinalStageNotFinal(stages)) {
      toast({
        title: 'Problème de configuration',
        description: `
        Tous les tours après une 1ère phase finale doivent être des phases finales
        `,
        variant: 'destructive',
      })
      return
    }
  }

  return (
    <div>
      <Alert className='mt-4'>
        <Info className='h-4 w-4' />
        <AlertTitle> Guide des formats</AlertTitle>
        <AlertDescription>{formatGuide[drawFormat]}</AlertDescription>
      </Alert>

      <div className='flex flex-col  gap-8 md:flex-row mt-16'>
        <DrawFormatCard
          onClick={() => setDrawFormat(DrawFormatEnum.ELIMINATION)}
          active={drawFormat == DrawFormatEnum.ELIMINATION}
          icon={<Network />}
          title='Elimination directe'
        />
        <DrawFormatCard
          onClick={() => setDrawFormat(DrawFormatEnum.ROUND_ROBIN)}
          active={drawFormat == DrawFormatEnum.ROUND_ROBIN}
          icon={<Table2 />}
          title='Round robin'
        />
        <DrawFormatCard
          onClick={handleCustomFormat}
          active={drawFormat == DrawFormatEnum.CUSTOM}
          icon={<Bolt />}
          title='Personnalisé'
        />
      </div>

      <div>
        <div className='flex  justify-between mt-16 '>
          <div className='flex gap-1  items-center'>
            <h4 className='text-xl'>Configuration </h4>
            <Settings size={24} />
          </div>
          <Button
            type='button'
            onClick={() => {
              const ref: any = drawRef.current
              if (ref) ref.submitForm()
            }}>
            Enregistrer
          </Button>
        </div>
        <Separator className='my-4' />

        <Formik
          initialValues={initialStage}
          onSubmit={createStages}
          innerRef={drawRef}>
          {({ values }) => (
            <Form>
              <FieldArray name='stages'>
                {({ insert, push, remove }) => (
                  <div className='grid grid-cols-4 gap-4'>
                    {values.stages.length > 0 &&
                      values.stages.map((stage, index) => (
                        <StageConfig
                          key={index}
                          stage={{ ...stage, id: index }}
                        />
                      ))}
                    <div
                      className='border flex items-center justify-center cursor-pointer w-[350px] py-4'
                      onClick={() => addStage(push)}>
                      <div className='flex flex-col items-center justify-center'>
                        <Plus size={70} color='gray' />
                        <p className='text-sm text-muted-foreground'>
                          Ajouter un nouveau tour
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </FieldArray>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default DrawFormatSelector
