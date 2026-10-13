import { useEffect, useState, type ComponentType, type ReactNode } from 'react'
import { Clock, Mail, Navigation, Phone, type LucideIcon } from 'lucide-react'

import { Photo } from '@/components/Photo'
import { Reveal } from '@/components/motion'
import { SectionHeader } from '@/components/SectionHeader'
import { InstagramIcon, WhatsAppIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { company } from '@/config/company'
import { photos } from '@/config/photos'
import { headings } from '@/config/sections'
import { mailHref, phoneHref, whatsappUrl } from '@/lib/contact'

/**
 * Contato no padrão da referência: foto em preto e branco sob véu preto; à
 * esquerda o título, os canais e a localização (âncora #localizacao); à direita
 * o formulário num painel branco. É também a chamada final do site.
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
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="theme-dark section-pad relative isolate overflow-clip-safe bg-apag-black"
    >
      {photos.contact ? (
        <Photo photo={photos.contact} sizes="100vw" className="absolute inset-0 -z-20 size-full photo-mono" />
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(17_17_17/0.95)_0%,rgb(17_17_17/0.86)_55%,rgb(17_17_17/0.78)_100%)]"
      />
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-apag-red" />

      <div className="container grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeader
            id="contato-title"
            tone="dark"
            align="left"
            title={headings.contact.title}
            accent={headings.contact.accent}
            description={headings.contact.description}
          />

          <Reveal delay={0.06}>
            <dl className="mt-10 border-t border-white/16">
              <Channel icon={Phone} label="Telefone">
                <a href={phoneHref()} className="hover:text-apag-ember">
                  {company.phone}
                </a>
              </Channel>
              <Channel icon={WhatsAppIcon} label="WhatsApp">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-apag-ember">
                  Conversar agora
                </a>
              </Channel>
              <Channel icon={Mail} label="E-mail">
                <a href={mailHref()} className="break-words hover:text-apag-ember">
                  {company.email}
                </a>
              </Channel>
              <Channel icon={Clock} label="Horário">
                {company.hours}
              </Channel>
              {company.instagram ? (
                <Channel icon={InstagramIcon} label="Instagram">
                  <a
                    href={company.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-apag-ember"
                  >
                    {company.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, '@').replace(/\/$/, '')}
                  </a>
                </Channel>
              ) : null}
            </dl>

            <div id="localizacao" aria-labelledby="localizacao-title" role="region" className="mt-10">
              <h3 id="localizacao-title" className="text-tech text-[0.8125rem] text-white">
                {headings.location.title}
              </h3>
              <address className="mt-2 not-italic leading-relaxed text-white/75">
                {address.street}, {address.district}
                <br />
                {address.city}/{address.state}, CEP {address.zip}
              </address>
              <div className="mt-4 overflow-hidden rounded-md border border-white/16">
                <iframe
                  src={company.mapsEmbedUrl}
                  title={`Mapa: ${company.name} em ${address.city}/${address.state}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="block h-48 w-full border-0 grayscale"
                />
              </div>
              <Button asChild variant="outline-dark" size="sm" className="mt-4">
                <a href={company.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation aria-hidden="true" />
                  Como chegar
                </a>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          {/* painel branco do formulário, como na referência */}
          <div className="theme-light rounded-md bg-white p-5 shadow-[0_32px_64px_-32px_rgb(0_0_0/0.8)] sm:p-8 lg:p-10">
            <p className="text-tech mb-6 text-[0.8125rem] text-apag-ink">Solicite um orçamento</p>
            {ContactForm ? <ContactForm /> : <FormSkeleton />}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Channel({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon | typeof WhatsAppIcon
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex items-center gap-4 border-b border-white/16 py-4">
      <Icon className="size-5 shrink-0 text-apag-red" aria-hidden="true" />
      <dt className="sr-only">{label}</dt>
      <dd className="min-w-0 font-medium text-white">{children}</dd>
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
