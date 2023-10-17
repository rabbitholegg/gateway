import classNames from "classnames"

import { assert } from "@/lib"
import Flex from "../Flex"
import Pill from "../Pills/Pill"

type QuestDetailCalloutProps = {
  variant: "expired" | "ineligible" | "paused"
}

const variantTextMap: Record<QuestDetailCalloutProps["variant"], string> = {
  expired: "This quest has expired",
  ineligible: "You are not eligible for this quest",
  paused: "This quest has been paused",
}

const variantColorMap: Record<QuestDetailCalloutProps["variant"], string> = {
  expired: "text-app-red",
  ineligible: "text-app-red",
  paused: "text-app-orange",
}

const variantIconMap: Record<QuestDetailCalloutProps["variant"], string> = {
  expired: "text-lg fa-regular fa-calendar-xmark",
  ineligible: "text-lg fa-solid fa-hexagon-xmark ",
  paused: "text-lg fa-solid fa-pause",
}

export default function QuestDetailCallout({
  variant,
}: QuestDetailCalloutProps) {
  assert(
    variant in variantTextMap,
    "Invalid variant passed to QuestDetailCallout"
  )

  const color = variantColorMap[variant]
  const icon = variantIconMap[variant]

  return (
    <Pill className="w-full" variant="light" spacing="flush">
      <Flex className="p-4 gap-3" align="center">
        <div className="bg-white/10 rounded-lg flex items-center justify-center w-8 h-8">
          <i className={classNames(icon, color)} />
        </div>
        <p className={classNames("font-semibold text-sm", color)}>
          {variantTextMap[variant]}
        </p>
      </Flex>
    </Pill>
  )
}
