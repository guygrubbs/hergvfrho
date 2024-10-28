"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base styles that apply to all button variants
  "btn inline-flex items-center justify-center font-medium transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "btn-primary bg-secondary text-white hover:bg-secondary-dark",
        secondary: "btn-secondary bg-gray-100 text-gray-700 hover:bg-gray-200",
        outline: "btn-outline border-2 border-secondary text-secondary hover:bg-secondary hover:text-white",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900",
        link: "text-secondary underline-offset-4 hover:underline",
        danger: "bg-error text-white hover:bg-error-600",
      },
      size: {
        default: "px-4 py-2 text-base",
        sm: "px-3 py-1.5 text-sm",
        lg: "px-6 py-3 text-lg",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, rounded, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    // Loading spinner component
    const LoadingSpinner = () => (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    )

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, fullWidth, rounded }),
          loading && "opacity-80",
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }