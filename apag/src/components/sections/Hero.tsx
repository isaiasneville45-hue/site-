import type { CSSProperties } from 'react'

import { Photo } from '@/components/Photo'
import { WhatsAppIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { photos } from '@/config/photos'
import { hero } from '@/config/sections'
import { whatsappUrl } from '@/lib/contact'

/*
 * Hero assimétrico: texto à esquerda sobre o marinho, foto real à direita de
 * ponta a ponta e, encaixada no pé da foto, a ficha técnica da empresa (o
 * "carimbo" das pranchas de projeto). Anima só com CSS, uma vez, no carregamento:
 * o HTML pré-renderizado já aparece animando sem esperar o JavaScript.
 */
const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` })

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="theme-dark relative isolate flex flex-col overflow-clip-safe bg-apag-navy-950 lg:block"
    >
      <div className="order-2 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[47%]">
        <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-full">
          {photos.hero ? (
            <Photo
              photo={photos.hero}
              sizes="(min-width: 1024px) 47vw, 100vw"
              priority
              className="absolute inset-0 size-full animate-fade-in"
            />
          ) : null}
          <div aria-hidden="true" className="absolute inset-0 bg-apag-navy-950/20" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 hidden h-28 bg-gradient-to-b from-apag-navy-950/70 to-transparent lg:block"
          />
        </div>
        <Facts className="lg:absolute lg:bottom-0 lg:left-0 lg:w-[min(100%,34rem)]" />
      </div>

      <div className="container order-1">
        <div className="flex flex-col pb-14 pt-28 sm:pt-32 lg:min-h-[min(100svh,52rem)] lg:w-[50%] lg:justify-center lg:pb-36 lg:pr-10 lg:pt-32">
          <span aria-hidden="true" className="block h-[3px] w-10 origin-left animate-line-in bg-apag-red" />
          <h1 id="hero-title" style={delay(80)} className="text-display mt-8 animate-fade-up text-balance">
            {hero.title}
          </h1>
          <p
            style={delay(180)}
            className="mt-6 max-w-[34rem] animate-fade-up text-lg leading-relaxed text-white/75 text-pretty sm:text-xl"
          >
            {hero.subtitle}
          </p>
          <div style={delay(280)} className="mt-10 flex animate-fade-up flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#contato">{hero.primaryCta}</a>
            </Button>
            <Button asChild size="lg" variant="outline-dark">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                {hero.secondaryCta}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Ficha técnica: só dados comprovados (fundação, tempo de atuação, região). */
function Facts({ className }: { className?: string }) {
  return (
    <dl
      style={delay(380)}
      className={`grid animate-fade-up grid-cols-[1fr_1fr_1.35fr] border-t border-white/14 bg-apag-navy-950 lg:border-r ${className ?? ''}`}
    >
      {hero.facts.map((fact, i) => (
        <div key={fact.label} className={`px-4 py-5 sm:px-6 sm:py-6 ${i > 0 ? 'border-l border-white/14' : ''}`}>
          <dt className="text-label text-white/55">{fact.label}</dt>
          <dd className="mt-1.5 text-base font-semibold leading-snug tracking-[-0.01em] tabular-nums text-white sm:text-lg">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
