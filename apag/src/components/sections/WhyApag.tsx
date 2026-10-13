import { Photo } from '@/components/Photo'
import { Reveal } from '@/components/motion'
import { SectionHeader } from '@/components/SectionHeader'
import { company } from '@/config/company'
import { differentials } from '@/config/content'
import { photos } from '@/config/photos'
import { headings } from '@/config/sections'

/** "Empresa": seção grafite com foto ampla e os diferenciais como linhas de ficha. */
export function WhyApag() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="theme-dark section-pad bg-apag-graphite">
      <div className="container">
        <SectionHeader
          id="sobre-title"
          tone="dark"
          index={headings.why.index}
          label={headings.why.label}
          meta={`${company.address.city}/${company.address.state}`}
          title={headings.why.title}
          description={headings.why.description}
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-apag-navy-900">
              {photos.why ? (
                <Photo
                  photo={photos.why}
                  sizes="(min-width: 1280px) 720px, (min-width: 1024px) 56vw, 100vw"
                  className="absolute inset-0 size-full saturate-[0.85]"
                />
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
            <dl className="border-b border-white/14">
              {differentials.map((item) => (
                <div key={item.title} className="border-t border-white/14 py-5">
                  <dt className="font-semibold tracking-[-0.01em] text-white">{item.title}</dt>
                  <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-white/70">{item.description}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
