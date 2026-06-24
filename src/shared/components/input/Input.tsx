import type { InputHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/utils/cn';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  errorMessage?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
};

const Input = ({
  label,
  errorMessage,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  id,
  ...props
}: InputProps) => {
  const hasError = !!errorMessage;

  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
      {label && (
        <label className='text-label2 text-text-heading' htmlFor={id}>
          {label}
        </label>
      )}
      <div
        className={cn(
          'flex h-12 items-center gap-2 rounded-[10px] border bg-input-bg px-3',
          hasError
            ? 'border-error-border'
            : 'border-input-border-default focus-within:border-input-border-focus focus-within:shadow-[0px_0px_3px_0px_rgba(0,0,0,0.4)]',
          fullWidth && 'w-full',
        )}>
        {leftIcon && <span className='shrink-0 text-text-muted'>{leftIcon}</span>}
        <input
          className={cn(
            'min-w-0 flex-1 bg-transparent text-caption2 tracking-[0.54px] text-text-body outline-none placeholder:text-input-text-placeholder',
            className,
          )}
          id={id}
          {...props}
        />
        {rightIcon && <span className='shrink-0 text-text-muted'>{rightIcon}</span>}
      </div>
      {hasError ? (
        <p className='text-body3 text-error-text'>{errorMessage}</p>
      ) : helperText ? (
        <p className='text-body3 text-text-muted'>{helperText}</p>
      ) : null}
    </div>
  );
};

export default Input;
