import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-12 w-full min-w-0 rounded-md border border-input bg-white px-4 text-base text-apag-ink transition-colors placeholder:text-apag-muted hover:border-apag-muted focus-visible:border-apag-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apag-ink/15 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-apag-red',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
