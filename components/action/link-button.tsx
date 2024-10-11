import React from 'react'
import ActionButton, { ActionButtonProps } from './action-button'
import Link from 'next/link'

interface LinkButtonProps {
  href: string
}
const LinkButton: React.FC<LinkButtonProps & ActionButtonProps> = ({
  href,
  label,
  icon,
  variant = 'default',
}) => {
  return (
    <Link href={href}>
      <ActionButton label={label} icon={icon} variant={variant} />
    </Link>
  )
}

export default LinkButton
