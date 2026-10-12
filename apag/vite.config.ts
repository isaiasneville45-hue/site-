import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { seoPlugin } from './seo.ts'

// Data do build (AAAA-MM-DD). O script de build fixa APAG_BUILD_DATE para que
// o build do cliente e o da pré-renderização usem exatamente a mesma data.
const buildDate = process.env.APAG_BUILD_DATE ?? new Date().toISOString().slice(0, 10)

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss(), seoPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  define: {
    __BUILD_DATE__: JSON.stringify(buildDate),
    __BUILD_YEAR__: Number(buildDate.slice(0, 4)),
  },
  ssr: {
    // Empacota tudo no bundle de pré-renderização (evita problemas de ESM/CJS no Node).
    noExternal: true,
  },
  build: {
    rolldownOptions: isSsrBuild
      ? {}
      : {
          output: {
            // React e Framer Motion em chunks próprios: o código do site fica menor e
            // as bibliotecas continuam em cache entre um deploy e outro.
            codeSplitting: {
              groups: [
                { name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
                { name: 'motion', test: /node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/ },
              ],
            },
          },
        },
  },
}))
