/**
 * Produtos revendidos/instalados pela APAG, por categoria (abas da seção Produtos).
 *
 * - Cada categoria tem o seu arquivo (sinalizacao.ts, alarme.ts…), gerado a partir
 *   dos catálogos e sites dos fornecedores. Regra: nada de modelo, medida ou número
 *   inventado; o que não foi confirmado fica marcado com `// TODO confirmar`.
 * - Fotos: public/produtos/{categoria}/{id}.webp ('' = placeholder com ícone).
 * - Créditos de todas as imagens: public/produtos/CREDITOS.md.
 */
import { alarme } from './alarme'
import { extintores } from './extintores'
import { hidrantes } from './hidrantes'
import { iluminacao } from './iluminacao'
import { sinalizacao } from './sinalizacao'

export type ProductCategoryId = 'sinalizacao' | 'alarme' | 'hidrantes' | 'iluminacao' | 'extintores'

export type ProductSystem = 'Convencional' | 'Endereçável' | 'Analógico' | 'Sem fio'

export type Product = {
  id: string
  /** nome comercial */
  name: string
  /** código/modelo do fabricante (ex.: "CIE 1125", "AME 522") */
  code?: string
  /** fabricante; vazio quando a categoria ainda não tem fornecedor definido */
  supplier: string
  /** subgrupo dentro da categoria (ex.: "Centrais", "Detectores") */
  group: string
  system?: ProductSystem
  /** 2–3 frases: o que é, onde usar e um diferencial técnico real */
  description: string
  /** 2–4 especificações curtas (ex.: "1 laço · 125 endereços") */
  specs?: string[]
  /** medidas disponíveis (viram o seletor de medida do card) */
  sizes?: string[]
  /** materiais e espessuras (ex.: "PVC fotoluminescente 2 mm") */
  materials?: string[]
  /** caminho local em /public/produtos/... ('' = placeholder) */
  image: string
  /** alt da foto, em português */
  imageAlt: string
  /** 'cover' para fotos com fundo (preenchem o card); padrão: produto recortado sobre fundo branco */
  imageFit?: 'contain' | 'cover'
  /** foto de banco de imagem (não é do fabricante): mostra o selo "Imagem ilustrativa" */
  illustrative?: boolean
  /** página do produto no fornecedor (uso interno, não aparece no site) */
  sourceUrl?: string
}

/** Bloco de ajuda mostrado acima dos filtros de uma aba. */
export type CategoryGuide =
  | {
      kind: 'columns'
      title: string
      columns: { title: string; text: string }[]
    }
  | {
      kind: 'sizes'
      title: string
      paragraphs: string[]
      /** tabela opcional medida → distância máxima de leitura */
      table?: { caption: string; source: string; head: [string, string]; rows: [string, string][] }
      cta: string
      ctaMessage: string
    }

export type ProductCategory = {
  id: ProductCategoryId
  title: string
  /** nome curto usado na aba */
  tabLabel: string
  /** texto curto explicando a categoria */
  intro: string
  suppliers: { name: string; url: string }[]
  /** ordem dos subgrupos (chips); grupos fora da lista vão para o fim */
  groups: string[]
  guide?: CategoryGuide
  products: Product[]
}

export const productCategories: ProductCategory[] = [sinalizacao, alarme, hidrantes, iluminacao, extintores]
