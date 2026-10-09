import { useEffect, useState, type ComponentType, type ReactNode } from 'react'
import { Clock, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react'

import { Reveal } from '@/components/motion'
import { SectionHeading } from '@/components/SectionHeading'
import { InstagramIcon, WhatsAppIcon } from '@/components/icons'
import { company } from '@/config/company'
import { mailHref, phoneHref, whatsappUrl } from '@/lib/contact'

export function Contact() {
  // O formulário (React Hook Form + Zod + Select) fica num chunk separado, carregado
  // logo depois da hidratação, para deixar o carregamento inicial mais leve.
  // No HTML pré-renderizado aparece o esqueleto do formulário.
  const [ContactForm, setContactForm] = useState<ComponentType | null>(null)
  useEffect(() => {
    let active = true
    import('@/components/ContactForm').then((mod) => active && setContactForm(() => mod.default))
    return () => {
      active = false
    }
  }, [])

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="relative overflow-clip-safe bg-apag-black py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute -right-40 top-20 size-[34rem] rounded-full bg-apag-crimson/15 blur-[140px]"
      />

      <div className="container relative">
        <SectionHeading
          id="contato-title"
          eyebrow="Contato"
          title="Solicite seu orçamento"
          description="Preencha o formulário e envie direto pelo WhatsApp, ou use um dos nossos canais. Respondemos o quanto antes."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-8">
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] sm:p-10">
              {ContactForm ? <ContactForm /> : <FormSkeleton />}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-4">
            <ul className="grid gap-3">
              <ContactItem icon={Phone} label="Telefone" href={phoneHref()}>
                {company.phone}
              </ContactItem>
              <ContactItem icon={WhatsAppIcon} label="WhatsApp" href={whatsappUrl()} external>
                Conversar agora
              </ContactItem>
              <ContactItem icon={Mail} label="E-mail" href={mailHref()}>
                {company.email}
              </ContactItem>
              <ContactItem icon={MapPin} label="Endereço" href="#localizacao">
                {company.addressLine}
              </ContactItem>
              <ContactItem icon={Clock} label="Horário de atendimento">
                {company.hours}
              </ContactItem>
              {company.instagram ? (
                <ContactItem icon={InstagramIcon} label="Instagram" href={company.instagram} external>
                  {company.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, '@').replace(/\/$/, '')}
                </ContactItem>
              ) : null}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function FormSkeleton() {
  return (
    <div aria-hidden="true" className="grid animate-pulse gap-5 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="grid gap-2">
          <div className="h-3.5 w-24 rounded-full bg-white/10" />
          <div className="h-12 rounded-2xl bg-white/[0.06]" />
        </div>
      ))}
      <div className="grid gap-2 sm:col-span-2">
        <div className="h-3.5 w-32 rounded-full bg-white/10" />
        <div className="h-12 rounded-2xl bg-white/[0.06]" />
      </div>
      <div className="h-[8.5rem] rounded-2xl bg-white/[0.06] sm:col-span-2" />
      <div className="h-13 rounded-full bg-white/[0.06] sm:col-span-2 sm:ml-auto sm:w-60" />
    </div>
  )
}

type ContactItemProps = {
  icon: LucideIcon | typeof WhatsAppIcon
  label: string
  href?: string
  external?: boolean
  children: ReactNode
}

function ContactItem({ icon: Icon, label, href, external, children }: ContactItemProps) {
  const content = (
    <>
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-apag-red-45 ring-1 ring-apag-red-65 transition-colors group-hover:bg-apag-red">
        <Icon className="size-5 text-white" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-white/55">{label}</span>
        <span className="mt-1 block break-words font-semibold text-white">{children}</span>
      </span>
    </>
  )

  const className =
    'group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4 pr-5 transition-all duration-300 sm:p-5'

  return (
    <li>
      {href ? (
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={`${className} hover:-translate-y-0.5 hover:border-apag-red-65 hover:bg-white/[0.05]`}
        >
          {content}
        </a>
      ) : (
        <div className={className}>{content}</div>
      )}
    </li>
  )
}
