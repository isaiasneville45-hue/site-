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
  seoTitle: 'APAG | Prevenção e combate a incêndio desde 1998',
  seoDescription:
    'Instalação e manutenção de extintores, hidrantes, alarmes, sinalização e iluminação de emergência. Regularize seu imóvel junto ao Corpo de Bombeiros com a APAG, desde 1998.',

  // ── Contato ────────────────────────────────────────────────────────
  phone: '(00) 0000-0000', // TODO
  whatsapp: '5500000000000', // TODO (só números, com DDI)
  whatsappMessage: 'Olá, APAG! Gostaria de solicitar um orçamento.',
  email: 'contato@apag.com.br', // TODO
  address: 'Rua Exemplo, 000 – Bairro, Cidade/SC', // TODO
  hours: 'Seg a Sex, 8h às 18h', // TODO
  instagram: '', // TODO (URL completa, ex.: https://www.instagram.com/apag)
  mapsEmbedUrl: '', // TODO (Google Maps → Compartilhar → Incorporar um mapa → copie só o valor de src)

  // ── Extras usados no site ──────────────────────────────────────────
  /** Região atendida, citada no FAQ. */
  serviceArea: 'Cidade/SC e região', // TODO
  /** Domínio final do site (sem barra no fim). Usado em canonical, Open Graph e JSON-LD. */
  siteUrl: 'https://www.apag.com.br', // TODO
  /** Horário no formato schema.org para o JSON-LD (ex.: "Mo-Fr 08:00-18:00"). */
  openingHoursSchema: ['Mo-Fr 08:00-18:00'], // TODO (deve bater com `hours`)

  // ── Números (seção de contadores, definidos no topo do arquivo) ────
  stats,
}

export type Company = typeof company
