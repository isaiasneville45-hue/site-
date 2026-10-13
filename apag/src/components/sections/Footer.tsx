import { useSyncExternalStore, type ReactNode } from 'react'

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
    <footer className="theme-dark bg-apag-navy-950 text-white">
      <div className="container grid gap-12 pb-12 pt-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:pt-20">
        <div className="lg:col-span-4">
          <a href="#inicio" aria-label={`${company.name}, voltar ao início`} className="inline-block rounded-sm">
            <Logo descriptor />
          </a>
          <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-white/65">{company.shortAbout}</p>
          <div className="mt-6 flex gap-2">
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

        <FooterColumn title="Navegação" className="lg:col-span-2 lg:col-start-6">
          {navigation.map((item) => (
            <li key={item.href}>
              <FooterLink href={item.href}>{item.label}</FooterLink>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Serviços" className="lg:col-span-2">
          {services.map((service) => (
            <li key={service.id}>
              <FooterLink href="#servicos">{service.title}</FooterLink>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Contato" className="lg:col-span-3">
          <li>
            <FooterLink href={phoneHref()}>{company.phone}</FooterLink>
          </li>
          <li>
            <FooterLink href={mailHref()}>{company.email}</FooterLink>
          </li>
          <li className="text-white/65">
            <address className="not-italic">
              {company.address.street}, {company.address.district}
              <br />
              {company.address.city}/{company.address.state}, CEP {company.address.zip}
            </address>
            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-apag-red"
            >
              Ver no mapa
            </a>
          </li>
          <li className="text-white/65">{company.hours}</li>
        </FooterColumn>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-3 py-6 pr-20 text-[0.8125rem] text-white/55 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:pr-24">
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <span>
              © {year} {company.legalName}
            </span>
            <span>CNPJ {company.cnpj}</span>
            <a
              href="/produtos/CREDITOS.md"
              target="_blank"
              rel="noopener"
              className="underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Créditos das imagens
            </a>
          </p>
          <a href="#inicio" className="font-medium text-white/70 transition-colors hover:text-white">
            Voltar ao topo
          </a>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="text-label text-white/50">{title}</h2>
      <ul className="mt-4 grid gap-2.5 text-[0.9375rem]">{children}</ul>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="break-words text-white/75 transition-colors hover:text-white">
      {children}
    </a>
  )
}

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-10 place-items-center rounded-md border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white"
    >
      {children}
    </a>
  )
}
