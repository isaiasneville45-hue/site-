import type { CSSProperties } from 'react'

import { Photo } from '@/components/Photo'
import { PlanDrawing } from '@/components/PlanDrawing'
import { Button } from '@/components/ui/button'
import { photos } from '@/config/photos'
import { hero } from '@/config/sections'
import { cn } from '@/lib/utils'

/*
 * Hero editorial assimétrico sobre o marinho da marca: malha de prancha técnica
 * e uma planta de prevenção esmaecida ao fundo; título em duas linhas à
 * esquerda; à direita, a foto como uma prancha com marcas de corte; no pé, a
 * ficha técnica da empresa no formato do carimbo de um projeto.
 * Anima só com CSS, uma vez, no carregamento (sem esperar o JavaScript).
 */
const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` })

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="theme-dark relative isolate overflow-clip-safe bg-apag-navy-900"
    >
      {/* malha técnica, mais forte à esquerda */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-blueprint [mask-image:linear-gradient(100deg,#000_0%,rgb(0_0_0/0.6)_45%,transparent_80%)]"
      />
      <PlanDrawing className="absolute -left-24 bottom-24 -z-10 hidden w-[44rem] opacity-[0.09] lg:block" />

      <div className="container grid gap-12 pb-12 pt-28 sm:pt-32 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-36">
        <div className="flex flex-col justify-center lg:col-span-7 lg:pb-8">
          <p className="flex animate-fade-up items-center gap-3 text-tech text-white/65">
            <span aria-hidden="true" className="size-2 bg-apag-red" />
            Prevenção e combate a incêndio
          </p>
          <h1 id="hero-title" style={delay(80)} className="text-display mt-8 animate-fade-up">
            {hero.title.map((line) => (
              <span key={line} className="block text-balance">
                {line}
              </span>
            ))}
          </h1>
          <p
            style={delay(180)}
            className="mt-8 max-w-[32rem] animate-fade-up text-lg leading-relaxed text-white/72 text-pretty sm:text-xl"
          >
            {hero.subtitle}
          </p>
          <div style={delay(280)} className="mt-10 flex animate-fade-up flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#contato">{hero.primaryCta}</a>
            </Button>
            <Button asChild size="lg" variant="outline-dark">
              <a href="#servicos">{hero.secondaryCta}</a>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <PhotoPlate />
        </div>
      </div>

      <Facts />
    </section>
  )
}

/** Foto em "prancha": moldura com marcas de corte nos quatro cantos. */
function PhotoPlate() {
  const mark = 'absolute size-4 border-white/45'
  return (
    <figure style={delay(120)} className="relative animate-fade-in p-3 sm:p-4">
      <span aria-hidden="true" className={cn(mark, 'left-0 top-0 border-l border-t')} />
      <span aria-hidden="true" className={cn(mark, 'right-0 top-0 border-r border-t')} />
      <span aria-hidden="true" className={cn(mark, 'bottom-0 left-0 border-b border-l')} />
      <span aria-hidden="true" className={cn(mark, 'bottom-0 right-0 border-b border-r')} />
      <div className="relative aspect-[4/3] overflow-hidden bg-apag-navy-800 sm:aspect-[16/10] lg:aspect-[4/5]">
        {photos.hero ? (
          <Photo
            photo={photos.hero}
            sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 100vw"
            priority
            className="absolute inset-0 size-full saturate-[0.85]"
          />
        ) : null}
        <div aria-hidden="true" className="absolute inset-0 bg-apag-navy-900/15" />
      </div>
    </figure>
  )
}

/** Ficha técnica: só dados comprovados (fundação, tempo de atuação, região, escopo). */
function Facts() {
  return (
    <div className="border-t border-white/14 bg-apag-navy-950/40">
      <dl style={delay(380)} className="container grid animate-fade-up grid-cols-2 lg:grid-cols-[1fr_1fr_1.3fr_1.9fr]">
        {hero.facts.map((fact, i) => (
          <div
            key={fact.label}
            className={cn(
              'py-5 pr-4 lg:py-6 lg:pl-6',
              i > 0 && 'lg:border-l lg:border-white/14',
              i % 2 === 1 && 'max-lg:border-l max-lg:border-white/14 max-lg:pl-4',
              i > 1 && 'max-lg:border-t max-lg:border-white/14',
              i === 0 && 'lg:pl-0',
            )}
          >
            <dt className="text-tech text-white/55">{fact.label}</dt>
            <dd className="mt-1.5 text-base font-semibold leading-snug tracking-[-0.01em] text-white sm:text-lg">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
