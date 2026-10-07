import {
  ClipboardCheck,
  Droplets,
  FireExtinguisher,
  Lightbulb,
  Signpost,
  Siren,
  type LucideIcon,
} from 'lucide-react'

export type Service = {
  /** Identificador usado no formulário de contato. */
  id: string
  icon: LucideIcon
  title: string
  /** Descrição curta exibida no card. */
  description: string
  /** O que está incluso (lista exibida no "Saiba mais"). */
  details: string[]
}

// TODO revisar: confira se os itens de `details` (lista do "Saiba mais") batem com o que a APAG oferece.
export const services: Service[] = [
  {
    id: 'extintores',
    icon: FireExtinguisher,
    title: 'Extintores',
    description: 'Recarga, manutenção, teste hidrostático e venda.',
    details: ['Recarga de extintores', 'Manutenção', 'Teste hidrostático', 'Venda de extintores'],
  },
  {
    id: 'hidrantes',
    icon: Droplets,
    title: 'Hidrantes',
    description: 'Manutenção, inspeção de mangueiras e teste de pressão.',
    details: ['Manutenção do sistema de hidrantes', 'Inspeção de mangueiras', 'Teste de pressão'],
  },
  {
    id: 'alarme',
    icon: Siren,
    title: 'Alarme de incêndio',
    description: 'Instalação e manutenção de centrais, detectores e acionadores.',
    details: ['Instalação de centrais de alarme', 'Detectores', 'Acionadores manuais', 'Manutenção do sistema'],
  },
  {
    id: 'sinalizacao',
    icon: Signpost,
    title: 'Sinalização de emergência',
    description: 'Placas fotoluminescentes conforme as normas.',
    details: ['Placas fotoluminescentes', 'Sinalização de rotas de fuga e equipamentos', 'Conforme as normas técnicas'],
  },
  {
    id: 'iluminacao',
    icon: Lightbulb,
    title: 'Iluminação de emergência',
    description: 'Instalação e manutenção de blocos autônomos e sistemas centralizados.',
    details: ['Blocos autônomos', 'Sistemas centralizados', 'Instalação e manutenção'],
  },
  {
    id: 'ppci',
    icon: ClipboardCheck,
    title: 'Adequação ao PPCI',
    description: 'Apoio para regularizar o imóvel junto ao Corpo de Bombeiros.',
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
