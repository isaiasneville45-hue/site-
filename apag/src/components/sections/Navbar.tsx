import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Menu } from 'lucide-react'

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

const primary = navigation.filter((item) => item.primary)
// 'inicio' entra na observação para nenhum link ficar ativo no topo da página
const sectionIds = ['inicio', ...primary.map((item) => item.href.slice(1))]

/*
 * Cabeçalho fixo de 64 px. Sobre o hero (marinho) ele é transparente com texto
 * branco; ao rolar, vira uma barra branca com filete inferior. O link da seção
 * visível ganha um traço vermelho embaixo.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pendingHash = useRef<string | null>(null)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
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
        'fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-300',
        scrolled ? 'border-apag-line bg-white/95 backdrop-blur-md' : 'theme-dark border-transparent bg-transparent',
      )}
    >
      <a
        href="#conteudo"
        className="sr-only rounded-md bg-apag-red px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50"
      >
        Pular para o conteúdo
      </a>

      <nav aria-label="Principal" className="container flex h-16 items-center justify-between gap-6">
        <a href="#inicio" aria-label={`${company.name}, voltar ao início`} className="shrink-0 rounded-sm">
          <Logo tone={scrolled ? 'light' : 'dark'} descriptor />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {primary.map((item) => {
            const isActive = active === item.href.slice(1)
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'relative block rounded-sm px-3 py-2 text-[0.9375rem] font-medium whitespace-nowrap transition-colors',
                    "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-apag-red after:transition-transform after:duration-300 after:content-['']",
                    isActive && 'after:scale-x-100',
                    scrolled
                      ? isActive
                        ? 'text-apag-ink'
                        : 'text-apag-slate hover:text-apag-ink'
                      : isActive
                        ? 'text-white'
                        : 'text-white/75 hover:text-white',
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
            <a href="#contato">Solicitar orçamento</a>
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant={scrolled ? 'secondary' : 'outline-dark'}
                size="icon"
                className="lg:hidden"
                aria-label="Abrir menu"
              >
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
              <Logo descriptor className="mt-1" />
              <ul className="mt-4 flex flex-col">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(event) => navigateFromMenu(event, item.href)}
                      aria-current={active === item.href.slice(1) ? 'location' : undefined}
                      className="flex items-center gap-3 border-b border-white/10 py-4 text-lg font-medium tracking-[-0.01em] text-white/85 transition-colors hover:text-white aria-[current]:text-white"
                    >
                      <span aria-hidden="true" className="h-4 w-0.5 bg-transparent [[aria-current]>&]:bg-apag-red" />
                      {item.label}
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
                <Button asChild variant="outline-dark" size="lg">
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
