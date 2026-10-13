import type { CSSProperties } from 'react'
import { ClipboardCheck, ShieldCheck, Wrench, type LucideIcon } from 'lucide-react'

import { Photo } from '@/components/Photo'
import { Button } from '@/components/ui/button'
import { photos } from '@/config/photos'
import { hero, pillars } from '@/config/sections'

/*
 * Hero no padrão da referência: foto de ambiente técnico em tela cheia, tratada
 * em preto e branco sob um véu preto mais denso à esquerda; título em caixa alta
 * em duas linhas (a segunda em vermelho), texto curto e as duas ações. Os três
 * pilares da empresa entram como cartões brancos sobre o pé da foto.
 * Anima só com CSS, uma vez, no carregamento.
 */
const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` })

const pillarIcons: LucideIcon[] = [ShieldCheck, Wrench, ClipboardCheck]

export function Hero() {
  return (
    <>
      <section
        id="inicio"
        aria-labelledby="hero-title"
        className="theme-dark relative isolate overflow-clip-safe bg-apag-black"
      >
        {photos.hero ? (
          <Photo
            photo={photos.hero}
            sizes="100vw"
            priority
            className="absolute inset-0 -z-20 size-full animate-fade-in photo-mono"
          />
        ) : null}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(17_17_17/0.94)_0%,rgb(17_17_17/0.82)_42%,rgb(17_17_17/0.45)_100%)] max-md:bg-[linear-gradient(180deg,rgb(17_17_17/0.55)_0%,rgb(17_17_17/0.86)_55%)]"
        />

        <div className="container flex min-h-[38rem] flex-col justify-center pb-36 pt-32 sm:min-h-[42rem] lg:min-h-[46rem] lg:pb-44 lg:pt-36">
          <div className="max-w-[44rem]">
            <h1 id="hero-title" className="text-display animate-fade-up text-balance">
              <span className="block">{hero.title}</span>
              <span style={delay(120)} className="mt-2 block animate-fade-up text-apag-red">
                {hero.titleAccent}
              </span>
            </h1>
            <p
              style={delay(220)}
              className="mt-7 max-w-[34rem] animate-fade-up text-lg leading-relaxed text-white/80 text-pretty"
            >
              {hero.subtitle}
            </p>
            <div style={delay(320)} className="mt-10 flex animate-fade-up flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#contato">{hero.primaryCta}</a>
              </Button>
              <Button asChild size="lg" variant="outline-dark">
                <a href="#servicos">{hero.secondaryCta}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pilares: cartões brancos sobre o pé do hero */}
      <section aria-label="Atuação da APAG" className="relative z-10 -mt-24 sm:-mt-20">
        <div className="container">
          <ul
            style={delay(420)}
            className="grid animate-fade-up overflow-hidden rounded-md border border-apag-line bg-white shadow-[0_24px_48px_-24px_rgb(0_0_0/0.45)] sm:grid-cols-3"
          >
            {pillars.map((pillar, i) => {
              const Icon = pillarIcons[i]
              return (
                <li
                  key={pillar.title}
                  className="flex items-start gap-4 p-6 max-sm:border-t max-sm:first:border-t-0 sm:border-l sm:first:border-l-0 lg:p-8"
                >
                  <Icon className="size-8 shrink-0 text-apag-red" strokeWidth={1.75} aria-hidden="true" />
                  <div>
                    <h2 className="text-tech text-[0.8125rem] text-apag-ink">{pillar.title}</h2>
                    <p className="mt-1.5 text-[0.9375rem] leading-snug text-apag-slate">{pillar.description}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}
