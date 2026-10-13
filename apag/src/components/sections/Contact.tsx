import { useEffect, useState, type ComponentType, type ReactNode } from 'react'
import { Navigation } from 'lucide-react'

import { Reveal } from '@/components/motion'
import { SectionHeading } from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { company } from '@/config/company'
import { headings } from '@/config/sections'
import { mailHref, phoneHref, whatsappUrl } from '@/lib/contact'

/**
 * Contato e localização numa seção só: formulário à esquerda; canais, endereço
 * e mapa à direita (o bloco do endereço mantém a âncora #localizacao).
 */
export function Contact() {
  // O formulário (React Hook Form + Zod + Select) fica num chunk separado, carregado
  // logo depois da hidratação. No HTML pré-renderizado aparece o esqueleto.
  const [ContactForm, setContactForm] = useState<ComponentType | null>(null)
  useEffect(() => {
    let active = true
    import('@/components/ContactForm').then((mod) => active && setContactForm(() => mod.default))
    return () => {
      active = false
    }
  }, [])

  const { address } = company

  return (
    <section id="contato" aria-labelledby="contato-title" className="bg-white py-20 lg:py-28">
      <div className="container">
        <SectionHeading id="contato-title" title={headings.contact.title} description={headings.contact.description} />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <div className="rounded-2xl border border-apag-line p-5 sm:p-8">
              {ContactForm ? <ContactForm /> : <FormSkeleton />}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
            <dl className="border-t border-apag-line-strong">
              <Channel label="Telefone">
                <a href={phoneHref()} className="hover:text-apag-red-strong">
                  {company.phone}
                </a>
              </Channel>
              <Channel label="WhatsApp">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-apag-red-strong"
                >
                  Conversar agora
                </a>
              </Channel>
              <Channel label="E-mail">
                <a href={mailHref()} className="break-words hover:text-apag-red-strong">
                  {company.email}
                </a>
              </Channel>
              <Channel label="Horário">{company.hours}</Channel>
              {company.instagram ? (
                <Channel label="Instagram">
                  <a
                    href={company.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-apag-red-strong"
                  >
                    {company.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, '@').replace(/\/$/, '')}
                  </a>
                </Channel>
              ) : null}
            </dl>

            <div id="localizacao" aria-labelledby="localizacao-title" role="region" className="mt-10">
              <h3 id="localizacao-title" className="text-heading">
                {headings.location.title}
              </h3>
              <address className="mt-2 not-italic leading-relaxed text-apag-slate">
                {address.street}, {address.district}
                <br />
                {address.city}/{address.state}, CEP {address.zip}
              </address>
              <div className="mt-4 overflow-hidden rounded-lg border border-apag-line">
                <iframe
                  src={company.mapsEmbedUrl}
                  title={`Mapa: ${company.name} em ${address.city}/${address.state}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="block h-56 w-full border-0"
                />
              </div>
              <Button asChild variant="secondary" size="sm" className="mt-4">
                <a href={company.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation aria-hidden="true" />
                  Como chegar
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Channel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-apag-line-strong py-4">
      <dt className="shrink-0 text-label text-apag-slate">{label}</dt>
      <dd className="min-w-0 text-right font-medium text-apag-ink">{children}</dd>
    </div>
  )
}

function FormSkeleton() {
  return (
    <div aria-hidden="true" className="grid animate-pulse gap-5 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="grid gap-2">
          <div className="h-3.5 w-24 rounded-sm bg-apag-paper" />
          <div className="h-12 rounded-md bg-apag-paper" />
        </div>
      ))}
      <div className="grid gap-2 sm:col-span-2">
        <div className="h-3.5 w-32 rounded-sm bg-apag-paper" />
        <div className="h-12 rounded-md bg-apag-paper" />
      </div>
      <div className="h-[8.5rem] rounded-md bg-apag-paper sm:col-span-2" />
      <div className="h-12 rounded-md bg-apag-paper sm:col-span-2 sm:ml-auto sm:w-56" />
    </div>
  )
}
