import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex min-h-32 w-full rounded-2xl border border-input bg-white/[0.03] px-4 py-3 text-base text-foreground shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] transition-colors placeholder:text-white/40 focus-visible:border-apag-red-65 focus-visible:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apag-red-45 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-apag-ember sm:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
