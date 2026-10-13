/**
 * Textos fixos das seções (títulos, subtítulos, rótulos de interface).
 * Os dados de empresa ficam em company.ts; serviços, produtos e FAQ nos arquivos próprios.
 */
import { company, yearsInBusiness } from './company'

export type SectionHeadingText = { index: string; label: string; title: string; description?: string }

export const hero = {
  /** Título em duas linhas (a quebra é intencional). */
  title: ['Segurança contra incêndio.', 'Precisão em cada detalhe.'],
  subtitle: `Instalação, manutenção e regularização de sistemas de prevenção em ${company.serviceArea}.`,
  primaryCta: 'Solicitar orçamento',
  secondaryCta: 'Conhecer os serviços',
  /** Ficha técnica no pé do hero (só dados comprovados). */
  facts: [
    { label: 'Fundação', value: String(company.foundedYear) },
    { label: 'Atuação', value: `${yearsInBusiness()} anos` },
    { label: 'Atendimento', value: company.serviceArea },
    { label: 'Escopo', value: 'Instalação, manutenção e regularização' },
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

export const manufacturersUi = {
  title: 'Fabricantes no catálogo',
  visit: 'Site do fabricante',
  count: (n: number) => `${n} ${n === 1 ? 'produto' : 'produtos'}`,
}

export const headings = {
  services: {
    index: '01',
    label: 'Serviços',
    title: 'Um fornecedor para todo o sistema de prevenção',
    description: 'Instalação, manutenção e apoio na regularização do imóvel.',
  },
  products: {
    index: '02',
    label: 'Produtos',
    title: 'Catálogo técnico',
    description: 'Equipamentos dos fabricantes que revendemos e instalamos. Busque por nome ou código.',
  },
  why: {
    index: '03',
    label: 'Empresa',
    title: `Desde ${company.foundedYear} em ${company.address.city}`,
    description:
      'Instalamos e mantemos sistemas de prevenção e combate a incêndio para condomínios, comércios e indústrias da região.',
  },
  process: {
    index: '04',
    label: 'Atendimento',
    title: 'Como trabalhamos',
    description: 'Do primeiro contato à manutenção periódica.',
  },
  faq: {
    index: '05',
    label: 'Dúvidas',
    title: 'Perguntas frequentes',
    description: 'Não encontrou a resposta? Fale com a gente.',
  },
  contact: {
    index: '06',
    label: 'Contato',
    title: 'Solicite um orçamento',
    description: 'Preencha o formulário e enviamos pelo WhatsApp, ou use um dos canais ao lado.',
  },
  location: {
    index: '',
    label: '',
    title: 'Onde estamos',
  },
} satisfies Record<string, SectionHeadingText>
