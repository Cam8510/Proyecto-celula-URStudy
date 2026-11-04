// @ts-ignore - Vite gestiona las importaciones de hojas de estilo.

import './StatCard.css'

interface StatCardProps {
  value: string | number
  label: string
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="stat-card">
      <b>{value}</b>
      <span>{label}</span>
    </div>
  )
}

export default StatCard