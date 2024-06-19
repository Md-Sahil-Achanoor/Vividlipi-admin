import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/twmerge'

export const ButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary  disabled:pointer-events-none disabled:opacity-70 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-primary bg-transparent hover:bg-primary text-primary dark:hover:text-primary-foreground hover:text-white',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        logo: 'bg-primary text-white dark:bg-background',
        customSolid:
          'bg-primary text-white shadow transition-colors duration-300 hover:bg-black hover:text-white dark:bg-[#854AF2] dark:text-primary dark:hover:bg-primary dark:hover:text-black',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8  px-3',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9 ',
        logo: 'h-[1.9rem] w-[1.9rem] rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  href?: string
  replace?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant, className, children, href, replace = false, size, ...props },
    ref,
  ) => {
    if (href) {
      return (
        <Link
          to={href}
          replace={replace}
          className={cn(ButtonVariants({ variant, className, size }))}
        >
          {children}
        </Link>
      )
    }
    return (
      <button
        ref={ref}
        className={cn(ButtonVariants({ variant, className, size }))}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { Button }
