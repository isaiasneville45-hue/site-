/**
 * Rola até a âncora (#secao), atualiza a URL e move o foco para a seção,
 * para quem navega por teclado/leitor de tela continuar a partir dali.
 */
export function scrollToHash(hash: string) {
  const target = document.getElementById(hash.replace(/^#/, ''))
  if (!target) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  if (window.location.hash !== hash) window.history.pushState(null, '', hash)

  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
}
