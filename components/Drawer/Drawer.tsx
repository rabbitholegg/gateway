import { motion } from "framer-motion"
import { type PropsWithChildren, type ReactNode } from "react"
import { GoX } from "react-icons/go"

import Flex from "../Flex"
import GlassCard from "../GlassCard/GlassCard"

function DrawerContainer({ children }: PropsWithChildren) {
  return (
    <GlassCard
      spacing="lg"
      className="h-full border-b-0 border-r-0 rounded-b-none overflow-y-auto"
    >
      {children}
    </GlassCard>
  )
}

type DrawerHeaderProps = PropsWithChildren & {
  onCloseClick?: () => void
  rightContent?: ReactNode
}

function DrawerHeader({
  children,
  onCloseClick,
  rightContent,
}: DrawerHeaderProps) {
  return (
    <Flex align="center" className="pb-6">
      {typeof onCloseClick === "function" && (
        <motion.button
          onClick={onCloseClick}
          style={{ background: `rgba(0, 0, 0, .1)` }}
          whileTap={{ background: `rgba(0, 0, 0, .2)`, scale: 0.9 }}
          className="shadow-light-border-inset rounded w-9 h-9 flex flex-shrink-0 items-center justify-center group"
        >
          <GoX size={18} className="text-primary-text group-hover:text-white" />
        </motion.button>
      )}
      <Flex align="center" justify="center" grow={1} className="mx-auto w-full">
        {children}
      </Flex>
      <div className="flex-0 w-11 flex items-center justify-center">
        {rightContent}
      </div>
    </Flex>
  )
}

const Drawer = {
  Container: DrawerContainer,
  Header: DrawerHeader,
}

export default Drawer
