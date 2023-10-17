import { cn } from "@/lib"
import ReactCountdown, { type CountdownRendererFn } from "react-countdown"

const countdownRenderer: CountdownRendererFn = ({
  days,
  hours,
  minutes,
  seconds,
}) => {
  if (days >= 1 || hours > 24) {
    return (
      <p>
        {days}d {hours}h {minutes}m
      </p>
    )
  }

  return (
    <p>
      {hours}h {minutes}m {seconds}s
    </p>
  )
}

export default function Countdown({
  questEnd,
  className,
}: {
  questEnd: string
  className?: string
}) {
  return (
    <div className={cn("truncate", className)}>
      <ReactCountdown date={questEnd} renderer={countdownRenderer} />
    </div>
  )
}
