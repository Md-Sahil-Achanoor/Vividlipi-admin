import { cn } from '@/utils/twmerge'
import * as React from 'react'

const Capsule = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('capsule md:px-3 md:py-2 text-xm md:text-sm', className)}
    {...props}
  />
))
Capsule.displayName = 'Capsule'

export { Capsule }
