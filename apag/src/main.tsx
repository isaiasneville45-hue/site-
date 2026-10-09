import { StrictMode, startTransition } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

// Fontes (Google Fonts empacotadas pelo @fontsource, com font-display: swap)
import '@fontsource-variable/open-sans/wght.css'
import '@fontsource/michroma/400.css'
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
