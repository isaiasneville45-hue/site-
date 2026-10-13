import { Check } from 'lucide-react'

import { Reveal } from '@/components/motion'
import { SectionHeading } from '@/components/SectionHeading'
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
 * Composição editorial: o título divide a primeira linha com o destaque da
 * regularização (PPCI), que é o serviço que amarra os demais; abaixo, os cinco
 * sistemas numa grade de filetes, cada um levando direto à aba de produtos.
 */
export function Services() {
  const { requestService } = useServiceIntent()

  const quote = (service: Service) => {
    requestService(service.id)
    scrollToHash('#contato')
  }

  return (
    <section id="servicos" aria-labelledby="servicos-title" className="bg-apag-paper py-20 lg:py-28">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <SectionHeading
            id="servicos-title"
            title={headings.services.title}
            description={headings.services.description}
            className="lg:col-span-5 lg:pb-2"
          />

          {ppci ? (
            <Reveal delay={0.08} className="lg:col-span-7">
              <article className="theme-dark relative overflow-hidden rounded-2xl bg-apag-navy-900 p-6 sm:p-8">
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-apag-red" />
                <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                  <div className="max-w-md">
                    <p className="text-label text-apag-ember">{servicesUi.ppciLabel}</p>
                    <h3 className="text-heading mt-2 text-2xl">{ppci.title}</h3>
                    <p className="mt-3 leading-relaxed text-white/75">{ppci.description}</p>
                    <ul className="mt-5 grid gap-2">
                      {ppci.details.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-white/85">
                          <Check className="mt-1 size-4 shrink-0 text-apag-ember" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="light" className="self-start sm:self-auto" onClick={() => quote(ppci)}>
                    {servicesUi.quote}
                  </Button>
                </div>
              </article>
            </Reveal>
          ) : null}
        </div>

        <Reveal delay={0.12} className="mt-8 lg:mt-10">
          {/* gap-px sobre fundo de filete: linhas de 1 px entre os blocos */}
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-apag-line bg-apag-line sm:grid-cols-2 lg:grid-cols-5">
            {equipment.map((service) => (
              <li key={service.id} className="bg-white sm:max-lg:last:odd:col-span-2">
                <ServiceTile service={service} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

function ServiceTile({ service }: { service: Service }) {
  const Icon = service.icon
  const tab = productCategories.find((category) => category.id === service.id)?.id

  return (
    <article className="group relative flex h-full flex-col p-6 transition-colors duration-200 hover:bg-apag-paper/60 sm:p-7">
      {/* filete vermelho que aparece no hover/foco */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-apag-red transition-transform duration-300 group-hover:scale-x-100 group-focus-within:scale-x-100"
      />
      <Icon className="size-7 text-apag-navy-700" strokeWidth={1.5} aria-hidden="true" />
      <h3 className="text-heading mt-6 text-lg">{service.title}</h3>
      <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-apag-slate">{service.description}</p>
      {tab ? (
        <a
          href={productTabHref(tab)}
          onClick={(event) => {
            event.preventDefault()
            openProductTab(tab)
          }}
          className="mt-6 text-sm font-semibold text-apag-red-strong underline-offset-4 after:absolute after:inset-0 after:content-[''] group-hover:underline"
        >
          {servicesUi.products}
          <span className="sr-only"> de {service.title}</span>
        </a>
      ) : null}
    </article>
  )
}
