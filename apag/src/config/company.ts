/**
 * Dados da empresa: fonte única para todo o site.
 *
 * Contato, rodapé, formulário, botões de WhatsApp, SEO e JSON-LD leem daqui.
 * Para encontrar o que falta preencher, procure por "TODO" neste arquivo.
 *
 * Atenção: este arquivo também é lido pelo `seo.ts` (vite.config), que gera
 * as meta tags e o JSON-LD do index.html no build. Por isso ele não pode
 * importar nada.
 */

export type Stat = {
  /** Valor numérico do contador. `null` = ainda não preenchido (mostra placeholder). */
  value: number | null
  prefix?: string
  suffix?: string
  label: string
}

const FOUNDED_AT = '1998-05-26'

/** Data do build, injetada pelo Vite (`define` no vite.config.ts). */
declare const __BUILD_DATE__: string | undefined
const BUILD_DATE = typeof __BUILD_DATE__ === 'string' ? new Date(`${__BUILD_DATE__}T12:00:00`) : new Date()

/**
 * Anos completos desde a fundação. Usa a data do build para o HTML
 * pré-renderizado e o navegador mostrarem o mesmo número; cada novo deploy
 * atualiza a contagem ("28+" continua verdadeiro mesmo sem deploy).
 */
export function yearsInBusiness(now: Date = BUILD_DATE): number {
  const [y, m, d] = FOUNDED_AT.split('-').map(Number)
  let years = now.getFullYear() - y
  const beforeAnniversary = now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d)
  if (beforeAnniversary) years -= 1
  return years
}

// ── Números (seção de contadores) ────────────────────────────────────
// Não invente números: deixe `value: null` até ter o dado real.
const stats: Stat[] = [
  { value: yearsInBusiness(), suffix: '+', label: 'anos de mercado' },
  { value: null, suffix: '+', label: 'clientes atendidos' }, // TODO
  { value: null, suffix: '+', label: 'extintores recarregados por ano' }, // TODO
  { value: null, label: 'cidades atendidas' }, // TODO
]

export const company = {
  // ── Dados cadastrais ───────────────────────────────────────────────
  legalName: 'Apag Produtos e Serviços LTDA',
  name: 'APAG',
  cnpj: '02.591.012/0001-63',
  foundedAt: FOUNDED_AT,
  foundedAtLabel: '26/05/1998',
  foundedYear: 1998,
  size: 'Empresa de Pequeno Porte',
  establishment: 'Matriz',
  status: 'Ativa',
  activity: 'Instalação e manutenção de sistemas de prevenção e combate a incêndio',

  // ── Logo ───────────────────────────────────────────────────────────
  /** Arquivo da logo (chama + "APAG"). Enquanto não existir, o site mostra um placeholder. */
  logoSrc: '/logo-apag.svg', // TODO adicionar public/logo-apag.svg

  // ── Textos institucionais ──────────────────────────────────────────
  tagline: 'Segurança contra incêndio do projeto à manutenção.',
  shortAbout: 'Instalação e manutenção de sistemas de prevenção e combate a incêndio desde 1998.',
  seoTitle: 'APAG | Extintores, Alarme, Hidrantes e Sinalização de Incêndio em Joinville/SC',
  seoDescription:
    'Extintores, hidrantes, alarme de incêndio, sinalização e iluminação de emergência em Joinville/SC. Produtos, instalação e manutenção com a APAG, desde 1998.',

  // ── Contato ────────────────────────────────────────────────────────
  phone: '(47) 3425-8735',
  phoneHref: 'tel:+554734258735',
  /** Só números, com DDI 55 → https://wa.me/554734258735 */
  whatsapp: '554734258735',
  whatsappMessage: 'Olá, APAG! Vim pelo site e gostaria de solicitar um orçamento.',
  email: 'apag@apag.com.br',
  hours: 'Seg a Sex, 8h às 18h', // TODO confirmar o horário de atendimento
  instagram: '', // TODO (URL completa, ex.: https://www.instagram.com/apag)

  // ── Endereço e mapa ────────────────────────────────────────────────
  address: {
    street: 'Rua Guilherme, 1300',
    district: 'Costa e Silva',
    city: 'Joinville',
    state: 'SC',
    zip: '89218-500',
    country: 'Brasil',
  },
  addressLine: 'Rua Guilherme, 1300 – Costa e Silva, Joinville/SC – CEP 89218-500',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Rua+Guilherme,+1300,+Costa+e+Silva,+Joinville+-+SC,+89218-500&output=embed',
  mapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Rua+Guilherme,+1300,+Costa+e+Silva,+Joinville+-+SC,+89218-500',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Rua+Guilherme,+1300,+Costa+e+Silva,+Joinville+-+SC,+89218-500',
  /** Coordenadas para o JSON-LD (schema.org GeoCoordinates). Fonte: OpenStreetMap/Nominatim (nº 1300). */
  geo: { latitude: -26.2741464, longitude: -48.8677053 } as { latitude: number; longitude: number } | null,

  // ── Extras usados no site ──────────────────────────────────────────
  /** Região atendida (FAQ e JSON-LD). */
  serviceArea: 'Joinville e região',
  /** Domínio final do site (sem barra no fim). Usado em canonical, Open Graph e JSON-LD. */
  siteUrl: 'https://www.apag.com.br', // TODO
  /** Horário no formato schema.org para o JSON-LD (ex.: "Mo-Fr 08:00-18:00"). */
  openingHoursSchema: ['Mo-Fr 08:00-18:00'], // TODO (deve bater com `hours`)

  // ── Números (seção de contadores, definidos no topo do arquivo) ────
  stats,
}

export type Company = typeof company
