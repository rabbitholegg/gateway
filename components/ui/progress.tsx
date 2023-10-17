"use client"

import { cn } from "@/lib"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-progress/20",
  {
    variants: {
      size: {
        default: "h-4",
        sm: "h-1",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const progressTrackVariants = cva(
  "h-full w-full flex-1 transition-all rounded-full",
  {
    variants: {
      variant: {
        default: "bg-progress",
        muted: "bg-progress-muted",
        warning: "bg-progress-warning",
        danger: "bg-progress-danger",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type ProgressTrackVariant = VariantProps<typeof progressTrackVariants>

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> &
    VariantProps<typeof progressVariants> &
    ProgressTrackVariant
>(({ className, value, size, variant, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(progressVariants({ size }), className)}
    {...props}
  >
    {value != null && value > 0 && (
      <ProgressPrimitive.Indicator
        className={cn(progressTrackVariants({ variant }))}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    )}
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
