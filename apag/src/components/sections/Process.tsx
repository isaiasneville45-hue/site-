import { m, useReducedMotion } from 'framer-motion'

import { Reveal } from '@/components/motion'
import { SectionHeading } from '@/components/SectionHeading'
import { processSteps } from '@/config/content'
import { EASE_OUT } from '@/lib/motion'

export function Process() {
  const reduce = useReducedMotion()

  return (
    <section
      id="como-trabalhamos"
      aria-labelledby="processo-title"
      className="relative overflow-hidden bg-apag-noir py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute -left-40 bottom-0 size-[36rem] rounded-full bg-apag-crimson/15 blur-[140px]"
      />

      <div className="container relative">
        <SectionHeading
          id="processo-title"
          eyebrow="Como trabalhamos"
          title="Do primeiro contato à manutenção periódica"
          description="Um processo simples e transparente, para você saber exatamente o que acontece em cada etapa."
          align="center"
        />

        <div className="relative mt-16 lg:mt-20">
          {/* trilho da timeline: vertical no mobile, horizontal no desktop */}
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-7 top-8 w-px bg-white/10 lg:inset-x-[12.5%] lg:bottom-auto lg:top-7 lg:h-px lg:w-auto"
          />
          <m.div
            aria-hidden="true"
            className="absolute bottom-8 left-7 top-8 w-px origin-top bg-gradient-to-b from-apag-red via-apag-red to-apag-crimson lg:hidden"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={reduce ? { duration: 0 } : { duration: 1.6, ease: EASE_OUT }}
          />
          <m.div
            aria-hidden="true"
            className="absolute inset-x-[12.5%] top-7 hidden h-px origin-left bg-gradient-to-r from-apag-red via-apag-red to-apag-crimson lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={reduce ? { duration: 0 } : { duration: 1.6, ease: EASE_OUT }}
          />

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
            {processSteps.map(({ icon: Icon, title, description }, i) => (
              <Reveal
                as="li"
                key={title}
                delay={i * 0.12}
                className="relative flex gap-6 lg:flex-col lg:items-center lg:gap-8 lg:text-center"
              >
                <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border border-apag-red-65 bg-apag-noir font-display text-sm text-white shadow-glow">
                  <span className="absolute inset-1.5 rounded-full bg-red-sheen shadow-neu" aria-hidden="true" />
                  <span className="relative">{String(i + 1).padStart(2, '0')}</span>
                </span>
                <div className="flex-1 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.05)] lg:w-full lg:p-7">
                  <Icon className="size-6 text-apag-ember lg:mx-auto" aria-hidden="true" />
                  <h3 className="font-display-title mt-4 text-[0.98rem] leading-snug tracking-normal">
                    <span className="sr-only">Etapa {i + 1}: </span>
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">{description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
