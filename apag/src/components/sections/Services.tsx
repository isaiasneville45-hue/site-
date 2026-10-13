import { Photo } from '@/components/Photo'
import { Reveal } from '@/components/motion'
import { SectionHeader } from '@/components/SectionHeader'
import { Button } from '@/components/ui/button'
import { productCategories } from '@/config/products'
import { headings, servicesUi } from '@/config/sections'
import { services, type Service } from '@/config/services'
import { useServiceIntent } from '@/context/service-intent'
import { openProductTab, productTabHref } from '@/lib/product-tab'
import { scrollToHash } from '@/lib/scroll'

/*
 * Serviços como a galeria da referência: cartões com foto de ambiente,
 * legenda em barra clara (nome, descrição curta) e as ações. Quando o serviço
 * ainda não tem foto de ambiente, mostra um produto real do catálogo.
 */
export function Services() {
  const { requestService } = useServiceIntent()

  const quote = (service: Service) => {
    requestService(service.id)
    scrollToHash('#contato')
  }

  return (
    <section id="servicos" aria-labelledby="servicos-title" className="section-pad bg-apag-paper">
      <div className="container">
        <SectionHeader
          id="servicos-title"
          title={headings.services.title}
          description={headings.services.description}
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {services.map((service, i) => (
            <Reveal as="li" key={service.id} delay={(i % 3) * 0.06}>
              <ServiceCard service={service} onQuote={() => quote(service)} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 flex justify-center">
          <Button asChild size="lg">
            <a href="#contato">{servicesUi.quote}</a>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

function ServiceCard({ service, onQuote }: { service: Service; onQuote: () => void }) {
  const tab = productCategories.find((category) => category.id === service.id)?.id

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-apag-line bg-white shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgb(0_0_0/0.45)]">
      <div className="relative aspect-[3/2] overflow-hidden bg-apag-paper">
        {service.photo ? (
          <Photo
            photo={service.photo}
            sizes="(min-width: 1200px) 370px, (min-width: 640px) 46vw, 100vw"
            className="absolute inset-0 size-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : service.image ? (
          <img
            src={service.image.src}
            alt={service.image.alt}
            loading="lazy"
            decoding="async"
            width={800}
            height={600}
            className="absolute inset-0 size-full bg-white object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col border-t-2 border-apag-red p-5 sm:p-6">
        <h3 className="text-tech text-[0.875rem] text-apag-ink">{service.title}</h3>
        <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-apag-slate">{service.description}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold">
          {tab ? (
            <a
              href={productTabHref(tab)}
              onClick={(event) => {
                event.preventDefault()
                openProductTab(tab)
              }}
              className="text-apag-ink underline decoration-apag-line-strong underline-offset-[6px] transition-colors hover:decoration-apag-red"
            >
              {servicesUi.products}
              <span className="sr-only"> de {service.title}</span>
            </a>
          ) : null}
          <button
            type="button"
            onClick={onQuote}
            className="text-apag-red-strong underline decoration-transparent underline-offset-[6px] transition-colors hover:decoration-apag-red"
          >
            {servicesUi.quote}
            <span className="sr-only"> de {service.title}</span>
          </button>
        </div>
      </div>
    </article>
  )
}
