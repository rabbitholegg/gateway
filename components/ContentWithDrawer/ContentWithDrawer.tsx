import classNames from "classnames"
import { AnimatePresence, motion } from "framer-motion"
import { isValidElement, useMemo, type PropsWithChildren } from "react"

import { useWindowSize } from "@/lib/hooks"
import ScrollingMainContent from "../ScrollingMainContent/ScrollingMainContent"

type ContentWithDrawerProps = PropsWithChildren & {
  drawer?: JSX.Element
  drawerWidth?: number
  drawerGutter?: number
}

const DRAWER_WIDTH = 442
const DRAWER_GUTTER = 16

const TRANSITION = { bounce: 0 }

const ANIMATION_VARIANTS = {
  mobile: {
    initial: { opacity: 1, y: "50%" },
    animate: { opacity: 1, y: "0%" },
    exit: { opacity: 0, y: "50%" },
  },
  desktop: {
    initial: { opacity: 1, x: "100%" },
    animate: { opacity: 1, x: "0%" },
    exit: { opacity: 0, x: "100%" },
  },
}

export default function ContentWithDrawer({
  drawer,
  children,
  drawerWidth = DRAWER_WIDTH,
  drawerGutter = DRAWER_GUTTER,
}: ContentWithDrawerProps) {
  const hasDrawer = isValidElement(drawer)
  const { width } = useWindowSize()
  const useSmallerWidth = width <= 768
  const useMaximumWidth = width <= 1280 && width > 768

  const config = useMemo(() => {
    let paddingRight = 0
    let maxWidth: string | number = "100%"
    let opacity = 0

    if ((useSmallerWidth || useMaximumWidth) && hasDrawer) {
      paddingRight = 0
    } else if (hasDrawer) {
      paddingRight = drawerWidth + drawerGutter
    }

    if ((useSmallerWidth || useMaximumWidth) && hasDrawer) {
      opacity = 0
    } else {
      opacity = 1
    }

    if (!useSmallerWidth && !useMaximumWidth) {
      maxWidth = drawerWidth
    }

    return {
      paddingRight,
      opacity,
      maxWidth,
      variants: ANIMATION_VARIANTS[useSmallerWidth ? "mobile" : "desktop"],
    }
  }, [useSmallerWidth, hasDrawer, drawerWidth, drawerGutter, useMaximumWidth])

  const className = useMemo(
    () =>
      classNames("h-full w-full right-0 top-0 z-40 overflow-y-hidden", {
        "absolute px-4 pt-4 xl:pt-8 xl:pr-8 xl:pl-0": !useSmallerWidth,
        "fixed bg-app-bg": useSmallerWidth,
      }),
    [useSmallerWidth]
  )

  return (
    <motion.div
      animate={{ paddingRight: config.paddingRight }}
      transition={TRANSITION}
      className="w-full h-full relative overflow-hidden"
    >
      <motion.div
        animate={{ opacity: config.opacity }}
        className="w-full h-full"
      >
        <ScrollingMainContent>{children}</ScrollingMainContent>
      </motion.div>
      <AnimatePresence>
        {hasDrawer && (
          <motion.aside
            {...config.variants}
            transition={TRANSITION}
            className={className}
            style={{ maxWidth: config.maxWidth }}
          >
            {drawer}
          </motion.aside>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
