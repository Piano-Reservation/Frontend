import {useNavigate} from 'react-router';

import IcLeft from '@/shared/assets/svg/ic-chevron-left.svg';
import Input from '@/shared/components/input/Input';
import {usePasswordChangeForm} from './hooks/usePasswordChangeForm';

export const PasswordChangePage = () => {
  const navigate = useNavigate();
  const {
    currentPassword,
    newPassword,
    newPasswordConfirm,
    currentPasswordError,
    newPasswordError,
    newPasswordConfirmError,
    isSubmitDisabled,
    isPending,
    updateCurrentPassword,
    updateNewPassword,
    updateNewPasswordConfirm,
    submit,
  } = usePasswordChangeForm();

  return (
    <div className='mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-[var(--color-blue-25)]'>
      <main className='flex min-h-dvh w-full flex-col px-[22px] py-[20px]'>
        <header className='mb-[150px] flex items-center gap-[10px]'>
          <button
            type='button'
            aria-label='뒤로가기'
            onClick={() => navigate(-1)}>
            <img
              src={IcLeft}
              alt='이전 로고'
              className='h-[24px] w-[24px] cursor-pointer'
            />
          </button>

          <h1 className='text-title1 tracking-[-0.5px]'>비밀번호 수정</h1>
        </header>

        <section className='mb-[30px] rounded-[12px] bg-white px-[20px] py-[20px]'>
          <div className='flex flex-col gap-4.5'>
            <Input
              type='password'
              label='현재 비밀번호'
              value={currentPassword}
              onChange={(event) => updateCurrentPassword(event.target.value)}
              errorMessage={currentPasswordError ?? undefined}
              autoComplete='current-password'
              fullWidth
            />

            <Input
              type='password'
              label='새 비밀번호'
              value={newPassword}
              onChange={(event) => updateNewPassword(event.target.value)}
              errorMessage={newPasswordError}
              helperText='비밀번호는 6자 이상, 72자 이하여야 합니다.'
              autoComplete='new-password'
              fullWidth
            />

            <Input
              type='password'
              label='새 비밀번호 확인'
              value={newPasswordConfirm}
              onChange={(event) => updateNewPasswordConfirm(event.target.value)}
              errorMessage={newPasswordConfirmError}
              autoComplete='new-password'
              fullWidth
            />
          </div>
        </section>

        <button
          type='button'
          disabled={isSubmitDisabled}
          onClick={submit}
          className='text-button2 h-[57px] w-full cursor-pointer rounded-[12px] bg-[var(--color-blue-700)] text-white disabled:cursor-default disabled:opacity-60'>
          {isPending ? '변경 중...' : '변경하기'}
        </button>
      </main>
    </div>
  );
};
