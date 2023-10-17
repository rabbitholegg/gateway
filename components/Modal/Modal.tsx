import classNames from 'classnames';
import React, { forwardRef, useEffect } from 'react';

import ModalActions from './ModalActions';
import ModalBody from './ModalBody';
import ModalCloseButton from './ModalCloseButton';
import ModalHeader from './ModalHeader';

export type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  responsive?: boolean;
  onClickBackdrop?: () => void;
  onEscape?: () => void;
  className?: string;
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      open,
      responsive,
      onClickBackdrop,
      onEscape,
      className,
      ...props
    },
    ref,
  ) => {
    const rootClasses = classNames('modal', {
      'modal-open backdrop-blur': open,
      'modal-bottom sm:modal-middle': responsive,
    });

    const bodyClasses = classNames(
      'border border-white/[.08]',
      'modal-box',
      'bg-white/[.08]',
      'p-0',
      'backdrop-blur-lg',
      className,
    );

    useEffect(() => {
      if (onEscape) {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Escape' || event.key === 'Esc') {
            if (onEscape) {
              onEscape();
            }
          }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }
    }, [onEscape]);

    return (
      <div
        aria-label="Modal"
        aria-hidden={!open}
        aria-modal={open}
        className={rootClasses}
        onClick={(e) => {
          e.stopPropagation();
          if (e.target === e.currentTarget) {
            e.stopPropagation();
            if (onClickBackdrop) {
              onClickBackdrop();
            }
          }
        }}
      >
        <div {...props} className={bodyClasses} ref={ref}>
          {children}
        </div>
      </div>
    );
  },
);

Modal.displayName = 'Modal';

export default Object.assign(Modal, {
  Header: ModalHeader,
  Body: ModalBody,
  Actions: ModalActions,
  CloseButton: ModalCloseButton,
});
