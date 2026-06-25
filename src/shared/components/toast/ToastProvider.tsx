import {useCallback, useRef, useState, type ReactNode} from 'react';

import Toast from '@/shared/components/toast/Toast';
import {
  ToastContext,
  type ToastState,
} from '@/shared/components/toast/ToastContext';

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
        <div className='pointer-events-none fixed bottom-24 left-1/2 z-50 w-full max-w-107.5 -translate-x-1/2 animate-[toast-in_0.25s_ease-out] px-5'>
          <Toast variant={toast.variant} message={toast.message} />
        </div>
      )}
    </ToastContext.Provider>
  );
};
