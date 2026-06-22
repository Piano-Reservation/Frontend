import type {ButtonHTMLAttributes, ReactNode} from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'large' | 'medium' | 'small';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const baseClassName =
  'inline-flex items-center justify-center gap-2 rounded-lg border font-sans transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-50';

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    'border-transparent bg-linear-to-r from-button-primary-bg-start to-button-primary-bg-end text-button-primary-text hover:from-blue-700 hover:to-blue-800',
  secondary:
    'border-transparent bg-secondary-default text-white hover:bg-secondary',
  outline:
    'border-border-default bg-bg-surface text-action-primary hover:bg-blue-50',
  ghost: 'border-transparent bg-transparent text-action-primary hover:bg-blue-50',
  danger:
    'border-transparent bg-error-text text-white hover:bg-error-text-dark',
};

const sizeClassNames: Record<ButtonSize, string> = {
  large: 'min-h-14 px-6 text-button1',
  medium: 'min-h-12 px-5 text-button2',
  small: 'min-h-10 px-4 text-button3',
};

const mergeClassNames = (...classNames: Array<string | false | undefined>) =>
  classNames.filter(Boolean).join(' ');

const Button = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      className={mergeClassNames(
        baseClassName,
        variantClassNames[variant],
        sizeClassNames[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={isDisabled}
      type={type}
      {...props}>
      {isLoading && (
        <span
          aria-hidden='true'
          className='size-4 animate-spin rounded-full border-2 border-current border-t-transparent'
        />
      )}
      {!isLoading && leftIcon}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};

export default Button;
