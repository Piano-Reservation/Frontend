import {useEffect, useId, useRef, type ReactNode} from 'react';

import {IcSvgClose, IcSvgTriangleAlert} from '@/shared/icons';
import {cn} from '@/shared/utils/cn';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  onClose: () => void;
  className?: string;
}

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'textarea',
  'input',
  'select',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const Modal = ({
  isOpen,
  title,
  children,
  confirmText = '선택',
  cancelText = '취소',
  onConfirm,
  onCancel,
  onClose,
  className,
}: ModalProps) => {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    previousFocusRef.current = document.activeElement as HTMLElement;
    dialogRef.current?.focus();
    return () => {
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCancel = () => {
    if (onCancel) onCancel();
    else onClose();
  };

  const handleDialogKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS) ??
        []
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (
      e.shiftKey
        ? document.activeElement === first
        : document.activeElement === last
    ) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-black/50'
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={handleDialogKeyDown}
        className={cn(
          'bg-bg-surface relative flex w-[280px] flex-col gap-4 rounded-2xl p-5 outline-none',
          className
        )}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1.5'>
            <IcSvgTriangleAlert className='text-text-body size-5 shrink-0' />
            <h2 id={titleId} className='text-title3 text-text-body'>
              {title}
            </h2>
          </div>
          <button
            aria-label='모달 닫기'
            className='text-text-body size-5 shrink-0 cursor-pointer'
            type='button'
            onClick={onClose}>
            <IcSvgClose className='size-full' />
          </button>
        </div>

        <div className='bg-bg-page rounded-xl p-3'>
          <div className='text-body3 text-text-muted'>{children}</div>
        </div>

        <div className='flex gap-2.5'>
          <button
            className='text-button2 text-text-body h-10 flex-1 cursor-pointer rounded-xl bg-gray-200 transition-colors hover:bg-gray-300'
            type='button'
            onClick={handleCancel}>
            {cancelText}
          </button>
          <button
            className='text-button2 bg-action-primary hover:bg-action-primary-hover h-10 flex-1 cursor-pointer rounded-xl text-white transition-colors'
            type='button'
            onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
