import {createContext, useCallback, useContext, useRef, useState, type ReactNode} from 'react';

import Toast, {type ToastVariant} from '@/shared/components/toast/Toast';

interface ToastState {
  variant: ToastVariant;
  message: string;
}

interface ToastContextValue {
  showToast: (toast: ToastState) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({children}: {children: ReactNode}) => {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((newToast: ToastState) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(newToast);
    timerRef.current = setTimeout(() => setToast(null), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}
      {toast && (
        <div className='pointer-events-none fixed bottom-24 left-1/2 z-50 -translate-x-1/2'>
          <Toast variant={toast.variant} message={toast.message} />
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};
