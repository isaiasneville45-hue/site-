import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import { company } from './src/config/company.ts'
import { services } from './src/config/services.ts'

/**
 * SEO gerado a partir de `src/config/company.ts`:
 * - meta tags, Open Graph e JSON-LD (LocalBusiness) no index.html (dev e build);
 * - robots.txt, sitemap.xml e llms.txt no build.
 */
export function seoPlugin(): Plugin {
  return {
    name: 'apag-seo',
    generateBundle(options) {
      if (this.environment?.config.consumer === 'server' || options.dir?.endsWith('dist-ssr')) return
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: renderRobots() })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: renderSitemap() })
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: renderLlmsTxt() })
    },
    transformIndexHtml(html) {
      return html
        .replace('<!--seo-->', renderSeoTags())
        .replace(
          '<!--noscript-->',
          `<noscript><p style="padding:24px;color:#fff;font-family:sans-serif">${escapeAttr(
            `${company.legalName} — ${company.activity}. Ative o JavaScript para ver o site completo.`,
          )}</p></noscript>`,
        )
    },
  }
}

const escapeAttr = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function renderSeoTags(): string {
  const url = siteUrl()
  const ogImage = `${url}/og-image.jpg`
  const { address } = company

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${url}/#empresa`,
    name: company.name,
    legalName: company.legalName,
    description: company.seoDescription,
    url,
    // Logo oficial quando existir em public/; até lá, o ícone da chama.
    logo: fs.existsSync(path.resolve(import.meta.dirname, 'public/logo-apag.svg'))
      ? `${url}/logo-apag.svg`
      : `${url}/apple-touch-icon.png`,
    image: ogImage,
    taxID: company.cnpj,
    foundingDate: company.foundedAt,
    telephone: company.phoneHref.replace(/^tel:/, ''),
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${address.street} – ${address.district}`,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.zip,
      addressCountry: 'BR',
    },
    geo: company.geo ? { '@type': 'GeoCoordinates', ...company.geo } : undefined,
    hasMap: company.mapsUrl,
    areaServed: company.serviceArea,
    openingHours: company.openingHoursSchema,
    sameAs: [company.instagram].filter(Boolean),
    knowsAbout: [
      'Extintores de incêndio',
      'Sistemas de hidrantes',
      'Alarme de incêndio',
      'Sinalização de emergência',
      'Iluminação de emergência',
      'PPCI',
    ],
  }

  const meta: Array<[string, string, string]> = [
    ['name', 'description', company.seoDescription],
    ['property', 'og:type', 'website'],
    ['property', 'og:locale', 'pt_BR'],
    ['property', 'og:site_name', company.name],
    ['property', 'og:title', company.seoTitle],
    ['property', 'og:description', company.seoDescription],
    ['property', 'og:url', `${url}/`],
    ['property', 'og:image', ogImage],
    ['property', 'og:image:type', 'image/jpeg'],
    ['property', 'og:image:width', '1200'],
    ['property', 'og:image:height', '630'],
    ['property', 'og:image:alt', `${company.name} — ${company.tagline}`],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', company.seoTitle],
    ['name', 'twitter:description', company.seoDescription],
    ['name', 'twitter:image', ogImage],
  ]

  return [
    `<title>${escapeAttr(company.seoTitle)}</title>`,
    ...meta.map(([attr, key, content]) => `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`),
    `<link rel="canonical" href="${url}/" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}

const siteUrl = () => company.siteUrl.replace(/\/$/, '')

function renderRobots(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl()}/sitemap.xml\n`
}

function renderSitemap(): string {
  const lastmod = process.env.APAG_BUILD_DATE ?? new Date().toISOString().slice(0, 10)
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl()}/</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`
}

/** Resumo em Markdown para buscadores e assistentes de IA (https://llmstxt.org). */
function renderLlmsTxt(): string {
  const url = siteUrl()
  return `# ${company.legalName}

> ${company.name}: ${company.activity.toLowerCase()} desde ${company.foundedYear}.

- CNPJ: ${company.cnpj}
- Fundação: ${company.foundedAtLabel}
- Região atendida: ${company.serviceArea}
- Telefone: ${company.phone}
- E-mail: ${company.email}
- Endereço: ${company.addressLine} ([mapa](${company.mapsUrl}))
- Horário: ${company.hours}

## Serviços

${services.map((s) => `- ${s.title}: ${s.description}`).join('\n')}

## Links

- [Site](${url}/)
- [Serviços](${url}/#servicos)
- [Perguntas frequentes](${url}/#faq)
- [Contato e orçamento](${url}/#contato)
- [WhatsApp](https://wa.me/${company.whatsapp.replace(/\D/g, '')})
`
}
