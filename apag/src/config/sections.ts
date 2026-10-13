/**
 * Textos fixos das seções (títulos, subtítulos, rótulos de interface).
 * Os dados de empresa ficam em company.ts; serviços, produtos e FAQ nos arquivos próprios.
 */
import { company } from './company'

export type SectionHeadingText = { title: string; accent?: string; description?: string }

export const hero = {
  /** Título em duas linhas: a segunda em vermelho, como na referência. */
  title: 'Segurança contra incêndio',
  titleAccent: 'Precisão em cada detalhe',
  subtitle: `Instalação, manutenção e regularização de sistemas de prevenção em ${company.serviceArea}, desde ${company.foundedYear}.`,
  primaryCta: 'Solicitar orçamento',
  secondaryCta: 'Nossos serviços',
}

/** Os três pilares (cartões brancos sobre o pé do hero). */
export const pillars = [
  {
    title: 'Instalação',
    description: 'Extintores, hidrantes, alarme, sinalização e iluminação de emergência.',
  },
  {
    title: 'Manutenção',
    description: 'Recarga, inspeção e testes periódicos dos sistemas.',
  },
  {
    title: 'Regularização',
    description: 'Apoio técnico no PPCI junto ao Corpo de Bombeiros.',
  },
]

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

export const manufacturersUi = {
  title: 'Fabricantes no catálogo',
  visit: 'Site do fabricante',
  count: (n: number) => `${n} ${n === 1 ? 'produto' : 'produtos'}`,
}

export const headings = {
  services: {
    title: 'Nossos serviços',
    description: 'Instalação, manutenção e apoio na regularização, com um único fornecedor.',
  },
  products: {
    title: 'Catálogo de produtos',
    description: 'Equipamentos dos fabricantes que revendemos e instalamos. Busque por nome ou código.',
  },
  why: {
    title: 'Por que escolher a',
    accent: company.name,
    description: `Desde ${company.foundedYear} instalando e mantendo sistemas de prevenção em ${company.address.city} e região.`,
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
    title: 'Precisa de uma solução em prevenção?',
    accent: 'Fale com a APAG',
    description: 'Solicite um orçamento pelo formulário ou pelos nossos canais.',
  },
  location: {
    title: 'Onde estamos',
  },
} satisfies Record<string, SectionHeadingText>
