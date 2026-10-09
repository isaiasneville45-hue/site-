/**
 * Pré-renderização (SSG): gera o HTML da página no build, para o conteúdo
 * aparecer antes do JavaScript carregar (melhor para SEO e para o Lighthouse).
 *
 * Roda depois de `vite build` (cliente) e `vite build --ssr` (dist-ssr/).
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

const templatePath = path.join(distDir, 'index.html')
const template = await fs.readFile(templatePath, 'utf8')

if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: <div id="root"></div> não encontrado em dist/index.html')
}

const appHtml = render()

// Sem JavaScript, os blocos com animação de entrada (que começam invisíveis)
// precisam aparecer mesmo assim.
const noscriptStyle =
  '<noscript><style>[style*="opacity:0"]{opacity:1!important;transform:none!important}</style></noscript>'

const html = template
  .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  .replace('</head>', `    ${noscriptStyle}\n  </head>`)

// Toda imagem local referenciada na página (src/srcset) precisa existir em dist/.
const localImages = new Set(
  [...html.matchAll(/\b(?:src|srcset|imagesrcset)="([^"]+)"/gi)]
    .flatMap(([, value]) => value.split(',').map((part) => part.trim().split(/\s+/)[0]))
    .filter((url) => url.startsWith('/') && !url.startsWith('//') && /\.(webp|png|jpe?g|svg|avif)$/i.test(url)),
)
const missing = []
for (const url of localImages) {
  await fs.access(path.join(distDir, decodeURI(url))).catch(() => missing.push(url))
}
if (missing.length) {
  throw new Error(`prerender: imagens não encontradas em public/:\n  ${missing.join('\n  ')}`)
}

await fs.writeFile(templatePath, html)
await fs.rm(ssrDir, { recursive: true, force: true })

console.log(`prerender: dist/index.html gerado (${(Buffer.byteLength(html) / 1024).toFixed(1)} kB)`)
