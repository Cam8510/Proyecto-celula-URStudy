import type { ReactNode } from 'react'
// @ts-ignore - the stylesheet is declared by the project's Vite setup
import './DataTable.css'

export interface Column<T> {
  header: string
  render: (row: T) => ReactNode   // cómo dibujar la celda de esta columna
}

interface DataTableProps<T> {
  columns: Column<T>[]
  rows: T[]
  getKey: (row: T) => string | number
  emptyMessage?: string
}

function DataTable<T>({ columns, rows, getKey, emptyMessage = 'No hay datos para mostrar.' }: DataTableProps<T>) {
  if (rows.length === 0) return <p className="table__empty">{emptyMessage}</p>

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            {columns.map((c) => <th key={c.header}>{c.header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getKey(row)}>
              {columns.map((c) => <td key={c.header}>{c.render(row)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable