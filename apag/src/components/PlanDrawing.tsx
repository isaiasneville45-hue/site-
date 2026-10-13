import { useId } from 'react'

import { cn } from '@/lib/utils'

/*
 * Planta baixa esquemática, desenhada como as plantas de prevenção (PPCI):
 * paredes, portas com arco de abertura, rota de fuga tracejada com setas até a
 * saída, escada e os símbolos dos equipamentos em vermelho (extintor = quadrado,
 * hidrante = círculo, acionador de alarme = quadrado com ponto). É ilustração:
 * não representa nenhum imóvel real e não tem medidas.
 */
export function PlanDrawing({ className }: { className?: string }) {
  const arrow = useId()
  return (
    <svg
      viewBox="0 0 600 400"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn('text-white', className)}
      strokeLinecap="square"
    >
      <defs>
        <marker id={arrow} viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
        </marker>
      </defs>

      {/* cotas (sem números) */}
      <g stroke="currentColor" strokeOpacity="0.35" strokeWidth="1">
        <path d="M20 6 H580 M20 1 V11 M580 1 V11 M200 3 V9 M400 3 V9" />
        <path d="M594 20 V380 M589 20 H599 M589 380 H599 M591 240 H597" />
      </g>

      {/* paredes */}
      <g stroke="currentColor" strokeOpacity="0.85" strokeWidth="3">
        <path d="M20 20 H580 V380 H452 M398 380 H20 V20" />
        <path d="M200 20 V240 M400 20 V240" />
        <path d="M20 240 H100 M136 240 H290 M326 240 H470 M506 240 H580" />
        <path d="M20 300 H150 M186 300 H240 V380" />
      </g>

      {/* portas: folha + arco de abertura */}
      <g stroke="currentColor" strokeOpacity="0.5" strokeWidth="1">
        <path d="M100 240 V204 A36 36 0 0 1 136 240" />
        <path d="M290 240 V204 A36 36 0 0 1 326 240" />
        <path d="M506 240 V204 A36 36 0 0 0 470 240" />
        <path d="M150 300 V336 A36 36 0 0 0 186 300" />
        <path d="M398 380 V344 A36 36 0 0 1 434 380 M452 380 V362 A18 18 0 0 0 434 380" />
      </g>

      {/* escada */}
      <g stroke="currentColor" strokeOpacity="0.4" strokeWidth="1">
        <path d="M430 50 H560 V160 H430 Z" />
        <path d="M443 50 V160 M456 50 V160 M469 50 V160 M482 50 V160 M495 50 V160 M508 50 V160 M521 50 V160 M534 50 V160 M547 50 V160" />
      </g>

      {/* rota de fuga */}
      <g
        stroke="currentColor"
        strokeOpacity="0.8"
        strokeWidth="1.5"
        strokeDasharray="6 5"
        markerEnd={`url(#${arrow})`}
        color="currentColor"
      >
        <path d="M110 130 V270 H405" />
        <path d="M300 130 V262" />
        <path d="M490 200 V270 H440" />
        <path d="M425 280 V368" />
      </g>

      {/* equipamentos */}
      <g fill="var(--apag-red)">
        <rect x="186" y="222" width="11" height="11" />
        <rect x="386" y="222" width="11" height="11" />
        <rect x="226" y="306" width="11" height="11" />
        <rect x="566" y="250" width="11" height="11" />
        <circle cx="40" cy="270" r="6.5" />
        <circle cx="560" cy="360" r="6.5" />
      </g>
      <g stroke="var(--apag-red)" strokeWidth="1.5">
        <rect x="292" y="252" width="12" height="12" fill="none" />
        <circle cx="40" cy="270" r="11" fill="none" />
        <circle cx="560" cy="360" r="11" fill="none" />
      </g>
      <circle cx="298" cy="258" r="2.2" fill="var(--apag-red)" />
    </svg>
  )
}
