import { ArrowRight, Flame } from 'lucide-react'

import { Reveal } from '@/components/motion'
import { WhatsAppIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { whatsappUrl } from '@/lib/contact'

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="bg-apag-noir py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <div className="on-red relative isolate overflow-hidden rounded-[2rem] bg-noir-crimson px-6 py-16 text-center shadow-glow-lg sm:rounded-[2.5rem] sm:px-12 lg:px-20 lg:py-24">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-60" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noise opacity-[0.07] mix-blend-overlay" />
            <Flame
              aria-hidden="true"
              strokeWidth={1}
              className="absolute -bottom-16 -right-10 -z-10 size-80 rotate-12 text-white/[0.06] sm:size-[26rem]"
            />
            <div
              aria-hidden="true"
              className="absolute -left-20 -top-24 -z-10 size-80 rounded-full bg-apag-red/40 blur-[100px]"
            />

            <h2
              id="cta-title"
              className="font-display-title mx-auto max-w-4xl text-[clamp(1.2rem,0.7rem+2.6vw,2.6rem)] text-balance"
            >
              Seu imóvel está em dia com a segurança contra incêndio?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 text-pretty sm:text-lg">
              Fale com a nossa equipe e receba um orçamento para instalar, manter e regularizar os sistemas de prevenção
              do seu imóvel.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="light">
                <a href="#contato">
                  Solicitar orçamento
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/35 bg-white/10 hover:border-white/60">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
