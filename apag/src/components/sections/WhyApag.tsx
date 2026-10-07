import { BadgeCheck } from 'lucide-react'

import { Logo } from '@/components/Logo'
import { Reveal } from '@/components/motion'
import { SectionHeading } from '@/components/SectionHeading'
import { company, yearsInBusiness } from '@/config/company'
import { differentials } from '@/config/content'

/** Seção clara (branca) — quebra o ritmo do tema escuro. */
export function WhyApag() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="theme-light relative overflow-hidden bg-apag-white py-24 text-apag-black lg:py-32">
      <div className="container grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <SectionHeading
            id="sobre-title"
            tone="light"
            eyebrow="Por que a APAG"
            title="Experiência que protege"
            description={`Há mais de ${yearsInBusiness()} anos a ${company.name} instala e mantém sistemas de prevenção e combate a incêndio, ajudando condomínios e empresas a manter seus imóveis seguros e regularizados.`}
          />

          {/* Ficha da empresa — cards empilhados em camadas de vermelho */}
          <Reveal delay={0.1} className="relative mt-14 max-w-md pb-6 pl-6 sm:pl-0">
            <div aria-hidden="true" className="absolute -bottom-0 left-0 h-[88%] w-[92%] -rotate-[5deg] rounded-3xl bg-apag-red-45 sm:-left-6" />
            <div aria-hidden="true" className="absolute bottom-2 left-2 h-[90%] w-[94%] -rotate-[2.5deg] rounded-3xl bg-apag-red-65 sm:-left-3" />
            <div className="relative overflow-hidden rounded-3xl bg-crimson-noir p-7 text-white shadow-[0_30px_60px_-25px_rgb(197_3_55/0.6)] sm:p-8">
              <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <Logo size="sm" />
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20">
                    <BadgeCheck className="size-3.5" aria-hidden="true" />
                    Situação {company.status.toLowerCase()}
                  </span>
                </div>
                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
                  <div className="col-span-2">
                    <dt className="text-white/60">Razão social</dt>
                    <dd className="mt-1 font-semibold">{company.legalName}</dd>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <dt className="text-white/60">CNPJ</dt>
                    <dd className="mt-1 font-semibold tabular-nums">{company.cnpj}</dd>
                  </div>
                  <div>
                    <dt className="text-white/60">Fundação</dt>
                    <dd className="mt-1 font-semibold tabular-nums">{company.foundedAtLabel}</dd>
                  </div>
                  <div>
                    <dt className="text-white/60">Unidade</dt>
                    <dd className="mt-1 font-semibold">{company.establishment}</dd>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <dt className="text-white/60">Porte</dt>
                    <dd className="mt-1 font-semibold">{company.size}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>
        </div>

        <ul className="grid content-center gap-4">
          {differentials.map(({ icon: Icon, title, description }, i) => (
            <Reveal as="li" key={title} delay={i * 0.08}>
              <div className="group flex gap-5 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_30px_-20px_rgb(0_0_0/0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-apag-red hover:shadow-[0_20px_40px_-20px_rgb(223_37_49/0.45)] sm:p-7">
                <span className="grid size-13 shrink-0 place-items-center rounded-2xl bg-red-sheen text-white shadow-neu">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display-title text-[0.98rem] leading-snug tracking-normal">{title}</h3>
                  <p className="mt-2 leading-relaxed text-apag-black/70">{description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
