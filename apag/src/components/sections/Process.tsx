import { Reveal } from '@/components/motion'
import { SectionHeader } from '@/components/SectionHeader'
import { processSteps } from '@/config/content'
import { headings } from '@/config/sections'

/** Etapas do atendimento (sequência real): número vermelho grande sobre filete. */
export function Process() {
  return (
    <section id="como-trabalhamos" aria-labelledby="processo-title" className="section-pad bg-white">
      <div className="container">
        <SectionHeader id="processo-title" title={headings.process.title} description={headings.process.description} />

        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.06} className="border-t-2 border-apag-ink pt-6">
              <span aria-hidden="true" className="block text-4xl font-extrabold leading-none text-apag-red">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-tech mt-5 text-[0.875rem] text-apag-ink">
                <span className="sr-only">Etapa {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-[0.9375rem] leading-relaxed text-apag-slate">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
