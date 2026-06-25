import IcAlert from '@/shared/assets/svg/ic-circle-alert.svg';
import IcX from '@/shared/assets/svg/ic-x.svg';

interface CancelConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function CancelConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: CancelConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-[24px]'>
      <div className='w-full max-w-[320px] rounded-[24px] bg-white px-[26px] py-[24px]'>
        <div className='mb-[13px] flex items-center justify-between'>
          <div className='flex items-center gap-[7px]'>
            <img
              src={IcAlert}
              alt='주의 로고'
              className='h-[20px] w-[20px]'
            />
            <h2 className='text-title3 text-[#222222]'>
              취소 유의사항
            </h2>
          </div>

          <button
            type='button'
            aria-label='닫기'
            onClick={onClose}
            className='cursor-pointer'>
            <img
              src={IcX}
              alt='닫기 로고'
              className='h-[20px] w-[20px]'
            />
          </button>
        </div>

        <div className='mb-[18px] rounded-[16px] bg-[var(--color-blue-25)] px-[20px] py-[18px] text-center'>
          <p className='text-body3 text-[var(--color-gray-500)]'>
            유의사항을 작성해주세요.
            <br />위 내용을 숙지하고 취소하시겠습니까?
          </p>
        </div>

        <div className='grid grid-cols-2 gap-[14px]'>
          <button
            type='button'
            onClick={onClose}
            className='cursor-pointer h-[54px] rounded-[14px] bg-gray-200 text-button2 text-black'>
            취소
          </button>

          <button
            type='button'
            onClick={onConfirm}
            className='cursor-pointer h-[54px] rounded-[14px] bg-[var(--color-blue-700)] text-button2 text-white'>
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default CancelConfirmModal;