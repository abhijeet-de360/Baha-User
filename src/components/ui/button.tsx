import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-brand-purple text-white shadow-xs hover:bg-brand-purple-dark hover:shadow-soft",
        destructive:
          "bg-brand-coral text-white shadow-xs hover:bg-brand-coral-dark",
        outline:
          "border border-[#E2DDD5] bg-white text-text-main shadow-xs hover:bg-background hover:text-brand-purple hover:border-brand-purple/40",
        secondary:
          "bg-brand-purple-light text-brand-purple shadow-xs hover:bg-brand-purple hover:text-white",
        ghost: "text-text-main hover:bg-brand-purple-light hover:text-brand-purple",
        link: "text-brand-purple underline-offset-4 hover:underline",
        yellow: "bg-brand-yellow text-text-main shadow-xs hover:bg-brand-yellow-dark hover:shadow-glow-yellow font-bold",
        subtle: "bg-[#F3EFE8] text-text-main hover:bg-brand-purple hover:text-white transition-colors",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-2xl px-6 text-base",
        xl: "h-14 rounded-2xl px-8 text-base sm:text-lg",
        icon: "size-10 rounded-xl",
        iconSm: "size-8 rounded-lg",
        pill: "h-9 px-4 rounded-full text-xs sm:text-sm font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
