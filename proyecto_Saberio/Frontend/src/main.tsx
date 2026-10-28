import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// @ts-ignore: Vite procesa las hojas de estilo globales sin declarar módulos CSS.
import './styles/global.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)