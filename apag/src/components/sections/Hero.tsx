import type { CSSProperties } from 'react'
import { ArrowRight } from 'lucide-react'

import { Photo } from '@/components/Photo'
import { Eyebrow } from '@/components/SectionHeading'
import { WhatsAppIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { photos } from '@/config/photos'
import { hero } from '@/config/sections'
import { whatsappUrl } from '@/lib/contact'

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
      className="relative isolate flex min-h-[100svh] items-center overflow-clip-safe bg-crimson-noir pb-20 pt-28 sm:pt-32 lg:pb-24 lg:pt-36"
    >
      {/* Foto real com o gradiente Crimson Noir por cima (~70%) */}
      {photos.hero ? (
        <>
          <Photo photo={photos.hero} sizes="100vw" priority className="absolute inset-0 -z-20 size-full" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-crimson-noir opacity-70" />
        </>
      ) : null}

      {/* Texturas e luzes */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noise opacity-[0.06] mix-blend-overlay" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgb(2_6_14/0.7),transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-1/4 -z-10 size-[42rem] rounded-full bg-apag-red/25 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-apag-black"
      />

      <div className="container">
        <div className="mx-auto flex max-w-[860px] flex-col items-center text-center">
          <div className="animate-fade-up">
            <Eyebrow className="rounded-2xl leading-snug sm:rounded-full">{hero.eyebrow}</Eyebrow>
          </div>

          <h1
            id="hero-title"
            style={delay(80)}
            className="font-display-title mt-7 animate-fade-up text-[clamp(2.5rem,5vw+1rem,4.5rem)] leading-[1.02] text-balance"
          >
            {hero.title}{' '}
            <span className="bg-gradient-to-r from-white via-[#ffd0d3] to-apag-ember bg-clip-text text-transparent">
              {hero.titleHighlight}
            </span>
          </h1>

          <p
            style={delay(160)}
            className="mt-7 max-w-2xl animate-fade-up text-base leading-relaxed text-white/85 text-pretty sm:text-lg"
          >
            {hero.subtitle}
          </p>

          <div
            style={delay(240)}
            className="mt-10 flex w-full animate-fade-up flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:justify-center"
          >
            <Button asChild size="lg">
              <a href="#contato">
                {hero.primaryCta}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                {hero.secondaryCta}
              </a>
            </Button>
          </div>

          <ul
            style={delay(320)}
            className="mt-12 flex animate-fade-up flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t border-white/10 pt-8 text-sm text-white/85 sm:text-base"
          >
            {hero.highlights.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 ? (
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-apag-red shadow-[0_0_8px_var(--apag-red)]"
                  />
                ) : null}
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
