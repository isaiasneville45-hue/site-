import { useRef, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

import { Reveal } from '@/components/motion'
import { SectionHeading } from '@/components/SectionHeading'
import { WhatsAppIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { company } from '@/config/company'
import { services, type Service } from '@/config/services'
import { useServiceIntent } from '@/context/service-intent'
import { whatsappUrl } from '@/lib/contact'
import { scrollToHash } from '@/lib/scroll'

export function Services() {
  const [selected, setSelected] = useState<Service | null>(null)
  const goToForm = useRef(false)
  const { requestService } = useServiceIntent()

  return (
    <section
      id="servicos"
      aria-labelledby="servicos-title"
      className="relative overflow-hidden bg-apag-noir py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-0 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-apag-crimson/15 blur-[120px]"
      />

      <div className="container relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="servicos-title"
            eyebrow="Serviços"
            title="Proteção completa para o seu imóvel"
            description="Cuidamos de todos os sistemas de prevenção e combate a incêndio: instalação, manutenção e apoio na regularização, com um único fornecedor."
          />
          <Reveal delay={0.1} className="shrink-0">
            <Button asChild variant="outline">
              <a href="#contato">
                Pedir orçamento
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal as="li" key={service.id} delay={(i % 3) * 0.08} className="h-full">
              <ServiceCard service={service} index={i} onOpen={() => setSelected(service)} />
            </Reveal>
          ))}
        </ul>
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        {selected ? (
          <DialogContent
            onCloseAutoFocus={(event) => {
              if (!goToForm.current) return
              event.preventDefault()
              goToForm.current = false
              requestAnimationFrame(() => scrollToHash('#contato'))
            }}
          >
            <DialogHeader>
              <span className="mb-2 grid size-14 place-items-center rounded-2xl bg-red-sheen shadow-neu">
                <selected.icon className="size-7 text-white" aria-hidden="true" />
              </span>
              <DialogTitle>{selected.title}</DialogTitle>
              <DialogDescription>{selected.description}</DialogDescription>
            </DialogHeader>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">O que inclui</p>
              <ul className="mt-3 grid gap-2.5">
                {selected.details.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/85 sm:text-base">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-apag-red-45 ring-1 ring-apag-red-65">
                      <Check className="size-3 text-white" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <DialogFooter className="pt-2">
              <Button
                onClick={() => {
                  requestService(selected.id)
                  goToForm.current = true
                  setSelected(null)
                }}
              >
                Solicitar orçamento
                <ArrowRight aria-hidden="true" />
              </Button>
              <Button asChild variant="outline">
                <a
                  href={whatsappUrl(`Olá, ${company.name}! Gostaria de um orçamento de ${selected.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  WhatsApp
                </a>
              </Button>
            </DialogFooter>
          </DialogContent>
        ) : null}
      </Dialog>
    </section>
  )
}

function ServiceCard({ service, index, onOpen }: { service: Service; index: number; onOpen: () => void }) {
  const Icon = service.icon
  return (
    <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-7 shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-apag-red hover:shadow-glow-lg focus-within:border-apag-red-65 sm:p-8">
      {/* brilho que aparece no hover */}
      <div
        aria-hidden="true"
        className="absolute -inset-px -z-10 bg-[radial-gradient(28rem_14rem_at_20%_0%,var(--apag-red-45),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-60"
      />

      <div className="flex items-start justify-between">
        <span className="grid size-14 place-items-center rounded-2xl bg-apag-red-45 shadow-[inset_0_1px_0_rgb(255_255_255/0.2)] ring-1 ring-apag-red-65 transition-all duration-300 group-hover:bg-apag-red group-hover:shadow-glow">
          <Icon className="size-7 text-white" aria-hidden="true" />
        </span>
        <span className="font-display text-sm text-white/30" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className="font-display-title mt-8 text-[1.05rem] leading-snug tracking-normal">{service.title}</h3>
      <p className="mt-3 flex-1 leading-relaxed text-white/70">{service.description}</p>

      <button
        type="button"
        onClick={onOpen}
        className="mt-7 inline-flex items-center gap-2 self-start rounded-full text-sm font-semibold text-apag-ember transition-colors after:absolute after:inset-0 after:content-[''] hover:text-white"
      >
        Saiba mais
        <span className="sr-only"> sobre {service.title}</span>
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </button>
    </article>
  )
}
