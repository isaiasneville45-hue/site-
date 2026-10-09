import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'

import App from './App.tsx'

/** Usado no build (scripts/prerender.mjs) para gerar o HTML estático da página. */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
