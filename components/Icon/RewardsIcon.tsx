import classNames from "classnames";
import { twMerge } from "tailwind-merge";

const RewardsIconSVGMask = ({
  id
}: {
  id?: string;
}) => (
  <svg width="0" height="0">
    <defs>
      <clipPath id={`reward-mask-path-${id}`}>
        <path
          d="M16.2695 11.5028C18.8922 11.5028 21.0209 9.3742 21.0209 6.75142C21.0209 4.12864 18.8922 2 16.2695 2C13.6467 2 11.518 4.12864 11.518 6.75142C11.518 9.3742 13.6467 11.5028 16.2695 11.5028ZM21.4485 16.8244C21.0779 16.4443 20.6122 16.2543 20.0706 16.2543H13.4186L11.442 15.5606L11.7556 14.6673L13.4186 15.304H16.0794C16.412 15.304 16.6781 15.1709 16.8966 14.9524C17.1152 14.7338 17.2197 14.4677 17.2197 14.1731C17.2197 13.66 16.9727 13.3084 16.4785 13.1088L9.56996 10.5526H7.7169V19.1051L14.3689 21.0057L21.9997 18.1548C22.0092 17.6512 21.8191 17.2045 21.4485 16.8244ZM5.81634 10.5526H2V21.0057H5.81634V10.5526Z"
          fill="#000000"
        />
      </clipPath>
    </defs>
  </svg>
);

const RewardsIcon = ({
  className, 
  id
}: {
  className?: string;
  id?: string;
}) => {
  return (
    <div
      className="flex items-center justify-center h-6 w-6"
    >
      <RewardsIconSVGMask id={id} />
      <div
        className={twMerge(classNames("w-full h-full", className))}
        style={{ clipPath: `url(#reward-mask-path-${id})` }}
      />
    </div>
  );
}


export default RewardsIcon;
