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
  /** Foto de um produto real da categoria (catálogo), sobre fundo cinza. */
  image?: { src: string; alt: string }
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
  },
  {
    id: 'alarme',
    code: 'ALM',
    icon: Siren,
    title: 'Alarme de incêndio',
    description: 'Instalação e manutenção de centrais, detectores e acionadores.',
    details: ['Instalação de centrais de alarme', 'Detectores', 'Acionadores manuais', 'Manutenção do sistema'],
    image: { src: '/produtos/alarme/intelbras-amc-421.webp', alt: 'Acionador manual de alarme de incêndio vermelho' },
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
  },
]

/** Opções do select "Tipo de serviço" no formulário de contato. */
export const serviceOptions = [
  ...services.map((s) => ({ value: s.id, label: s.title })),
  { value: 'outro', label: 'Outro / não sei ainda' },
]
