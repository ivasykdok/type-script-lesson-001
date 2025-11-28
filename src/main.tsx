import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './serverApp.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <serverApp />
  </StrictMode>,
)
