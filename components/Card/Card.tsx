import classNames from 'classnames';
import React from 'react';

import CardActions, {
  type CardActionsProps as ActionProps,
} from './CardActions';
import CardBody, { type CardBodyProps as BodyProps } from './CardBody';
import CardImage, { type CardImageProps as ImageProps } from './CardImage';
import CardSubtitle, {
  type CardSubtitleProps as SubtitleProps,
} from './CardSubtitle';
import CardTitle, { type CardTitleProps as TitleProps } from './CardTitle';

export type CardActionsProps = ActionProps;
export type CardBodyProps = BodyProps;
export type CardTitleProps = TitleProps;
export type CardSubtitleProps = SubtitleProps;
export type CardImageProps = ImageProps;

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg';

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
  // responsive props
  normal?: ComponentSize | boolean;
  compact?: ComponentSize | boolean;
  side?: ComponentSize | boolean;
};

const DYNAMIC_MODIFIERS = {
  compact: {
    true: 'card-compact',
    xs: 'xs:card-compact',
    sm: 'sm:card-compact',
    md: 'md:card-compact',
    lg: 'lg:card-compact',
  },
  normal: {
    true: 'card-normal',
    xs: 'xs:card-normal',
    sm: 'sm:card-normal',
    md: 'md:card-normal',
    lg: 'lg:card-normal',
  },
  side: {
    true: 'card-side',
    xs: 'xs:card-side',
    sm: 'sm:card-side',
    md: 'md:card-side',
    lg: 'lg:card-side',
  },
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { children, className, normal, compact, side, ...props },
    ref,
  ): JSX.Element => {
    const classes = classNames(
      'card',
      'border',
      'border-primary-stroke',
      'bg-card',
      'overflow-hidden',
      className,
      {
        // @ts-expect-error
        [(compact && DYNAMIC_MODIFIERS.compact[compact.toString()]) || '']:
          compact,
        // @ts-expect-error
        [(normal && DYNAMIC_MODIFIERS.normal[normal.toString()]) || '']: normal,
        // @ts-expect-error
        [(side && DYNAMIC_MODIFIERS.side[side.toString()]) || '']: side,
      },
    );

    return (
      <div aria-label="Card" {...props} className={classes} ref={ref}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              side,
              normal,
              compact,
              ...child.props,
            });
          }

          return child;
        })}
      </div>
    );
  },
);

Card.displayName = 'Card';

export default Object.assign(Card, {
  Actions: CardActions,
  Body: CardBody,
  Title: CardTitle,
  Image: CardImage,
  Subtitle: CardSubtitle,
});
