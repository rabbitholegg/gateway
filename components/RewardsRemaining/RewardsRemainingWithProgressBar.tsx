import AnimatedNumber from "../AnimatedNumber/AnimatedNumber"
import { type ProgressTrackVariant } from "../ui/progress"
import RewardsRemainingProgressBar from "./RewardsRemainingProgressBar"
import {
  useCalculatedRewardsRemaining,
  type CalculatedRewardsRemainingOptions,
} from "./useCalculatedRewardsRemaining"

type RewardsRemainingWithProgressBarProps =
  CalculatedRewardsRemainingOptions & {
    variant?: ProgressTrackVariant["variant"]
  }

export default function RewardsRemainingWithProgressBar({
  value,
  max,
  variant,
}: RewardsRemainingWithProgressBarProps) {
  const { absoluteMax, rewardsRemaining } = useCalculatedRewardsRemaining({
    value,
    max,
  })
  const percentRemaining = (rewardsRemaining / absoluteMax) * 100

  return (
    <div className="flex flex-col gap-1 w-full text-primary-text font-semibold text-sm truncate tabular-nums">
      <AnimatedNumber value={String(rewardsRemaining)} />

      <div className="md:w-[60%] flex-1">
        <RewardsRemainingProgressBar
          value={percentRemaining}
          variant={variant}
        />
      </div>

      <div className="flex flex-1 items-center gap-1">
        <span className="text-xs text-secondary-text">of {absoluteMax}</span>
      </div>
    </div>
  )
}
