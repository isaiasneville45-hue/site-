import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

import { Reveal } from '@/components/motion'
import { company, type Stat } from '@/config/company'

export function Stats() {
  return (
    <section aria-labelledby="numeros-title" className="relative overflow-hidden bg-apag-black py-20 lg:py-24">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
      <div className="container relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 id="numeros-title" className="font-display-title text-[clamp(1.35rem,1rem+1.6vw,2.1rem)] text-balance">
            {company.name} em números
          </h2>
        </Reveal>

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {company.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="flex flex-col items-center gap-3 bg-apag-black px-4 py-10 text-center sm:py-12">
              <dt className="order-last max-w-[14rem] text-sm text-white/65 sm:text-base">{stat.label}</dt>
              <dd className="font-display text-[clamp(2rem,1.2rem+3vw,3.5rem)] leading-none tracking-tight">
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
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView || stat.value === null) return
    if (reduce) {
      setDisplay(stat.value)
      return
    }
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

  // Placeholder: valor ainda não preenchido em src/config/company.ts
  if (stat.value === null) {
    return (
      <span ref={ref} className="text-white/45" title="Preencha este número em src/config/company.ts">
        [000]
      </span>
    )
  }

  const final = `${stat.prefix ?? ''}${stat.value.toLocaleString('pt-BR')}${stat.suffix ?? ''}`

  return (
    <span ref={ref}>
      <span className="sr-only">{final}</span>
      <span aria-hidden="true" className="tabular-nums">
        {stat.prefix}
        {display.toLocaleString('pt-BR')}
        <span className="text-apag-red">{stat.suffix}</span>
      </span>
    </span>
  )
}
