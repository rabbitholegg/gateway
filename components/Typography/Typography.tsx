import classNames from 'classnames';
import React, { type ReactNode } from 'react';

const variantsMapping: Record<string, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  title1: 'h5',
  title2: 'h5',
  title3: 'h6',
  title4: 'h6',
  headline: 'h6',
  body: 'p',
  label1: 'p',
  label2: 'p',
  caption: 'p',
  legal: 'p',
  span: 'span',
};

interface ITypographyProps {
  variant?: keyof typeof variantsMapping;
  className?: string;
  children: ReactNode;
}

const Typography = ({
  variant = 'body',
  children,
  className,
  ...props
}: ITypographyProps) => {
  const Component = variant ? variantsMapping[variant] : 'p';

  return (
    <Component
      className={classNames(className, {
        [`typography--variant-${variant}`]: variant,
      })}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
