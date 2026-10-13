import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

import { Reveal } from '@/components/motion'
import { company, type Stat } from '@/config/company'
import { headings } from '@/config/sections'
import { cn } from '@/lib/utils'

export function Stats() {
  // Só os números já preenchidos em company.ts; nunca mostra placeholder no site.
  const stats = company.stats.filter((stat) => stat.value !== null)
  if (stats.length === 0) return null
  return (
    <section aria-labelledby="numeros-title" className="relative overflow-clip-safe bg-apag-noir py-20 lg:py-24">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
      <div className="container relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 id="numeros-title" className="font-display-title text-[clamp(2rem,3vw+1rem,3rem)] text-balance">
            {headings.stats.title}
          </h2>
        </Reveal>

        <dl
          className={cn(
            'mx-auto mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10',
            stats.length === 1 && 'max-w-sm',
            stats.length === 2 && 'max-w-2xl grid-cols-2',
            stats.length === 3 && 'max-w-4xl sm:grid-cols-3',
            stats.length >= 4 && 'grid-cols-2 lg:grid-cols-4',
          )}
        >
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="flex flex-col items-center gap-3 bg-apag-noir px-4 py-10 text-center sm:py-12"
            >
              <dt className="order-last max-w-[14rem] text-sm text-white/65 sm:text-base">{stat.label}</dt>
              <dd className="font-display text-[clamp(2.75rem,1.6rem+4vw,4.5rem)] font-bold leading-none tracking-tight">
                <Counter stat={stat} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  // null = valor final (igual ao HTML pré-renderizado e sem JavaScript); a contagem começa ao entrar na tela
  const [display, setDisplay] = useState<number | null>(null)

  useEffect(() => {
    if (!inView || stat.value === null || reduce) return
    // Contagem com easing (easeOutExpo) via requestAnimationFrame
    const target = stat.value
    const duration = 1800
    const start = performance.now()
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min((now - start) / duration, 1)
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setDisplay(Math.round(target * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(frame)
  }, [inView, reduce, stat.value])

  if (stat.value === null) return null

  const final = `${stat.prefix ?? ''}${stat.value.toLocaleString('pt-BR')}${stat.suffix ?? ''}`

  return (
    <span ref={ref}>
      <span className="sr-only">{final}</span>
      <span aria-hidden="true" className="tabular-nums">
        {stat.prefix}
        {(display ?? stat.value).toLocaleString('pt-BR')}
        <span className="text-apag-red">{stat.suffix}</span>
      </span>
    </span>
  )
}
