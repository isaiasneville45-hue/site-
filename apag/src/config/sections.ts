/**
 * Textos fixos das seções (títulos, subtítulos, rótulos de interface).
 * Os dados de empresa ficam em company.ts; serviços, produtos e FAQ nos arquivos próprios.
 */
import { company, yearsInBusiness } from './company'

export type SectionHeadingText = { eyebrow: string; title: string; description?: string }

export const hero = {
  eyebrow: `Desde ${company.foundedYear} em ${company.serviceArea}`,
  title: 'Seu imóvel protegido e regularizado,',
  titleHighlight: 'do projeto à manutenção.',
  subtitle:
    'Instalação e manutenção de extintores, hidrantes, alarmes, sinalização e iluminação de emergência, tudo para manter seu imóvel regularizado junto ao Corpo de Bombeiros.',
  primaryCta: 'Solicitar orçamento',
  secondaryCta: 'Falar no WhatsApp',
  /** Destaques abaixo dos botões (separados por ponto). */
  highlights: [`${yearsInBusiness()}+ anos de mercado`, 'Atendimento técnico especializado', company.serviceArea],
}

export const servicesUi = { more: 'Saiba mais' }

/** Rótulos da seção Produtos (filtros, cards, paginação). */
export const productsUi = {
  tabsLabel: 'Categorias de produtos',
  productsCount: (n: number) => `${n} produtos`,
  partners: 'Trabalhamos com:',
  searchLabel: 'Buscar produto',
  searchPlaceholder: 'Buscar por nome ou código',
  all: 'Todos',
  groupFilter: 'Subgrupo',
  supplierFilter: 'Fornecedor',
  systemFilter: 'Sistema',
  showing: (shown: number, total: number) =>
    total === 0 ? 'Nenhum produto encontrado' : `Mostrando ${shown} de ${total} ${total === 1 ? 'produto' : 'produtos'}`,
  empty: 'Nenhum produto corresponde aos filtros escolhidos.',
  clearFilters: 'Limpar filtros',
  loadMore: (remaining: number) => `Carregar mais (${remaining} ${remaining === 1 ? 'restante' : 'restantes'})`,
  pageSize: 12,
  sizeLabel: 'Medida',
  materialsLabel: 'Material',
  illustrative: 'Imagem ilustrativa',
  quote: 'Pedir orçamento',
  /** Mensagem do WhatsApp do botão "Pedir orçamento" de cada produto. */
  quoteMessage: (item: string, category: string) =>
    `Olá! Vim pelo site e gostaria de um orçamento de: ${item} (${category}).`,
}

export const segmentsUi = { pause: 'Pausar animação dos segmentos', resume: 'Retomar animação dos segmentos' }

export const headings = {
  services: {
    eyebrow: 'Serviços',
    title: 'Proteção completa para o seu imóvel',
    description:
      'Cuidamos de todos os sistemas de prevenção e combate a incêndio: instalação, manutenção e apoio na regularização, com um único fornecedor.',
  },
  products: {
    eyebrow: 'Produtos',
    title: 'Equipamentos para cada sistema',
    description:
      'Revendemos e instalamos produtos de fabricantes reconhecidos, com orientação técnica para você escolher o equipamento certo para o seu imóvel.',
  },
  stats: { eyebrow: 'Números', title: `A APAG em números` },
  why: {
    eyebrow: 'Por que a APAG',
    title: 'Experiência que protege',
    description: `Há mais de ${yearsInBusiness()} anos a APAG instala e mantém sistemas de prevenção e combate a incêndio, ajudando condomínios e empresas a manter seus imóveis seguros e regularizados.`,
  },
  process: {
    eyebrow: 'Como trabalhamos',
    title: 'Do primeiro contato à manutenção periódica',
    description: 'Um processo simples e transparente, para você saber exatamente o que acontece em cada etapa.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Perguntas frequentes',
    description:
      'Tire as principais dúvidas sobre manutenção, documentação e atendimento. Não achou o que procura? Fale com a gente.',
  },
  contact: {
    eyebrow: 'Contato',
    title: 'Solicite seu orçamento',
    description:
      'Preencha o formulário e envie direto pelo WhatsApp, ou use um dos nossos canais. Respondemos o quanto antes.',
  },
  location: {
    eyebrow: 'Localização',
    title: 'Onde estamos',
    description: `Ficamos no bairro ${company.address.district}, em ${company.address.city}/${company.address.state}, e atendemos ${company.serviceArea}.`,
  },
} satisfies Record<string, SectionHeadingText>
