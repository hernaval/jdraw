'use client'

import React, { HTMLAttributes, ReactNode } from 'react'
import { Button } from '../ui/button'

export interface ActionButtonProps {
  label: string
  icon?: ReactNode
  variant?: any
  onClick?: () => void
}
const ActionButton: React.FC<ActionButtonProps & HTMLAttributes<any>> = ({
  label,
  variant = 'default',
  icon,
  onClick,
  ...props
}) => {
  return (
    <div>
      <Button variant={variant} onClick={onClick} {...props}>
        {icon} {label}
      </Button>
    </div>
  )
}

export default ActionButton
