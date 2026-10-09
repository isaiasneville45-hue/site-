import fs from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { seoPlugin } from './seo.ts'

// Data do build (AAAA-MM-DD). O script de build fixa APAG_BUILD_DATE para que
// o build do cliente e o da pré-renderização usem exatamente a mesma data.
const buildDate = process.env.APAG_BUILD_DATE ?? new Date().toISOString().slice(0, 10)

/**
 * Fonte Mokoto: o @font-face só entra no HTML quando public/fonts/Mokoto.woff2
 * existe. Sem o arquivo, o navegador usaria uma requisição que dá 404 antes de
 * cair na Michroma.
 */
function mokotoFontPlugin(): Plugin {
  const file = path.resolve(import.meta.dirname, 'public/fonts/Mokoto.woff2')
  return {
    name: 'apag-mokoto-font',
    transformIndexHtml: {
      order: 'post',
      handler() {
        if (!fs.existsSync(file)) return []
        const css =
          "@font-face{font-family:'Mokoto';src:url('/fonts/Mokoto.woff2') format('woff2');font-weight:400;font-style:normal;font-display:swap}"
        return [
          {
            tag: 'link',
            attrs: { rel: 'preload', href: '/fonts/Mokoto.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
            injectTo: 'head',
          },
          { tag: 'style', children: css, injectTo: 'head' },
        ]
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss(), seoPlugin(), mokotoFontPlugin()],
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
