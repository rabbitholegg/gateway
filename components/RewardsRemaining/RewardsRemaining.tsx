
import AnimatedNumber from "../AnimatedNumber/AnimatedNumber"
import {
  useCalculatedRewardsRemaining,
  type CalculatedRewardsRemainingOptions,
} from "./useCalculatedRewardsRemaining"

export default function RewardsRemaining({
  value,
  max,
}: CalculatedRewardsRemainingOptions) {
  const { absoluteMax, rewardsRemaining } = useCalculatedRewardsRemaining({
    value,
    max,
  })

  return (
    <div className="flex gap-[0.5] text-secondary-text font-semibold text-xs truncate tabular-nums">
      <AnimatedNumber
        value={String(rewardsRemaining)}
        className="text-primary-text"
      />
      <span>/</span>
      <span className="truncate">{absoluteMax}</span>
    </div>
  )
}
