import { Reveal } from '@/components/motion'
import { SectionHeading } from '@/components/SectionHeading'
import { processSteps } from '@/config/content'
import { headings } from '@/config/sections'

/** Etapas do atendimento: é uma sequência real, por isso numerada. */
export function Process() {
  return (
    <section id="como-trabalhamos" aria-labelledby="processo-title" className="bg-white py-20 lg:py-28">
      <div className="container">
        <SectionHeading id="processo-title" title={headings.process.title} description={headings.process.description} />

        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.06}
              className="relative border-t border-apag-line-strong pt-6"
            >
              <span aria-hidden="true" className="absolute -top-px left-0 h-0.5 w-12 bg-apag-red" />
              <span aria-hidden="true" className="text-sm font-semibold tabular-nums text-apag-red-strong">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-heading mt-3 text-lg">
                <span className="sr-only">Etapa {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-apag-slate">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
