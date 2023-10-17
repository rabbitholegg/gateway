import { cn } from "@/lib"

const ReferralsIconSVGMask = ({ id }: { id?: string }) => (
  <svg width="0" height="0">
    <clipPath id={`referrals-mask-path-${id}`}>
      <path d="M12.723 7.41 8.527 9.51V10.536l4.196 2.098c.76-.714 1.83-1.205 2.991-1.205a4.287 4.287 0 0 1 0 8.571 4.258 4.258 0 0 1-4.285-4.286v-.49l-4.197-2.099a4.35 4.35 0 0 1-2.946 1.16A4.258 4.258 0 0 1 0 10a4.258 4.258 0 0 1 4.286-4.286c1.116 0 2.187.491 2.946 1.206L11.43 4.82v-.535A4.258 4.258 0 0 1 15.714 0a4.287 4.287 0 0 1 0 8.571 4.379 4.379 0 0 1-2.99-1.16Z" />
    </clipPath>
  </svg>
)

const ReferralsIcon = ({
  className,
  id,
}: {
  className?: string
  id?: string
}) => {
  return (
    <div className="flex items-center justify-center h-6 w-6">
      <ReferralsIconSVGMask id={id} />
      <div
        className={cn("w-full h-full stroke-white", className)}
        style={{ clipPath: `url(#referrals-mask-path-${id})` }}
      />
    </div>
  )
}

export default ReferralsIcon
