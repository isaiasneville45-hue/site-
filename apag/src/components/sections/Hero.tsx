import type { CSSProperties } from 'react'
import { ArrowRight, Droplets, FireExtinguisher, ShieldCheck, Siren, type LucideIcon } from 'lucide-react'

import { Eyebrow } from '@/components/SectionHeading'
import { WhatsAppIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { company, yearsInBusiness } from '@/config/company'
import { services } from '@/config/services'
import { whatsappUrl } from '@/lib/contact'
import { cn } from '@/lib/utils'

/*
 * O hero anima só com CSS (classes animate-fade-up / animate-float): o HTML
 * pré-renderizado já aparece animando no primeiro paint, sem esperar o JS.
 * Com prefers-reduced-motion as animações são desligadas no index.css.
 */
const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` })

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-crimson-noir pb-20 pt-28 sm:pt-32 lg:pb-24 lg:pt-36"
    >
      {/* Texturas e luzes */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noise opacity-[0.06] mix-blend-overlay" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_15%_35%,rgb(2_6_14/0.85),transparent_70%)]"
      />
      <div aria-hidden="true" className="absolute -right-40 top-1/4 -z-10 size-[42rem] rounded-full bg-apag-red/25 blur-[140px]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-apag-black" />

      <div className="container grid items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
        <div className="max-w-2xl">
          <div className="animate-fade-up">
            <Eyebrow className="rounded-2xl leading-snug sm:rounded-full">
              Desde {company.foundedYear} protegendo vidas e patrimônios
            </Eyebrow>
          </div>

          <h1
            id="hero-title"
            style={delay(80)}
            className="font-display-title mt-7 animate-fade-up text-[clamp(1.75rem,0.9rem+3.2vw,3.4rem)] leading-[1.06] text-balance"
          >
            Segurança contra incêndio{' '}
            <span className="bg-gradient-to-r from-white via-[#ffd0d3] to-apag-ember bg-clip-text text-transparent">
              do projeto à manutenção.
            </span>
          </h1>

          <p
            style={delay(160)}
            className="mt-7 max-w-xl animate-fade-up text-base leading-relaxed text-white/80 text-pretty sm:text-lg"
          >
            Instalação e manutenção de extintores, hidrantes, alarmes, sinalização e iluminação de emergência — tudo
            para manter seu imóvel regularizado junto ao Corpo de Bombeiros.
          </p>

          <div style={delay(240)} className="mt-10 flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <a href="#contato">
                Solicitar orçamento
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                Falar no WhatsApp
              </a>
            </Button>
          </div>

          <ul
            style={delay(320)}
            className="mt-12 flex animate-fade-up flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-8 text-sm"
          >
            <HeroFact value={`${yearsInBusiness()}+ anos`} label="de mercado" />
            <HeroFact value={`${services.length} soluções`} label="em um só lugar" />
            <HeroFact value="Atendimento" label="especializado" />
          </ul>
        </div>

        <HeroCards />
      </div>
    </section>
  )
}

function HeroFact({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center gap-2.5">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-apag-red shadow-[0_0_8px_var(--apag-red)]" />
      <span className="font-semibold text-white">
        {value} <span className="font-normal text-white/65">{label}</span>
      </span>
    </li>
  )
}

/* ── Composição de cards empilhados (camadas de vermelho 45% / 65% / 100%) ── */

type StackCard = {
  icon: LucideIcon
  index: string
  title: string
  layer: string
  position: string
  float: CSSProperties
}

const backCards: StackCard[] = [
  {
    icon: Siren,
    index: '03',
    title: 'Alarme de incêndio',
    layer: 'bg-apag-red-45 border-white/15 backdrop-blur-md',
    position: 'left-[2%] top-0 -rotate-[9deg]',
    float: { animationDuration: '7.5s', animationDelay: '-2s' },
  },
  {
    icon: Droplets,
    index: '02',
    title: 'Hidrantes',
    layer: 'bg-apag-red-65 border-white/20 backdrop-blur-md',
    position: 'left-[9%] top-[19%] -rotate-[4.5deg] sm:top-[21%]',
    float: { animationDuration: '6.5s', animationDelay: '-1s' },
  },
]

function HeroCards() {
  return (
    <div className="relative mx-auto aspect-[10/11] w-full max-w-[34rem] sm:aspect-square" aria-hidden="true">
      {/* brilho atrás da pilha */}
      <div className="absolute inset-[12%] rounded-full bg-apag-red/35 blur-[90px]" />

      {backCards.map((card, i) => (
        <div key={card.title} className={cn('absolute w-[76%] animate-rise-in', card.position)} style={delay(250 + i * 120)}>
          <div className="animate-float" style={card.float}>
            <div
              className={cn(
                'aspect-[1.58] rounded-[1.5rem] border p-4 shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_30px_60px_-30px_rgb(0_0_0/0.9)] sm:rounded-[1.75rem] sm:p-6',
                card.layer,
              )}
            >
              <CardTop icon={card.icon} index={card.index} title={card.title} />
            </div>
          </div>
        </div>
      ))}

      {/* card da frente: vermelho 100% */}
      <div className="absolute left-[17%] top-[38%] w-[78%] rotate-[2.5deg] animate-rise-in sm:top-[42%]" style={delay(490)}>
        <div className="animate-float" style={{ animationDuration: '6s' }}>
          <div className="relative aspect-[1.58] overflow-hidden rounded-[1.5rem] border border-white/25 bg-[linear-gradient(140deg,#F2414C_0%,var(--apag-red)_40%,var(--apag-crimson)_100%)] p-4 shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-12px_30px_rgb(0_0_0/0.2),0_40px_80px_-30px_rgb(197_3_55/0.9)] sm:rounded-[1.75rem] sm:p-6">
            <div className="absolute -right-16 -top-20 size-56 rounded-full bg-white/15 blur-2xl" />
            <div className="absolute inset-0 bg-grid opacity-40" />
            <div className="relative flex h-full flex-col">
              <CardTop icon={FireExtinguisher} index="01" title="Extintores" />
              <p className="mt-2 text-[0.7rem] text-white/90 sm:mt-3 sm:text-sm">Recarga · Manutenção · Teste hidrostático</p>
              <div className="mt-auto flex items-end justify-between gap-3">
                <span className="font-display text-[0.6rem] uppercase tracking-wide text-white/75 sm:hidden">
                  Desde {company.foundedYear}
                </span>
                <div className="hidden flex-wrap gap-1.5 sm:flex">
                  {['Sinalização', 'Iluminação', 'PPCI'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/25 bg-white/15 px-2.5 py-1 text-[0.65rem] font-semibold text-white sm:text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="font-display text-sm tracking-[0.08em] text-white sm:text-base">{company.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* selo flutuante */}
      <div className="absolute bottom-0 left-0 animate-fade-up sm:-left-[4%]" style={delay(750)}>
        <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-apag-noir/80 py-3 pl-3 pr-5 shadow-neu-dark backdrop-blur-xl">
          <span className="grid size-10 place-items-center rounded-xl bg-apag-red text-white shadow-glow">
            <ShieldCheck className="size-5" />
          </span>
          <span className="text-xs leading-tight text-white/75 sm:text-sm">
            <strong className="block font-semibold text-white">Conforme as normas</strong>
            e exigências do Corpo de Bombeiros
          </span>
        </div>
      </div>
    </div>
  )
}

function CardTop({ icon: Icon, index, title }: { icon: LucideIcon; index: string; title: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/25 bg-white/15 shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] sm:size-11">
          <Icon className="size-5 text-white" />
        </span>
        <span className="font-display text-[0.65rem] uppercase tracking-wide text-white sm:text-sm">{title}</span>
      </div>
      <span className="font-display text-[0.65rem] text-white/70 sm:text-xs">{index}</span>
    </div>
  )
}
