import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

/*
 * Botões: retângulo com raio de 6 px, sem sombra. O vermelho fica só na ação
 * principal; as demais usam contorno (sobre claro ou sobre escuro).
 */
const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold tracking-[-0.01em] transition-[background-color,border-color,color] duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Ação principal (orçamento)
        primary: 'bg-apag-red text-white hover:bg-apag-red-strong active:bg-apag-red-strong',
        // Contorno sobre fundo claro
        secondary: 'border border-apag-line-strong bg-white text-apag-ink hover:border-apag-ink',
        // Contorno sobre fundo escuro
        'outline-dark': 'border border-white/30 text-white hover:border-white hover:bg-white/[0.08]',
        // Botão branco sobre fundo escuro
        light: 'bg-white text-apag-ink hover:bg-apag-paper',
        ghost: 'text-apag-ink hover:bg-apag-paper',
        link: 'h-auto rounded-none p-0 text-apag-red underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3.5 text-sm [&_svg]:size-4',
        default: 'h-11 px-5 text-[0.9375rem] [&_svg]:size-[1.125rem]',
        lg: 'h-12 px-6 text-base [&_svg]:size-5',
        icon: 'size-10 [&_svg]:size-5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

// oxlint-disable-next-line react/only-export-components
export { Button, buttonVariants }
