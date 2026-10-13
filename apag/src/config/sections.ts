/**
 * Textos fixos das seções (títulos, subtítulos, rótulos de interface).
 * Os dados de empresa ficam em company.ts; serviços, produtos e FAQ nos arquivos próprios.
 */
import { company, yearsInBusiness } from './company'

export type SectionHeadingText = { title: string; description?: string }

export const hero = {
  title: 'Seu imóvel protegido e regularizado.',
  subtitle: `Instalação, manutenção e regularização de sistemas contra incêndio em ${company.serviceArea}.`,
  primaryCta: 'Solicitar orçamento',
  secondaryCta: 'Falar no WhatsApp',
  /** Ficha técnica sobre a foto (só dados comprovados). */
  facts: [
    { label: 'Desde', value: String(company.foundedYear) },
    { label: 'Experiência', value: `${yearsInBusiness()} anos` },
    { label: 'Atendimento', value: company.serviceArea },
  ],
}

export const segmentsUi = { title: 'Atendemos' }

export const servicesUi = {
  products: 'Ver produtos',
  quote: 'Solicitar orçamento',
  ppciLabel: 'Regularização',
}

/** Rótulos da seção Produtos (filtros, cards, paginação, detalhes). */
export const productsUi = {
  tabsLabel: 'Categorias de produtos',
  partners: 'Fornecedores',
  searchLabel: 'Buscar produto',
  searchPlaceholder: 'Nome ou código',
  all: 'Todos',
  filters: 'Filtros',
  groupFilter: 'Tipo',
  supplierFilter: 'Fornecedor',
  systemFilter: 'Sistema',
  showing: (shown: number, total: number) =>
    total === 0
      ? 'Nenhum produto encontrado'
      : `Mostrando ${shown} de ${total} ${total === 1 ? 'produto' : 'produtos'}`,
  empty: 'Nenhum produto com esses filtros. Tente outra busca ou limpe os filtros.',
  clearFilters: 'Limpar filtros',
  loadMore: (remaining: number) => `Carregar mais (${remaining} ${remaining === 1 ? 'restante' : 'restantes'})`,
  pageSize: 12,
  sizesCount: (n: number) => `${n} ${n === 1 ? 'medida' : 'medidas'}`,
  details: 'Detalhes',
  specsLabel: 'Especificações',
  sizeLabel: 'Medida',
  materialsLabel: 'Material',
  illustrative: 'Imagem ilustrativa',
  quote: 'Pedir orçamento',
  /** Mensagem do WhatsApp do botão "Pedir orçamento" de cada produto. */
  quoteMessage: (item: string, category: string) =>
    `Olá! Vim pelo site e gostaria de um orçamento de: ${item} (${category}).`,
}

export const finalCta = {
  title: 'Precisa de uma solução em prevenção contra incêndio?',
  description: `Fale com a ${company.name} e solicite um orçamento.`,
}

export const headings = {
  services: {
    title: 'Um fornecedor para todo o sistema',
    description: 'Instalação, manutenção e apoio na regularização do imóvel.',
  },
  products: {
    title: 'Catálogo de produtos',
    description: 'Equipamentos dos fabricantes que revendemos e instalamos.',
  },
  why: {
    title: `Desde ${company.foundedYear} em ${company.address.city}`,
    description:
      'Instalamos e mantemos sistemas de prevenção e combate a incêndio para condomínios, comércios e indústrias da região.',
  },
  process: {
    title: 'Como trabalhamos',
    description: 'Do primeiro contato à manutenção periódica.',
  },
  faq: {
    title: 'Perguntas frequentes',
    description: 'Não encontrou a resposta? Fale com a gente.',
  },
  contact: {
    title: 'Solicite um orçamento',
    description: 'Preencha o formulário e enviamos pelo WhatsApp, ou use um dos canais abaixo.',
  },
  location: {
    title: 'Onde estamos',
  },
} satisfies Record<string, SectionHeadingText>
