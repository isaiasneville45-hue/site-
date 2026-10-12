import { StrictMode, startTransition } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

// As fontes (Barlow Semi Condensed e Inter) vêm do Google Fonts, no index.html.
import './index.css'

import App from './App.tsx'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

if (container.hasChildNodes()) {
  // Build de produção: o HTML já vem pré-renderizado, só hidratamos.
  // startTransition divide a hidratação em pedaços e não trava a thread principal.
  startTransition(() => {
    hydrateRoot(container, app)
  })
} else {
  // Servidor de desenvolvimento
  createRoot(container).render(app)
}
