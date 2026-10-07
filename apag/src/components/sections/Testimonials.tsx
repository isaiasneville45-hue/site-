import { useCallback, useEffect, useState, type KeyboardEvent } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

import { Reveal } from '@/components/motion'
import { SectionHeading } from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { company } from '@/config/company'
import { testimonials } from '@/config/testimonials'
import { cn } from '@/lib/utils'

/** Carrossel de depoimentos. Some automaticamente se a lista estiver vazia. */
export function Testimonials() {
  if (testimonials.length === 0) return null
  return <TestimonialsCarousel />
}

function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, containScroll: 'trimSnaps' })
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState<number[]>([])
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const sync = useCallback(() => {
    if (!emblaApi) return
    setSnaps(emblaApi.scrollSnapList())
    setSelected(emblaApi.selectedScrollSnap())
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  // Sincroniza o estado dos controles com a instância do Embla (sistema externo).
  useEffect(() => {
    if (!emblaApi) return
    // oxlint-disable-next-line react/set-state-in-effect
    sync()
    emblaApi.on('select', sync).on('reInit', sync)
    return () => {
      emblaApi.off('select', sync).off('reInit', sync)
    }
  }, [emblaApi, sync])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      emblaApi?.scrollPrev()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      emblaApi?.scrollNext()
    }
  }

  const hasControls = snaps.length > 1

  return (
    <section aria-labelledby="depoimentos-title" className="relative overflow-hidden bg-apag-black py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 size-[32rem] rounded-full bg-apag-red/10 blur-[140px]"
      />

      <div className="container relative">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="depoimentos-title"
            eyebrow="Depoimentos"
            title={`Quem confia na ${company.name}`}
            description="A opinião de quem já conta com a gente para manter seus imóveis protegidos."
          />
          {hasControls ? (
            <div className="flex shrink-0 gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canPrev}
                aria-label="Depoimento anterior"
              >
                <ChevronLeft aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => emblaApi?.scrollNext()}
                disabled={!canNext}
                aria-label="Próximo depoimento"
              >
                <ChevronRight aria-hidden="true" />
              </Button>
            </div>
          ) : null}
        </div>

        <Reveal className="mt-14">
          <div
            role="region"
            aria-roledescription="carrossel"
            aria-label="Depoimentos de clientes (use as setas do teclado para navegar)"
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="-m-3 overflow-hidden rounded-[2rem] p-3"
            ref={emblaRef}
          >
            <div className="-ml-5 flex touch-pan-y">
              {testimonials.map((item, i) => (
                <div
                  key={i}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} de ${testimonials.length}`}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-5 md:basis-1/2 lg:basis-1/3"
                >
                  <figure className="flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-7 shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] sm:p-8">
                    <span className="grid size-12 place-items-center rounded-2xl bg-apag-red-45 ring-1 ring-apag-red-65">
                      <Quote className="size-5 fill-white text-white" aria-hidden="true" />
                    </span>
                    <blockquote className="mt-6 flex-1 text-lg leading-relaxed text-white/85">
                      “{item.quote}”
                    </blockquote>
                    <figcaption className="mt-8 border-t border-white/10 pt-5 text-sm font-semibold text-white">
                      {item.author}
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {hasControls ? (
          <div className="mt-8 flex justify-center gap-2" role="group" aria-label="Escolher depoimento">
            {snaps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Ir para o depoimento ${i + 1}`}
                aria-current={i === selected ? 'true' : undefined}
                className="grid size-8 place-items-center rounded-full"
              >
                <span
                  className={cn(
                    'block h-2 rounded-full transition-all duration-300',
                    i === selected ? 'w-7 bg-apag-red shadow-glow' : 'w-2 bg-white/25 hover:bg-white/45',
                  )}
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
