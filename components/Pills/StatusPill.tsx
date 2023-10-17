import classNames from "classnames"

import { QuestStatus } from "@/lib/types"
import {
  type ComponentSize,
  type ComponentSpacing,
} from "../../lib/constants/ComponentProps"
import Flex from "../Flex"
import Pill from "./Pill"

type StatusPillProps = {
  status: string
  size?: ComponentSize
  spacing?: ComponentSpacing
  showIcon?: boolean
}

export default function StatusPill({
  status,
  size = "sm",
  spacing = "sm",
  showIcon = true,
}: StatusPillProps) {
  const isExpired = status === QuestStatus.EXPIRED

  const typographyColor = classNames(
    "uppercase truncate font-semibold text-xs",
    {
      "text-app-red": isExpired,
    }
  )

  return (
    <Pill
      as={Flex}
      align="center"
      className="gap-2 inline-flex max-w-full"
      size={size}
      spacing={spacing}
      borderless
      variant="transparent"
    >
      {showIcon && status === QuestStatus.COMPLETED && (
        <div className="flex-shrink-0">
          <i className="fa-solid fa-check fa-sm" />
        </div>
      )}

      <p className={typographyColor}>{status}</p>
    </Pill>
  )
}
