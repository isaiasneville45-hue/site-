// lido também pelo seo.ts (Node): import relativo com extensão
import type { PhotoAsset } from './photos.ts'
import { ClipboardCheck, Droplets, FireExtinguisher, Lightbulb, Signpost, Siren, type LucideIcon } from 'lucide-react'

export type Service = {
  /** Identificador usado no formulário de contato. */
  id: string
  /** Sigla técnica exibida na lista de serviços (Geist Mono). */
  code: string
  icon: LucideIcon
  title: string
  /** Descrição curta exibida no card. */
  description: string
  /** O que está incluso (lista exibida no destaque do PPCI). */
  details: string[]
  /** Foto de um produto real da categoria (catálogo): usada quando não há foto de ambiente. */
  image?: { src: string; alt: string }
  /** Foto de ambiente do serviço (public/fotos/{id}-{largura}.webp). */
  photo?: PhotoAsset
}

// TODO revisar: confira se os itens de `details` batem com o que a APAG oferece.
export const services: Service[] = [
  {
    id: 'extintores',
    code: 'EXT',
    icon: FireExtinguisher,
    title: 'Extintores',
    description: 'Venda, recarga, manutenção e teste hidrostático.',
    details: ['Recarga de extintores', 'Manutenção', 'Teste hidrostático', 'Venda de extintores'],
    image: {
      src: '/produtos/sinalizacao/scala-ex-0503.webp',
      alt: 'Placa fotoluminescente vermelha com o símbolo de extintor de incêndio',
    },
    photo: {
      id: 'servico-extintores',
      alt: 'Técnica anota a inspeção no cartão de registro preso a um extintor de incêndio vermelho',
      widths: [480, 800],
      position: '45% 40%',
    },
  },
  {
    id: 'hidrantes',
    code: 'HID',
    icon: Droplets,
    title: 'Hidrantes',
    description: 'Inspeção, manutenção e teste de pressão das mangueiras.',
    details: ['Manutenção do sistema de hidrantes', 'Inspeção de mangueiras', 'Teste de pressão'],
    image: {
      src: '/produtos/hidrantes/segurimax-mangueira-tipo-1.webp',
      alt: 'Mangueira de incêndio enrolada com uniões Storz de latão',
    },
    photo: {
      id: 'servico-hidrantes',
      alt: 'Abrigo de mangueira de incêndio com porta de vidro, mangueira dobrada e um extintor ao lado',
      widths: [480, 800],
      position: '50% 62%',
    },
  },
  {
    id: 'alarme',
    code: 'ALM',
    icon: Siren,
    title: 'Alarme de incêndio',
    description: 'Instalação e manutenção de centrais, detectores e acionadores.',
    details: ['Instalação de centrais de alarme', 'Detectores', 'Acionadores manuais', 'Manutenção do sistema'],
    image: { src: '/produtos/alarme/intelbras-amc-421.webp', alt: 'Acionador manual de alarme de incêndio vermelho' },
    photo: {
      id: 'servico-alarme',
      alt: 'Central de alarme de incêndio instalada na parede, com sirene e acionador logo abaixo',
      widths: [480, 800],
      position: '50% 40%',
    },
  },
  {
    id: 'sinalizacao',
    code: 'SIN',
    icon: Signpost,
    title: 'Sinalização de emergência',
    description: 'Placas fotoluminescentes de rota de fuga, equipamentos e alerta.',
    details: ['Placas fotoluminescentes', 'Sinalização de rotas de fuga e equipamentos', 'Conforme as normas técnicas'],
    image: {
      src: '/produtos/sinalizacao/fotoluminescente-laudo.webp',
      alt: 'Placa fotoluminescente verde com a palavra SAÍDA',
    },
    photo: {
      id: 'servico-sinalizacao',
      alt: 'Placa de saída de emergência iluminada, com pictograma de pessoa correndo e seta, no teto de um corredor',
      widths: [800, 1600],
      position: '55% 40%',
    },
  },
  {
    id: 'iluminacao',
    code: 'ILU',
    icon: Lightbulb,
    title: 'Iluminação de emergência',
    description: 'Instalação e manutenção de blocos autônomos e sistemas centralizados.',
    details: ['Blocos autônomos', 'Sistemas centralizados', 'Instalação e manutenção'],
    image: {
      src: '/produtos/iluminacao/luxpryme-bloco-3000-basic.webp',
      alt: 'Bloco autônomo de iluminação de emergência com três faróis de LED',
    },
    photo: {
      id: 'servico-iluminacao',
      alt: 'Luminária de saída de emergência acesa em um corredor escuro, iluminando a parede de blocos',
      widths: [480, 800],
      position: '60% 45%',
    },
  },
  {
    id: 'ppci',
    code: 'PPCI',
    icon: ClipboardCheck,
    title: 'Adequação ao PPCI',
    description: 'Apoio técnico para regularizar o imóvel junto ao Corpo de Bombeiros.',
    details: [
      'Apoio na regularização junto ao Corpo de Bombeiros',
      'Adequação dos sistemas de prevenção exigidos para o imóvel',
    ],
    photo: {
      id: 'servico-ppci',
      alt: 'Prancha técnica com planta baixa, fachada e planta de situação de uma edificação',
      widths: [480, 800],
      position: '40% 45%',
    },
  },
]

/** Opções do select "Tipo de serviço" no formulário de contato. */
export const serviceOptions = [
  ...services.map((s) => ({ value: s.id, label: s.title })),
  { value: 'outro', label: 'Outro / não sei ainda' },
]
