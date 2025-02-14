import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/lib/utils"
import {hapticFeedback} from "@telegram-apps/sdk-react";

const buttonVariants = cva(
    `
      inline-flex items-center justify-center gap-2 whitespace-nowrap
      rounded-2xl font-mono text-sm font-medium transition-colors

      [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0

      disabled:pointer-events-none disabled:opacity-50

      focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
    `,
    {
        variants: {
            variant: {
                default:
                    `
                      bg-white text-primary shadow

                      hover:bg-white/90
                    `,
                rainbow:
                    `
                      group relative animate-rainbow border-0 bg-input
                      transition-colors

                      [background-clip:padding-box,border-box,border-box]

                      [background-origin:border-box]

                      [border:calc(0.08*1rem)_solid_transparent]

                      before:absolute before:bottom-0 before:left-1/2 before:z-0
                      before:h-1/5 before:w-3/5 before:-translate-x-1/2
                      before:animate-rainbow
                      before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]
                      before:bg-[length:200%]
                      before:[filter:blur(calc(0.8*1rem))]

                      bg-[length:200%]

                      disabled:pointer-events-none disabled:opacity-50

                      focus-visible:outline-none focus-visible:ring-1
                    `,
                primary:
                    `
                      bg-primary text-primary-foreground shadow-sm

                      hover:bg-primary/80
                    `,
                secondary:
                    `
                      bg-secondary text-secondary-foreground shadow-sm

                      hover:bg-secondary/80
                    `,
                destructive:
                    `
                      bg-destructive text-destructive-foreground shadow-sm

                      hover:bg-destructive/90
                    `,
                outline:
                    `
                      border border-zinc-200/50 bg-transparent text-primary/80
                      shadow-sm

                      hover:border-zinc-300/50 hover:bg-accent
                      hover:text-accent-foreground
                    `,
                ghost: `
                  text-muted-foreground

                  hover:bg-zinc-50 hover:text-accent-foreground
                `,
                link: `
                  text-white underline-offset-4

                  hover:underline
                `,
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9 rounded-full",
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
    ({className, variant, size, asChild = false, ...props}, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({variant, size, className}))}
                onTouchStart={() => hapticFeedback.impactOccurred.isAvailable() && hapticFeedback.impactOccurred("soft")}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export {Button, buttonVariants}
