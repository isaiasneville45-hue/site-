import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col gap-10', className)} {...props} />
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn('flex items-end gap-6 border-b border-apag-line sm:gap-8', className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        '-mb-px inline-flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 border-transparent pb-3.5 pt-1 text-[0.9375rem] font-medium text-apag-slate transition-colors duration-200 hover:text-apag-ink disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-apag-red data-[state=active]:text-apag-ink [&_svg]:size-[1.125rem] [&_svg]:shrink-0',
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('focus-visible:outline-offset-4', className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
