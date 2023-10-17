import React from 'react';

type CloseIconProps = {
  size?: number;
  color?: string;
  className?: string;
};
const CloseIcon = ({
  size = 12,
  color = '#A9AEBC',
  className,
}: CloseIconProps) => (
  <svg
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M11.273 9.977c.457.421.457 1.16 0 1.582a1.09 1.09 0 0 1-.773.316c-.316 0-.598-.105-.809-.316L6 7.867 2.273 11.56a1.09 1.09 0 0 1-.773.316c-.316 0-.598-.105-.809-.316a1.084 1.084 0 0 1 0-1.582L4.383 6.25.69 2.559a1.084 1.084 0 0 1 0-1.582 1.084 1.084 0 0 1 1.582 0L6 4.668 9.691.977a1.084 1.084 0 0 1 1.582 0c.457.421.457 1.16 0 1.582L7.582 6.285l3.691 3.692Z"
      fill={color}
    />
  </svg>
);

export default CloseIcon;
