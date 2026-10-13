import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'

import { cn } from '@/lib/utils'

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn('border-b', className)} {...props} />
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group flex flex-1 items-center justify-between gap-6 py-5 text-left text-base font-semibold tracking-[-0.01em] text-apag-ink transition-colors hover:text-apag-red-strong sm:text-[1.0625rem]',
          className,
        )}
        {...props}
      >
        {children}
        <span className="grid size-8 shrink-0 place-items-center rounded-sm border border-apag-line-strong text-apag-ink transition-[transform,background-color,border-color,color] duration-300 group-hover:border-apag-ink group-data-[state=open]:rotate-45 group-data-[state=open]:border-apag-ink group-data-[state=open]:bg-apag-ink group-data-[state=open]:text-white">
          <Plus className="size-4" aria-hidden="true" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    // forceMount: a resposta fica no HTML mesmo fechada (oculta via data-state),
    // para leitores de página e buscadores verem todas as respostas.
    <AccordionPrimitive.Content
      forceMount
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-[state=closed]:hidden data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div
        className={cn('max-w-2xl pb-6 pr-12 text-[0.9375rem] leading-relaxed text-apag-slate sm:text-base', className)}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
