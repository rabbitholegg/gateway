import { useMemo } from "react"
import { P, match } from "ts-pattern"

import { Progress, type ProgressTrackVariant } from "../ui/progress"

type RewardsRemainingProps = {
  value: number
  variant?: ProgressTrackVariant["variant"]
}

export default function RewardsRemainingProgressBar({
  value,
  variant,
}: RewardsRemainingProps) {
  const progressVariant = useMemo(
    () =>
      match(value)
        .with(P.number.gte(20), () => "default" as const)
        .with(P.number.gte(10), () => "warning" as const)
        .otherwise(() => "danger" as const),
    [value]
  )

  return (
    <Progress value={value} size="sm" variant={variant || progressVariant} />
  )
}
