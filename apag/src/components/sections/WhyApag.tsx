import { Photo } from '@/components/Photo'
import { Reveal } from '@/components/motion'
import { SectionHeading } from '@/components/SectionHeading'
import { differentials } from '@/config/content'
import { photos } from '@/config/photos'
import { headings } from '@/config/sections'

/** "Empresa": seção grafite, foto de instalação real e os diferenciais em quatro linhas. */
export function WhyApag() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="theme-dark bg-apag-graphite py-20 lg:py-28">
      <div className="container grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <Reveal className="lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-apag-navy-900">
            {photos.why ? (
              <Photo
                photo={photos.why}
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 100vw"
                className="absolute inset-0 size-full"
              />
            ) : null}
          </div>
        </Reveal>

        <div className="lg:col-span-5 lg:col-start-8">
          <SectionHeading
            id="sobre-title"
            tone="dark"
            title={headings.why.title}
            description={headings.why.description}
          />
          <Reveal delay={0.08}>
            <dl className="mt-10 grid gap-x-8 sm:grid-cols-2">
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
