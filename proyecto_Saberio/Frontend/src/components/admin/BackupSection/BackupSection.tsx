import { useState } from 'react'
import Button from '../../Button/Button'

function BackupSection() {
  const [state, setState] = useState<'idle' | 'working' | 'done'>('idle')

  const createBackup = () => {
    setState('working')
    setTimeout(() => setState('done'), 2000)   // simula que tarda 2 segundos
  }

  return (
    <div>
      <b>Respaldo de datos</b>
      <p style={{ margin: '6px 0 10px', fontSize: 14 }}>
        Último respaldo: <b>Hoy, 2:00 AM</b>. Próximo respaldo automático en 22 horas.
      </p>
      <Button variant="secondary" loading={state === 'working'} loadingText="Creando respaldo..." onClick={createBackup}>
        {state === 'done' ? 'Respaldo creado ✅' : 'Crear respaldo ahora'}
      </Button>
    </div>
  )
}

export default BackupSection