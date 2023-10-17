import { AnimatePresence, motion } from "framer-motion"
import { get } from "lodash"

import Loading from "../Loading"
import Button, {
  DEFAULT_BUTTON_COLOR,
  DEFAULT_BUTTON_VARIANT,
  type ButtonColors,
  type ButtonProps,
  type ButtonVariants,
} from "./Button"

export type LoadingButtonProps = ButtonProps & {
  loading?: boolean
}

const colorVariantsMap: Record<ButtonVariants, Record<ButtonColors, string>> = {
  flat: {
    primary: "#fff",
    secondary: "#000",
    tertiary: "#fff",
    white: "#000",
  },
  gradient: {
    primary: "#fff",
    secondary: "#000",
    tertiary: "#fff",
    white: "#000",
  },
  outline: {
    primary: "#5379FF",
    secondary: "#41B569",
    tertiary: "#fff",
    white: "#fff",
  },
  transparent: {
    primary: "#5379FF",
    secondary: "#41B569",
    tertiary: "#fff",
    white: "#fff",
  },
}

export default function LoadingButton({
  loading = false,
  disabled = false,
  color = DEFAULT_BUTTON_COLOR,
  variant = DEFAULT_BUTTON_VARIANT,
  onClick,
  children,
  ...props
}: LoadingButtonProps) {
  const loaderColor = get(
    colorVariantsMap,
    `${variant}.${color}`,
    colorVariantsMap.flat.primary
  )

  return (
    <Button
      disabled={disabled || loading}
      onClick={loading ? undefined : onClick}
      color={color}
      variant={variant}
      {...props}
    >
      <AnimatePresence mode="popLayout">
        {loading && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="flex items-center"
          >
            <Loading size={12} color={loaderColor} />
          </motion.span>
        )}
      </AnimatePresence>
      <motion.span layout>{children}</motion.span>
    </Button>
  )
}
