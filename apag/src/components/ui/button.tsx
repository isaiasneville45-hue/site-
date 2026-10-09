import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Pílula vermelha neumórfica (CTA principal)
        primary:
          'bg-red-sheen text-white shadow-neu hover:-translate-y-0.5 hover:shadow-neu-hover active:translate-y-0 active:shadow-neu',
        // Pílula de contorno, "vidro" escuro
        outline:
          'border border-white/20 bg-white/[0.04] text-white shadow-neu-dark backdrop-blur-sm hover:-translate-y-0.5 hover:border-apag-red-65 hover:bg-white/[0.08] active:translate-y-0',
        // Contorno para fundos claros
        'outline-dark':
          'border border-black/15 bg-white text-apag-black shadow-[inset_0_1px_0_0_rgb(255_255_255),0_1px_2px_rgb(0_0_0/0.08),0_8px_20px_-12px_rgb(0_0_0/0.35)] hover:-translate-y-0.5 hover:border-apag-red',
        // Pílula branca (sobre blocos vermelhos)
        light:
          'bg-white text-apag-black shadow-[inset_0_-3px_6px_rgb(0_0_0/0.08),inset_0_1px_0_rgb(255_255_255),0_10px_28px_-10px_rgb(0_0_0/0.6)] hover:-translate-y-0.5 hover:bg-white/95',
        ghost: 'text-white/80 hover:bg-white/[0.06] hover:text-white',
        link: 'h-auto rounded-none p-0 text-apag-ember underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-sm [&_svg]:size-4',
        default: 'h-11 px-6 text-sm [&_svg]:size-4',
        lg: 'h-13 px-7 text-[0.95rem] [&_svg]:size-5',
        icon: 'size-11 [&_svg]:size-5',
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
