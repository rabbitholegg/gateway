import classNames from 'classnames';
import React from 'react';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  placeholder?: string;
  inputClass?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
};

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ name, placeholder, inputClass, onChange, ...props }, ref) => {
    const textAreaClasses = classNames(
      'textarea',
      'textarea-bordered',
      'bg-base-100',
      'focus:border-2',
      'mb-2',
      inputClass,
    );
    return (
      <textarea
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={textAreaClasses}
        ref={ref}
        {...props}
      />
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
