import {
  Award,
  Briefcase,
  Building2,
  CalendarCheck,
  Factory,
  FileText,
  HardHat,
  Layers,
  PhoneCall,
  School,
  ShieldCheck,
  Stethoscope,
  Store,
  UtensilsCrossed,
  Warehouse,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

import { company, yearsInBusiness } from './company'

type IconItem = { icon: LucideIcon; title: string; description: string }

/** Links da navbar e do rodapé (âncoras das seções). */
export const navigation = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Como Trabalhamos', href: '#como-trabalhamos' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contato' },
]

/** Segmentos atendidos (faixa infinita). */
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

/** Seção "Por que a APAG". */
export const differentials: IconItem[] = [
  {
    icon: Award,
    title: `Experiência desde ${company.foundedYear}`,
    description: `Mais de ${yearsInBusiness()} anos dedicados à prevenção e ao combate a incêndio, acompanhando a evolução das normas e dos equipamentos.`,
  },
  {
    icon: HardHat,
    title: 'Atendimento técnico especializado',
    description:
      'Cada visita, instalação e manutenção é conduzida por quem entende de sistemas de segurança contra incêndio.',
  },
  {
    icon: ShieldCheck,
    title: 'Conforme as normas e o Corpo de Bombeiros',
    description: 'Serviços executados de acordo com as normas técnicas e as exigências do Corpo de Bombeiros.',
  },
  {
    icon: Layers,
    title: 'Solução completa, um só fornecedor',
    description:
      'Extintores, hidrantes, alarme, sinalização, iluminação de emergência e adequação ao PPCI com um único parceiro.',
  },
]

/** Seção "Como trabalhamos". */
export const processSteps: IconItem[] = [
  {
    icon: PhoneCall,
    title: 'Contato e visita técnica',
    description:
      'Você fala com a gente e, quando necessário, agendamos uma visita para avaliar o imóvel e os sistemas existentes.',
  },
  {
    icon: FileText,
    title: 'Orçamento',
    description: 'Enviamos uma proposta clara, com os serviços necessários para deixar o imóvel em conformidade.',
  },
  {
    icon: Wrench,
    title: 'Execução / instalação',
    description: 'Instalamos ou fazemos a manutenção dos sistemas de acordo com as normas técnicas.',
  },
  {
    icon: CalendarCheck,
    title: 'Manutenção periódica e laudos',
    description: 'Acompanhamos os prazos de manutenção e entregamos a documentação dos serviços realizados.',
  },
]
