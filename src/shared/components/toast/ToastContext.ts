import {createContext, useContext} from 'react';

import type {ToastVariant} from '@/shared/components/toast/Toast';

export interface ToastState {
  variant: ToastVariant;
  message: string;
}

export interface ToastContextValue {
  showToast: (toast: ToastState) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};
