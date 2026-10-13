import { PlanDrawing } from '@/components/PlanDrawing'
import { Reveal } from '@/components/motion'
import { WhatsAppIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { finalCta } from '@/config/sections'
import { whatsappUrl } from '@/lib/contact'

/** Chamada final: faixa marinho com a malha técnica, título curto e as duas ações. */
export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="theme-dark relative isolate overflow-clip-safe bg-apag-navy-900">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-blueprint [mask-image:linear-gradient(270deg,#000_0%,transparent_70%)]"
      />
      <PlanDrawing className="absolute -right-16 top-1/2 -z-10 hidden w-[38rem] -translate-y-1/2 opacity-[0.12] lg:block" />
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-apag-red" />

      <div className="container py-20 lg:py-28">
        <Reveal className="max-w-3xl">
          <h2 id="cta-title" className="text-title text-balance">
            {finalCta.title}
          </h2>
          <p className="mt-5 text-lg text-white/72 sm:text-xl">{finalCta.description}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#contato">Solicitar orçamento</a>
            </Button>
            <Button asChild size="lg" variant="outline-dark">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
