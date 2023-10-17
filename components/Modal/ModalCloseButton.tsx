import React from "react"
import { IoCloseOutline } from "react-icons/io5"

import Button from "../Button/Button"
import { cn } from "@/lib"

type ModalCloseButtonProps = {
  onClick: (e: React.SyntheticEvent) => void
  className?: string
}

const ModalCloseButton = ({ onClick, className }: ModalCloseButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      color="tertiary"
      spacing="flush"
      size="lg"
      className={cn("w-9 h-9", className)}
    >
      <IoCloseOutline size={24} />
    </Button>
  )
}

export default ModalCloseButton
