/**
 * Produtos revendidos/instalados pela APAG, por categoria (abas da seção Produtos).
 *
 * - Fotos dos produtos: public/produtos/{categoria}/{id}.webp (baixadas dos sites dos
 *   fornecedores e otimizadas por scripts/assets/download.py). `image: ''` mostra um
 *   placeholder com o ícone da categoria até a foto ser providenciada.
 * - Capas das categorias (fotos "humanizadas"): public/fotos/*.webp.
 * - Créditos de todas as imagens: public/produtos/CREDITOS.md.
 */

export type ProductCategoryId = 'sinalizacao' | 'alarme' | 'hidrantes' | 'iluminacao' | 'extintores'

export type Product = {
  id: string
  name: string
  /** 1 a 2 linhas, linguagem simples */
  description: string
  /** caminho local em /public/produtos/... ('' = placeholder) */
  image: string
  imageAlt: string
  /** fabricante, quando souber */
  brand?: string
  /** subgrupo dentro da categoria (vira um título acima dos cards) */
  group?: string
}

export type ProductCategory = {
  id: ProductCategoryId
  title: string
  /** texto curto explicando a categoria */
  intro: string
  /** foto "humanizada" da categoria ('' = só o gradiente) */
  cover: string
  coverAlt: string
  suppliers: { name: string; url: string }[]
  products: Product[]
}

export const productCategories: ProductCategory[] = [
  {
    id: 'sinalizacao',
    title: 'Sinalização de emergência',
    intro:
      'Placas e fitas que mostram o caminho até a saída e indicam onde estão os equipamentos de combate a incêndio, conforme a ABNT NBR 16820 e as Instruções Normativas do Corpo de Bombeiros de SC (IN 13).',
    cover: '',
    coverAlt: 'Corredor com placa de saída de emergência iluminada',
    suppliers: [{ name: 'Grupo Scala', url: 'https://gruposcala.com.br' }],
    products: [],
  },
  {
    id: 'alarme',
    title: 'Alarme de incêndio',
    intro:
      'Centrais, detectores, acionadores e sirenes que identificam um princípio de incêndio e avisam todo o prédio rapidamente, em versões convencionais, endereçáveis e sem fio.',
    cover: '',
    coverAlt: 'Detector de fumaça instalado no teto de um ambiente',
    suppliers: [
      { name: 'Intelbras', url: 'https://www.intelbras.com/pt-br/seguranca-eletronica/incendio' },
      { name: 'Tecnohold', url: 'https://www.tecnohold.com.br' },
      { name: 'Ilumac', url: 'https://www.ilumac.com.br' },
    ],
    products: [],
  },
  {
    id: 'hidrantes',
    title: 'Hidrantes e mangotinhos',
    intro:
      'Mangueiras, esguichos, conexões e abrigos para a rede de hidrantes do seu imóvel, além do teste hidrostático das mangueiras e da manutenção da rede.',
    cover: '',
    coverAlt: 'Mangueira de incêndio enrolada dentro do abrigo de hidrante',
    suppliers: [], // TODO: informar fornecedor
    products: [],
  },
  {
    id: 'iluminacao',
    title: 'Iluminação de emergência',
    intro:
      'Luminárias e blocos autônomos que acendem sozinhos na falta de energia e mantêm as rotas de fuga iluminadas, inclusive em áreas externas, úmidas e industriais.',
    cover: '',
    coverAlt: 'Placa de saída iluminada em um corredor escuro',
    suppliers: [{ name: 'Luxpryme', url: 'https://www.luxpryme.com.br' }],
    products: [],
  },
  {
    id: 'extintores',
    title: 'Extintores',
    intro:
      'Extintores para cada classe de incêndio, com suportes e acessórios para a instalação, além dos serviços de recarga, manutenção e teste hidrostático.',
    cover: '',
    coverAlt: 'Extintores de incêndio vermelhos instalados na parede',
    suppliers: [],
    products: [],
  },
]
