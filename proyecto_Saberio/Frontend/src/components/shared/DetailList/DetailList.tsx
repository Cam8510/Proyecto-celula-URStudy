// @ts-ignore - the stylesheet is declared by the project's Vite setup
import './DetailList.css'

interface DetailListProps {
  items: { label: string; value: string }[]
}

function DetailList({ items }: DetailListProps) {
  return (
    <dl className="detail-list">
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default DetailList