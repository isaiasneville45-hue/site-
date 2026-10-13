import { Reveal } from '@/components/motion'
import { SectionHeader } from '@/components/SectionHeader'
import { processSteps } from '@/config/content'
import { headings } from '@/config/sections'

/** Etapas do atendimento (sequência real): números grandes em Geist Mono sobre uma linha contínua. */
export function Process() {
  return (
    <section id="como-trabalhamos" aria-labelledby="processo-title" className="section-pad bg-white">
      <div className="container">
        <SectionHeader
          id="processo-title"
          index={headings.process.index}
          label={headings.process.label}
          meta={`${processSteps.length} etapas`}
          title={headings.process.title}
          description={headings.process.description}
        />

        <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.06} className="relative">
              <span
                aria-hidden="true"
                className="block font-mono text-5xl font-normal leading-none tracking-[-0.04em] text-apag-navy-900"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="relative mt-6 border-t border-apag-line-strong pt-6">
                <span aria-hidden="true" className="absolute -top-px left-0 h-0.5 w-12 bg-apag-red" />
                <h3 className="text-heading text-lg">
                  <span className="sr-only">Etapa {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-[0.9375rem] leading-relaxed text-apag-slate">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
