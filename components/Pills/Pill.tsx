import classNames from "classnames"
import { get } from "lodash"
import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react"
import { twMerge } from "tailwind-merge"

import {
  componentSizingValues,
  componentSpacingValues,
  type ComponentSize,
  type ComponentSpacing,
} from "../../lib/constants/ComponentProps"

export interface PillProps<T extends ElementType> {
  children: ReactNode
  className?: string
  variant?: "light" | "dark" | "bright" | "transparent"
  size?: ComponentSize
  spacing?: ComponentSpacing
  borderless?: boolean
  uppercase?: boolean
  as?: T
}

/**
 * A typesafe polymorphic Pill component of varying sizes and shades.
 *
 */
export default function Pill<T extends ElementType = "div">({
  as,
  variant = "light",
  size = "md",
  spacing = "md",
  borderless = false,
  uppercase = false,
  className,
  children,
  ...rest
}: PillProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof PillProps<T>>) {
  const Component = as || "div"
  const spacingClasses = get(
    componentSpacingValues,
    spacing,
    componentSpacingValues.md
  )

  const sizingClasses = get(
    componentSizingValues,
    size,
    componentSizingValues.md
  )

  const baseClasses = twMerge(
    classNames(
      "tracking-wider font-semibold rounded-lg",
      {
        "bg-pill-light-bg shadow-light-border text-pill-light":
          variant === "light",
        "bg-pill-dark-bg border border-primary-stroke text-pill-dark":
          variant === "dark",
        "bg-transparent shadow-bright-border text-white": variant === "bright",
        "bg-transparent text-pill-dark shadow-light-border":
          variant === "transparent",
        uppercase,
        "!shadow-none !p-0": borderless,
      },
      sizingClasses,
      spacingClasses,
      className
    )
  )

  return (
    <Component className={baseClasses} {...rest}>
      {children}
    </Component>
  )
}
