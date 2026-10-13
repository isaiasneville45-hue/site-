import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex min-h-32 w-full rounded-md border border-input bg-white px-4 py-3 text-base text-apag-ink transition-colors placeholder:text-apag-muted hover:border-apag-muted focus-visible:border-apag-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apag-ink/15 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-apag-red',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
