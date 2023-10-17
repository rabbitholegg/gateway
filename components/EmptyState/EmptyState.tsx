import Image from "next/image"
import { type PropsWithChildren } from "react"

import { isNonEmptyString } from "@/lib"
import Flex from "../Flex"

export type EmptyStateProps = PropsWithChildren & {
  title: string
  body: string
  image?: "search" | "cube" | "sphere" | null
}

export default function EmptyState({
  title,
  body,
  image,
  children,
}: EmptyStateProps) {
  return (
    <Flex direction="column" align="center" justify="center" className="gap-4">
      {isNonEmptyString(image) && (
        <div className="max-w-[100px] w-full aspect-square relative">
          <Image
            src={`/empty-state-${image}.png`}
            alt="A strange and mystical shape."
            fill
          />
        </div>
      )}
      <div className="text-center">
        <p className="font-semibold text-primary-text text-lg mb-1">{title}</p>
        <p className="text-secondary-text">{body}</p>
      </div>
      {children}
    </Flex>
  )
}
