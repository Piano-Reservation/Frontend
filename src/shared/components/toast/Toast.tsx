import {IcSvgCheck, IcSvgCircleX} from '@/shared/icons';
import {cn} from '@/shared/utils/cn';

export type ToastVariant = 'success' | 'error';

interface ToastProps {
  variant: ToastVariant;
  message: string;
}

const Toast = ({variant, message}: ToastProps) => (
  <div
    className={cn(
      'flex h-11 w-full items-center gap-1.5 overflow-hidden rounded-lg border px-3.5 py-1',
      variant === 'success' && 'border-action-primary bg-blue-100',
      variant === 'error' && 'border-error-border bg-error-bg',
    )}>
    {variant === 'success' && (
      <>
        <div className='bg-action-primary flex size-5 shrink-0 items-center justify-center rounded-full'>
          <IcSvgCheck className='size-4 text-white' />
        </div>
        <span className='text-label3 whitespace-nowrap text-action-primary'>{message}</span>
      </>
    )}
    {variant === 'error' && (
      <>
        <IcSvgCircleX className='size-6 shrink-0 text-error-text' />
        <span className='text-label3 whitespace-nowrap text-error-text'>{message}</span>
      </>
    )}
  </div>
);

export default Toast;
