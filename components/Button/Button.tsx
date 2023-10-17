import { motion } from "framer-motion"
import { get } from "lodash"
import {
  forwardRef,
  useMemo,
  type ComponentProps
} from "react"

import { cn, isNonEmptyString } from "@/lib"
import {
  componentRadiiValues,
  componentSizingValues,
  componentSpacingValues,
  type ComponentRadii,
  type ComponentSize,
  type ComponentSpacing,
} from "../../lib/constants/ComponentProps"

export type ButtonColors = "primary" | "secondary" | "tertiary" | "white"
export type ButtonVariants = "flat" | "gradient" | "outline" | "transparent"

export const DEFAULT_BUTTON_COLOR: ButtonColors = "primary"
export const DEFAULT_BUTTON_VARIANT: ButtonVariants = "flat"

export type ButtonProps = Omit<ComponentProps<"button">, "ref"> & {
  /**
   * Color sets the color of the button background, border, and text.
   * @defaultValue `primary`
   */
  color?: ButtonColors

  /**
   * Variant decides the overall look and feel of the button. Is it a flat color, a gradient, etc...
   * @defaultValue `flat`
   */
  variant?: ButtonVariants

  /**
   * Radius decides how rounded the button should be. If this is undefined the radius
   * will be determined by the `size` prop.
   */
  radius?: ComponentRadii

  /**
   * Size decides how large the font size is and also determines tracking/leading.
   * @defaultValue `md`
   */
  size?: ComponentSize

  /**
   * Spacing decides how much vertical and horizontal padding the button has.
   * @defaultValue `md`
   */
  spacing?: ComponentSpacing

  /**
   * Whether or not to uppercase all of the button text.
   * @default false
   */
  uppercase?: boolean

  /**
   * Whether or not the button takes up the full width of its container
   */
  fullWidth?: boolean
}

const colorVariantsMap: Record<ButtonVariants, Record<ButtonColors, string>> = {
  flat: {
    primary: "text-[#131314]",
    secondary: "text-black bg-white border shadow-sm",
    tertiary: "text-primary-text bg-outline-button shadow-light-border-inset",
    white: "text-black bg-white",
  },
  gradient: {
    primary:
      "text-white font-bold bg-brand-primary shadow-light-border-inset",

    secondary:
      "text-black bg-gradient-to-b from-[#70F570] to-[#49C628] shadow-inset-green",
    tertiary:
      "text-primary-text bg-gradient-to-b from-outline-button to-transparent shadow-light-border hover:text-white",
    white: "text-black bg-white",
  },
  outline: {
    primary:
      "text-[#7E43FA] shadow-inset-purple hover:bg-[#7E43FA] hover:text-white",
    secondary: "text-secondary-highlight shadow-inset-green",
    tertiary: "text-primary-text shadow-light-border-inset",
    white: "text-white shadow-inset-white",
  },
  transparent: {
    primary: "text-[#5379FF]",
    secondary: "text-[#9FFFBA]",
    tertiary: "text-white",
    white: "text-white",
  },
} as const

const sizesToRadii: Record<ComponentSize, string> = {
  xs: componentRadiiValues.lg,
  sm: componentRadiiValues.md,
  md: componentRadiiValues.md,
  lg: componentRadiiValues.lg,
} as const

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    color = DEFAULT_BUTTON_COLOR,
    variant = DEFAULT_BUTTON_VARIANT,
    size = "md",
    spacing = "md",
    uppercase = false,
    fullWidth = false,
    type = "button",
    radius,
    disabled,
    children,
    className,
    ...rest
  },
  ref
) {
  const classes = useMemo(() => {
    const sizeClasses = get(componentSizingValues, size)
    const spacingClasses = get(componentSpacingValues, spacing)

    const colors = get(colorVariantsMap, variant, colorVariantsMap.flat)
    const themeClasses = get(colors, color)

    // If you don't specify how rounded you want the corners we map it to the sizing
    const roundedClasses = isNonEmptyString(radius)
      ? get(componentRadiiValues, radius)
      : get(sizesToRadii, size)

    return cn(
      "font-semibold group relative overflow-clip",
      sizeClasses,
      themeClasses,
      spacingClasses,
      roundedClasses,
      {
        uppercase: uppercase,
        "opacity-50 cursor-not-allowed": disabled,
        "inline-block": !fullWidth,
        "w-full block": fullWidth,
      },
      className
    )
  }, [
    className,
    size,
    variant,
    color,
    spacing,
    radius,
    uppercase,
    disabled,
    fullWidth,
  ])

  return (
    <button
      className={classes}
      type={type}
      {...rest}
      disabled={disabled}
      ref={ref}
    >
      <motion.div
        layout
        layoutRoot
        className="relative z-10 w-full h-full flex items-center justify-center gap-1"
      >
        {children}
      </motion.div>
      <div className="w-full absolute left-0 top-0 z-0 h-full" />
    </button>
  )
})
