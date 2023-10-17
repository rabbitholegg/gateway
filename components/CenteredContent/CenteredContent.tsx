import classNames from "classnames"
import { type PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"

import Flex from "../Flex"

type CenteredContentProps = PropsWithChildren & {
  centerVertically?: boolean
  className?: string
}

export default function CenteredContent({
  children,
  centerVertically = false,
  className,
}: CenteredContentProps) {
  return (
    <Flex
      align="center"
      justify="center"
      className={twMerge(
        classNames("w-full", { "h-full": centerVertically }, className)
      )}
    >
      <div className="w-full">{children}</div>
    </Flex>
  )
}
