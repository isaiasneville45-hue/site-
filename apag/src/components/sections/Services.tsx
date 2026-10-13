import { PlanDrawing } from '@/components/PlanDrawing'
import { Reveal } from '@/components/motion'
import { SectionHeader } from '@/components/SectionHeader'
import { Button } from '@/components/ui/button'
import { productCategories } from '@/config/products'
import { headings, servicesUi } from '@/config/sections'
import { services, type Service } from '@/config/services'
import { useServiceIntent } from '@/context/service-intent'
import { openProductTab, productTabHref } from '@/lib/product-tab'
import { scrollToHash } from '@/lib/scroll'

const equipment = services.filter((service) => service.id !== 'ppci')
const ppci = services.find((service) => service.id === 'ppci')

/*
 * Composição editorial: à esquerda, a regularização (PPCI) em destaque, com a
 * planta de prevenção; à direita, os cinco sistemas como uma lista técnica
 * (sigla, nome, descrição, foto de um produto real do catálogo e ações).
 */
export function Services() {
  const { requestService } = useServiceIntent()

  const quote = (service: Service) => {
    requestService(service.id)
    scrollToHash('#contato')
  }

  return (
    <section id="servicos" aria-labelledby="servicos-title" className="section-pad bg-white">
      <div className="container">
        <SectionHeader
          id="servicos-title"
          index={headings.services.index}
          label={headings.services.label}
          meta={`${services.length} serviços`}
          title={headings.services.title}
          description={headings.services.description}
        />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          {ppci ? (
            <Reveal className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
              <article className="theme-dark flex flex-col overflow-hidden rounded-xl bg-apag-navy-900">
                <div className="relative border-b border-white/10 bg-blueprint px-6 pb-4 pt-8 sm:px-8">
                  <PlanDrawing className="w-full opacity-80" />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="flex items-center gap-3 text-tech text-white/60">
                    <span className="text-apag-ember">{ppci.code}</span>
                    {servicesUi.ppciLabel}
                  </p>
                  <h3 className="text-heading mt-3 text-2xl sm:text-[1.75rem]">{ppci.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/72">{ppci.description}</p>
                  <ul className="mt-6 grid gap-3 border-t border-white/12 pt-6">
                    {ppci.details.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-white/85">
                        <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-apag-red" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button variant="light" className="mt-8 self-start" onClick={() => quote(ppci)}>
                    {servicesUi.quote}
                    <span className="sr-only"> de {ppci.title}</span>
                  </Button>
                </div>
              </article>
            </Reveal>
          ) : null}

          <Reveal delay={0.08} className="lg:col-span-7">
            <ul className="border-t border-apag-line-strong">
              {equipment.map((service) => (
                <li key={service.id} className="border-b border-apag-line">
                  <ServiceRow service={service} onQuote={() => quote(service)} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ServiceRow({ service, onQuote }: { service: Service; onQuote: () => void }) {
  const tab = productCategories.find((category) => category.id === service.id)?.id

  return (
    <article className="group grid grid-cols-[minmax(0,1fr)_5.5rem] items-start gap-5 py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)_7.5rem] sm:gap-6 sm:py-7">
      <span className="hidden pt-1.5 text-tech text-apag-muted transition-colors group-hover:text-apag-red-strong sm:block">
        {service.code}
      </span>
      <div>
        <h3 className="text-heading text-xl sm:text-[1.375rem]">{service.title}</h3>
        <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-apag-slate">{service.description}</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
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
      {service.image ? (
        <div className="aspect-square overflow-hidden rounded-lg border border-apag-line bg-white">
          <img
            src={service.image.src}
            alt={service.image.alt}
            loading="lazy"
            decoding="async"
            width={240}
            height={240}
            className="size-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
        </div>
      ) : null}
    </article>
  )
}
