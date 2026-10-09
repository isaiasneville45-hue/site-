import type { ReactNode } from 'react'
import { Clock, Mail, MapPin, Navigation, Phone, type LucideIcon } from 'lucide-react'

import { Reveal } from '@/components/motion'
import { SectionHeading } from '@/components/SectionHeading'
import { WhatsAppIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { company } from '@/config/company'
import { mailHref, phoneHref, whatsappUrl } from '@/lib/contact'

/** "Onde estamos": endereço, canais e mapa do Google. */
export function Location() {
  const { address } = company

  return (
    <section
      id="localizacao"
      aria-labelledby="localizacao-title"
      className="relative overflow-clip-safe bg-apag-noir py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute -left-40 bottom-0 size-[34rem] rounded-full bg-apag-crimson/15 blur-[140px]"
      />

      <div className="container relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
        <div>
          <SectionHeading
            id="localizacao-title"
            eyebrow="Localização"
            title="Onde estamos"
            description={`Ficamos no bairro ${address.district}, em ${address.city}/${address.state}, e atendemos ${company.serviceArea}.`}
          />

          <Reveal delay={0.1}>
            <dl className="mt-10 grid gap-3">
              <InfoRow icon={MapPin} label="Endereço">
                {address.street} – {address.district}
                <br />
                {address.city}/{address.state} – CEP {address.zip}
              </InfoRow>
              <InfoRow icon={Phone} label="Telefone">
                <a href={phoneHref()} className="transition-colors hover:text-apag-ember">
                  {company.phone}
                </a>
              </InfoRow>
              <InfoRow icon={Mail} label="E-mail">
                <a href={mailHref()} className="break-words transition-colors hover:text-apag-ember">
                  {company.email}
                </a>
              </InfoRow>
              <InfoRow icon={Clock} label="Horário de atendimento">
                {company.hours}
              </InfoRow>
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href={company.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation aria-hidden="true" />
                  Como chegar
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                  Chamar no WhatsApp
                </a>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          {/* Filtro escuro para combinar com o tema; some no hover/foco */}
          <div className="group overflow-hidden rounded-3xl border border-apag-red-45 bg-apag-black shadow-glow-lg">
            <iframe
              src={company.mapsEmbedUrl}
              title={`Mapa – ${company.name} em ${address.city}/${address.state}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-[300px] w-full border-0 grayscale contrast-125 transition-[filter] duration-500 group-hover:grayscale-0 group-hover:contrast-100 group-focus-within:grayscale-0 group-focus-within:contrast-100 sm:h-[400px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function InfoRow({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    // dt e dd são filhos diretos do grupo (estrutura válida de <dl>); o ícone fica dentro do dt.
    <div className="relative min-h-20 rounded-3xl border border-white/10 bg-white/[0.03] py-4 pl-20 pr-5 sm:min-h-22 sm:py-5 sm:pl-21">
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
        <span className="absolute left-4 top-4 grid size-12 place-items-center rounded-2xl bg-apag-red-45 ring-1 ring-apag-red-65 sm:left-5 sm:top-5">
          <Icon className="size-5 text-white" aria-hidden="true" />
        </span>
        {label}
      </dt>
      <dd className="mt-1 min-w-0 font-semibold leading-snug text-white">{children}</dd>
    </div>
  )
}
