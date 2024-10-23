import React, { HTMLAttributes } from 'react'
import ActionButton, { ActionButtonProps } from './action-button'
import Link from 'next/link'

interface LinkButtonProps {
  href: string
}
const LinkButton: React.FC<
  LinkButtonProps & ActionButtonProps & HTMLAttributes<HTMLDivElement>
> = ({ href, label, icon, variant = 'default', ...props }) => {
  return (
    <Link href={href}>
      <ActionButton label={label} icon={icon} variant={variant} {...props} />
    </Link>
  )
}

export default LinkButton