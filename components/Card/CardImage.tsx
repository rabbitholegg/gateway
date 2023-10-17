import classNames from 'classnames';
import Image, { type ImageProps } from 'next/legacy/image';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { type ComponentSize } from './Card';

export type CardImageProps = ImageProps & {
  side?: ComponentSize | boolean;
  classes?: {
    root?: string;
  };
};

const CardImage = React.forwardRef<HTMLElement, CardImageProps>(
  ({ classes = {}, side, layout, objectFit, ...props }, ref) => {
    const rootClasses = twMerge(
      classNames(
        'relative',
        'w-full',
        'h-40',
        'md:h-48',
        {
          'lg:h-auto': Boolean(side),
          'lg:min-h-full': Boolean(side),
        },
        classes.root,
      ),
    );

    return (
      <figure className={rootClasses} ref={ref}>
        <Image
          layout={layout}
          objectFit={objectFit}
          height={layout ? undefined : 400}
          width={layout ? undefined : 400}
          alt="card image"
          {...props}
        />
      </figure>
    );
  },
);

CardImage.displayName = 'CardImage';

export default CardImage;
