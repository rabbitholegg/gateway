import classNames from "classnames"
import { get } from "lodash"
import { useMemo, type ComponentPropsWithoutRef, type ElementType } from "react"
import { twMerge } from "tailwind-merge"

import {
  componentRadiiValues,
  componentSpacingValues,
  type ComponentRadii,
  type ComponentSpacing,
} from "../../lib/constants/ComponentProps"

type GlassCardColors = "primary" | "secondary" | "solid"

export interface GlassCardProps<T extends ElementType> {
  raised?: boolean
  spacing?: ComponentSpacing
  color?: GlassCardColors
  radius?: ComponentRadii
  as?: T
}

const COLORS: Record<GlassCardColors, string> = {
  primary: "bg-white hover:bg-white/5 border border-primary-stroke",
  secondary: "bg-secondary-highlight/10 border border-secondary-highlight/50",
  solid: "bg-[#0A0A1E] shadow-light-border-inset",
}

export default function GlassCard<T extends ElementType = "div">({
  as,
  className,
  raised = false,
  color = "primary",
  spacing = "md",
  radius = "xl",
  children,
  ...rest
}: GlassCardProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof GlassCardProps<T>>) {
  const Component = as || "div"
  const classes = useMemo(() => {
    const spacingClasses = get(
      componentSpacingValues,
      spacing,
      componentSpacingValues.md
    )
    const colorClasses = get(COLORS, color, COLORS.primary)
    const radiusClasses = get(
      componentRadiiValues,
      radius,
      componentRadiiValues.xl
    )

    return twMerge(
      classNames(
        "backdrop-blur w-full block",
        colorClasses,
        spacingClasses,
        radiusClasses,
        { "shadow-glass-card": raised },
        className
      )
    )
  }, [className, color, spacing, radius, raised])

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  )
}
