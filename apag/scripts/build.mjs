/**
 * Build de produção:
 *   1. build do cliente (dist/)
 *   2. build de SSR só para gerar o HTML (dist-ssr/, apagado no fim)
 *   3. pré-renderização do index.html (scripts/prerender.mjs)
 *
 * A data do build é fixada aqui para os dois builds usarem a mesma
 * (ela entra no cálculo dos "anos de mercado").
 */
import { build } from 'vite'

process.env.APAG_BUILD_DATE ??= new Date().toISOString().slice(0, 10)

await build()
await build({ logLevel: 'warn', build: { ssr: 'src/entry-server.tsx', outDir: 'dist-ssr' } })
await import('./prerender.mjs')
