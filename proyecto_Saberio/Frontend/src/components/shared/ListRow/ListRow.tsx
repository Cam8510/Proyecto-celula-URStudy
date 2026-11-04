import type { ReactNode } from 'react'
import './ListRow.css'

interface ListRowProps {
  leading?: ReactNode
  title: string
  subtitle?: string
  trailing?: ReactNode
}

function ListRow({ leading, title, subtitle, trailing }: ListRowProps) {
  return (
    <div className="row">
      {leading}
      <div className="row__text">
        <b>{title}</b>
        {subtitle && <span>{subtitle}</span>}
      </div>
      {trailing}
    </div>
  )
}

export default ListRow