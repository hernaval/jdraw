'use client'
import React, { useCallback, useRef, useState } from 'react'
import { FileDrop } from 'react-file-drop'

interface DropFileUploaderProps {
  onDrop: (file: File) => void
  icon: React.ReactNode
  label: string
  accept: string
}

const DropFileUploader: React.FC<DropFileUploaderProps> = ({
  onDrop,
  icon,
  label,
  accept,
}) => {
  const fileInputRef = useRef<any>(null)
  const [file, setFile] = useState<File | null>(null)
  const onFileInputChange = ({ target }: any) => {
    handleFileAdded(target.files)
  }
  const onTargetClick = () => {
    if (fileInputRef.current) fileInputRef.current!.click()
  }
  const handleFileAdded = useCallback(
    (files: FileList) => {
      // console.log("file here", files)
      setFile(files[0])
      if (onDrop) {
        onDrop(files[0]!!)
      }
    },
    [onDrop]
  )

  return (
    <div className='border-2 border-gray-300 border-dashed rounded-lg cursor-pointer'>
      <input
        onChange={onFileInputChange}
        ref={fileInputRef}
        type='file'
        accept={accept ?? '*/*'}
        hidden
      />
      <FileDrop
        targetClassName='w-full flex flex-col items-center text-center py-24 '
        draggingOverTargetClassName='shadow-lg  text-accent bg-gray-200'
        onTargetClick={onTargetClick}
        onDrop={(files, event) => handleFileAdded(files!!)}>
        <div className='mt-3'>{icon}</div>

        {!file && (
          <p className='mb-2 text-sm text-gray-500'>
            <span className='font-semibold'>
              {label ?? 'Glissez-deposez vos fichier ici'}
            </span>
            <br />
            <span>ou</span>
            <br />
            <span>Cliquez pour choisir</span>
          </p>
        )}
        <div className='text-gray-500'>{file && <div>{file.name}</div>}</div>
      </FileDrop>
    </div>
  )
}

export default DropFileUploader
