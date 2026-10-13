import {
  Award,
  Briefcase,
  Building2,
  Factory,
  HardHat,
  Layers,
  ShieldCheck,
  School,
  Stethoscope,
  Store,
  UtensilsCrossed,
  Warehouse,
  type LucideIcon,
} from 'lucide-react'

import { company, yearsInBusiness } from './company'

/**
 * Âncoras das seções. `primary` = aparece no menu do cabeçalho; o rodapé lista todas.
 */
export const navigation = [
  { label: 'Serviços', href: '#servicos', primary: true },
  { label: 'Produtos', href: '#produtos', primary: true },
  { label: 'Empresa', href: '#sobre', primary: true },
  { label: 'Como trabalhamos', href: '#como-trabalhamos', primary: true },
  { label: 'FAQ', href: '#faq', primary: true },
  { label: 'Contato', href: '#contato', primary: true },
  { label: 'Localização', href: '#localizacao', primary: false },
]

/** Segmentos atendidos. */
export const segments: { icon: LucideIcon; label: string }[] = [
  { icon: Building2, label: 'Condomínios' },
  { icon: Factory, label: 'Indústrias' },
  { icon: Store, label: 'Comércios' },
  { icon: School, label: 'Escolas' },
  { icon: Warehouse, label: 'Galpões' },
  { icon: Stethoscope, label: 'Clínicas' },
  { icon: UtensilsCrossed, label: 'Restaurantes' },
  { icon: Briefcase, label: 'Escritórios' },
]

/** Seção "Por que escolher a APAG": diferenciais em uma linha cada. */
export const differentials: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Award,
    title: `Desde ${company.foundedYear}`,
    description: `${yearsInBusiness()} anos acompanhando a evolução das normas e dos equipamentos.`,
  },
  {
    icon: HardHat,
    title: 'Atendimento técnico',
    description: 'Instalação e manutenção feitas por quem conhece os sistemas.',
  },
  {
    icon: ShieldCheck,
    title: 'Conforme as normas',
    description: 'Serviços de acordo com as normas técnicas e as exigências do Corpo de Bombeiros.',
  },
  {
    icon: Layers,
    title: 'Um só fornecedor',
    description: 'Extintores, hidrantes, alarme, sinalização, iluminação e PPCI.',
  },
]

/** Seção "Como trabalhamos" (sequência real de atendimento). */
export const processSteps: { title: string; description: string }[] = [
  {
    title: 'Contato e visita técnica',
    description: 'Entendemos a necessidade e, quando preciso, avaliamos o imóvel.',
  },
  {
    title: 'Orçamento',
    description: 'Proposta clara, com os serviços necessários.',
  },
  {
    title: 'Execução',
    description: 'Instalação ou manutenção conforme as normas técnicas.',
  },
  {
    title: 'Manutenção e documentação',
    description: 'Acompanhamos os prazos e entregamos a documentação dos serviços.',
  },
]
