'use client'

import React, { ReactNode } from 'react'
import { Button } from '../ui/button'

export interface ActionButtonProps {
  label: string
  icon?: ReactNode
  variant?: any
  onClick?: () => void
}
const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  variant = 'default',
  icon,
  onClick,
}) => {
  return (
    <div>
      <Button variant={variant} onClick={onClick}>
        {icon} {label}
      </Button>
    </div>
  )
}

export default ActionButton
