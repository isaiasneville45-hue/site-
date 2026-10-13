import { Photo } from '@/components/Photo'
import { Reveal } from '@/components/motion'
import { SectionHeader } from '@/components/SectionHeader'
import { differentials } from '@/config/content'
import { photos } from '@/config/photos'
import { headings } from '@/config/sections'

/*
 * "Por que escolher a APAG" como na referência: foto de ambiente em preto e
 * branco sob véu preto, título centralizado e quatro cartões de contorno fino
 * com ícone vermelho.
 */
export function WhyApag() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="theme-dark section-pad relative isolate overflow-clip-safe bg-apag-black"
    >
      {photos.why ? (
        <Photo photo={photos.why} sizes="100vw" className="absolute inset-0 -z-20 size-full photo-mono" />
      ) : null}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-apag-black/85" />

      <div className="container">
        <SectionHeader
          id="sobre-title"
          tone="dark"
          title={headings.why.title}
          accent={headings.why.accent}
          description={headings.why.description}
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {differentials.map(({ icon: Icon, title, description }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 0.06}
              className="rounded-md border border-white/20 bg-apag-black/50 p-6 text-center backdrop-blur-[2px] lg:p-8"
            >
              <Icon className="mx-auto size-9 text-apag-red" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="text-tech mt-5 text-[0.875rem] text-white">{title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/72">{description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
