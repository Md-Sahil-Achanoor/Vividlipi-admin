import * as React from "react";
import { cn } from "../../utils/twmerge";

const Capsule = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("capsule md:px-3 md:py-2 text-xm md:text-sm", className)}
    {...props}
  />
));
Capsule.displayName = "Capsule";

export { Capsule };
