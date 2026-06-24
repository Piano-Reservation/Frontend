import {useId, type InputHTMLAttributes, type ReactNode} from 'react';

import {cn} from '@/shared/utils/cn';

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
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hasError = !!errorMessage;

  return (
    <div className={cn('flex flex-col gap-2', fullWidth && 'w-full')}>
      {label && (
        <label
          className='text-body1 text-text-body tracking-[0.48px]'
          htmlFor={inputId}>
          {label}
        </label>
      )}
      <div
        className={cn(
          'bg-input-bg flex h-12 items-center gap-2 rounded-[10px] border px-3',
          hasError
            ? 'border-error-border'
            : 'border-input-border-default focus-within:border-input-border-focus focus-within:shadow-[0px_0px_3px_0px_rgba(0,0,0,0.4)]',
          fullWidth && 'w-full'
        )}>
        {leftIcon && (
          <span className='text-text-muted shrink-0'>{leftIcon}</span>
        )}
        <input
          className={cn(
            'text-caption2 text-text-body placeholder:text-input-text-placeholder min-w-0 flex-1 bg-transparent tracking-[0.54px] outline-none',
            className
          )}
          id={inputId}
          {...props}
        />
        {rightIcon && (
          <span className='text-text-muted shrink-0'>{rightIcon}</span>
        )}
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
