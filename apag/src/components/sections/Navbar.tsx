import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { ArrowUpRight, Menu } from 'lucide-react'

import { Logo } from '@/components/Logo'
import { WhatsAppIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { company } from '@/config/company'
import { navigation } from '@/config/content'
import { useActiveSection } from '@/hooks/useActiveSection'
import { whatsappUrl } from '@/lib/contact'
import { scrollToHash } from '@/lib/scroll'
import { cn } from '@/lib/utils'

const sectionIds = navigation.map((item) => item.href.slice(1))

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pendingHash = useRef<string | null>(null)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // No menu mobile, fecha o painel primeiro e só depois rola até a seção
  // (com o painel aberto a rolagem da página fica travada).
  const navigateFromMenu = (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault()
    pendingHash.current = hash
    setMenuOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300',
        scrolled
          ? 'border-white/10 bg-apag-noir/85 shadow-[0_12px_32px_-18px_rgb(0_0_0/0.9)] backdrop-blur-xl'
          : 'border-transparent bg-transparent',
      )}
    >
      <a
        href="#conteudo"
        className="sr-only rounded-full bg-apag-red px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        Pular para o conteúdo
      </a>

      <nav aria-label="Principal" className="container flex h-18 items-center justify-between gap-6">
        <a href="#inicio" aria-label={`${company.name}, voltar ao início`} className="shrink-0 rounded-lg">
          <Logo />
        </a>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {navigation.map((item) => {
            const isActive = active === item.href.slice(1)
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors',
                    isActive ? 'bg-white/[0.07] text-white' : 'text-white/70 hover:text-white',
                  )}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#contato">
              Solicitar orçamento
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="xl:hidden" aria-label="Abrir menu">
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              onCloseAutoFocus={(event) => {
                const hash = pendingHash.current
                if (!hash) return
                event.preventDefault()
                pendingHash.current = null
                requestAnimationFrame(() => scrollToHash(hash))
              }}
            >
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Navegue pelas seções do site da {company.name}.</SheetDescription>
              <Logo size="sm" className="mt-2" />
              <ul className="mt-6 flex flex-col">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(event) => navigateFromMenu(event, item.href)}
                      aria-current={active === item.href.slice(1) ? 'location' : undefined}
                      className="flex items-center justify-between border-b border-white/[0.07] py-4 font-display text-sm uppercase tracking-wide text-white/85 transition-colors hover:text-white aria-[current]:text-apag-ember"
                    >
                      {item.label}
                      <ArrowUpRight className="size-4 text-white/40" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3">
                <Button asChild size="lg">
                  <a href="#contato" onClick={(event) => navigateFromMenu(event, '#contato')}>
                    Solicitar orçamento
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon />
                    Falar no WhatsApp
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
