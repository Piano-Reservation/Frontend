import IcCheck from '@/shared/assets/svg/ic-check.svg';

interface ToastProps {
  isOpen: boolean;
  message?: string;
}

function Toast({
  isOpen,
  message = '예약이 취소되었습니다.',
}: ToastProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed bottom-[92px] left-1/2 z-[70] w-[calc(100%-44px)] max-w-[386px] -translate-x-1/2'>
        <div className='flex items-center gap-[14px] rounded-[8px] border-[1.5px] border-[var(--color-blue-700)] bg-blue-100 px-[13px] py-[11px]'>
            <div className='flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-[var(--color-blue-700)]'>
                <img
                    src={IcCheck}
                    alt='체크 로고'
                    className='h-[16px] w-[16px]'
                />
            </div>

        <p className='text-body3 text-[var(--color-blue-700)]'>
          {message}
        </p>
      </div>
    </div>
  );
}

export default Toast;