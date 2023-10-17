import React from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder?: string;
  className?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, placeholder, className, onChange, ...props }, ref) => {
    const inputClasses = twMerge(
      'input',
      'input-bordered',
      'bg-base-100',
      'focus:border-2',
      'rounded-xl',
      'disabled:opacity-80',
      'disabled:border-white/[.1]',
      'disabled:bg-white/[.04]',
      className,
    );
    return (
      <input
        name={name}
        type="text"
        onChange={onChange}
        placeholder={placeholder}
        className={inputClasses}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
