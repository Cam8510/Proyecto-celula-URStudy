// @ts-ignore - the stylesheet is declared by the project's Vite setup
import './FilterTabs.css'

interface FilterTabsProps {
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
}

function FilterTabs({ label, options, value, onChange }: FilterTabsProps) {
  return (
    <div className="tabs" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={value === o.value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

export default FilterTabs