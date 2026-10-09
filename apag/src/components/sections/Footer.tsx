import { useSyncExternalStore, type ReactNode } from 'react'
import { ArrowUp, MapPin } from 'lucide-react'

import { Logo } from '@/components/Logo'
import { InstagramIcon, WhatsAppIcon } from '@/components/icons'
import { company } from '@/config/company'
import { navigation } from '@/config/content'
import { services } from '@/config/services'
import { mailHref, phoneHref, whatsappUrl } from '@/lib/contact'

const subscribeNothing = () => () => {}
const currentYear = () => new Date().getFullYear()
const buildYear = () => __BUILD_YEAR__

export function Footer() {
  // Ano do build no HTML pré-renderizado; no navegador, o ano atual.
  const year = useSyncExternalStore(subscribeNothing, currentYear, buildYear)

  return (
    <footer className="relative overflow-clip-safe border-t border-white/[0.07] bg-apag-black pt-20">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-apag-red to-transparent"
      />

      <div className="container grid gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:gap-10">
        <div className="max-w-sm">
          <a href="#inicio" aria-label={`${company.name}, voltar ao início`} className="inline-block rounded-lg">
            <Logo />
          </a>
          <p className="mt-5 leading-relaxed text-white/65">{company.shortAbout}</p>
          <div className="mt-6 flex gap-3">
            <SocialLink href={whatsappUrl()} label="WhatsApp">
              <WhatsAppIcon className="size-5" />
            </SocialLink>
            {company.instagram ? (
              <SocialLink href={company.instagram} label="Instagram">
                <InstagramIcon className="size-5" />
              </SocialLink>
            ) : null}
          </div>
        </div>

        <FooterColumn title="Navegação">
          {navigation.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-white/65 transition-colors hover:text-white">
                {item.label}
              </a>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Serviços">
          {services.map((service) => (
            <li key={service.id}>
              <a href="#servicos" className="text-white/65 transition-colors hover:text-white">
                {service.title}
              </a>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Contato">
          <li>
            <a href={phoneHref()} className="text-white/65 transition-colors hover:text-white">
              {company.phone}
            </a>
          </li>
          <li>
            <a href={mailHref()} className="break-words text-white/65 transition-colors hover:text-white">
              {company.email}
            </a>
          </li>
          <li className="text-white/65">
            <address className="not-italic">
              {company.address.street} – {company.address.district}
              <br />
              {company.address.city}/{company.address.state} – CEP {company.address.zip}
            </address>
            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 font-semibold text-apag-ember transition-colors hover:text-white"
            >
              <MapPin className="size-4" aria-hidden="true" />
              Ver no mapa
            </a>
          </li>
          <li className="text-white/65">{company.hours}</li>
        </FooterColumn>
      </div>

      <div className="border-t border-white/[0.07]">
        <div className="container flex flex-col gap-4 py-7 pr-24 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between sm:pr-28">
          <p>
            © {year} {company.legalName} · CNPJ {company.cnpj}
          </p>
          <a
            href="#inicio"
            className="inline-flex items-center gap-2 self-start font-semibold text-white/70 transition-colors hover:text-white sm:self-auto"
          >
            Voltar ao topo
            <ArrowUp className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xs uppercase tracking-[0.14em] text-white">{title}</h2>
      <ul className="mt-5 grid gap-3 text-sm">{children}</ul>
    </div>
  )
}

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-white/80 shadow-neu-dark transition-all duration-300 hover:-translate-y-0.5 hover:border-apag-red hover:bg-apag-red hover:text-white"
    >
      {children}
    </a>
  )
}
