import { Reveal } from '@/components/motion'
import { WhatsAppIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { finalCta } from '@/config/sections'
import { whatsappUrl } from '@/lib/contact'

/** Chamada final: faixa marinho de ponta a ponta, título curto e as duas ações. */
export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="theme-dark relative bg-apag-navy-900">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-apag-red" />
      <div className="container py-16 lg:py-24">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <h2 id="cta-title" className="text-title max-w-3xl text-balance">
              {finalCta.title}
            </h2>
            <p className="mt-4 text-lg text-white/75">{finalCta.description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
            <Button asChild size="lg">
              <a href="#contato">Solicitar orçamento</a>
            </Button>
            <Button asChild size="lg" variant="outline-dark">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                WhatsApp
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
