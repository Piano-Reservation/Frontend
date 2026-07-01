import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router';

import IcLeft from '@/shared/assets/svg/ic-chevron-left.svg';
import Input from '@/shared/components/input/Input';
import {useToast} from '@/shared/components';
import {ROUTES} from '@/shared/constants/routes';
import {passwordChangeRequestSchema} from '@/pages/mypage/api/types/password';
import {useChangePassword} from '@/pages/mypage/hooks/useChangePassword';

const INVALID_CURRENT_PASSWORD_CODE = 2002;

export const PasswordChangePage = () => {
  const navigate = useNavigate();
  const {showToast} = useToast();
  const changePasswordMutation = useChangePassword();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState<
    string | null
  >(null);

  const passwordValidation =
    passwordChangeRequestSchema.shape.newPassword.safeParse(newPassword);
  const isNewPasswordValid = passwordValidation.success;
  const isPasswordMatched =
    newPassword.length > 0 && newPassword === newPasswordConfirm;
  const isSubmitDisabled =
    currentPassword.length === 0 ||
    !isNewPasswordValid ||
    !isPasswordMatched ||
    changePasswordMutation.isPending;

  const handleSubmit = () => {
    if (isSubmitDisabled) return;

    setCurrentPasswordError(null);
    changePasswordMutation.mutate(
      {currentPassword, newPassword},
      {
        onSuccess: (message) => {
          localStorage.removeItem('accessToken');
          showToast({
            variant: 'success',
            message:
              message || '비밀번호가 변경되었습니다. 다시 로그인해주세요.',
          });
          navigate(ROUTES.LOGIN, {replace: true});
        },
        onError: (error) => {
          let message = '비밀번호 변경에 실패했습니다.';

          if (axios.isAxiosError(error)) {
            const responseMessage = error.response?.data?.message;
            const responseCode = error.response?.data?.code;
            if (typeof responseMessage === 'string') {
              message = responseMessage;
            }

            if (responseCode === INVALID_CURRENT_PASSWORD_CODE) {
              setCurrentPasswordError(message);
              return;
            }
          }

          showToast({variant: 'error', message});
        },
      }
    );
  };

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
              onChange={(event) => {
                setCurrentPassword(event.target.value);
                setCurrentPasswordError(null);
              }}
              errorMessage={currentPasswordError ?? undefined}
              autoComplete='current-password'
              fullWidth
            />

            <Input
              type='password'
              label='새 비밀번호'
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              errorMessage={
                newPassword.length > 0 && !isNewPasswordValid
                  ? (passwordValidation.error?.issues[0]?.message ??
                    '비밀번호 형식을 확인해주세요.')
                  : undefined
              }
              helperText='비밀번호는 6자 이상, 72자 이하여야 합니다.'
              autoComplete='new-password'
              fullWidth
            />

            <Input
              type='password'
              label='새 비밀번호 확인'
              value={newPasswordConfirm}
              onChange={(event) => setNewPasswordConfirm(event.target.value)}
              errorMessage={
                newPasswordConfirm.length > 0 && !isPasswordMatched
                  ? '새 비밀번호가 일치하지 않습니다.'
                  : undefined
              }
              autoComplete='new-password'
              fullWidth
            />
          </div>
        </section>

        <button
          type='button'
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
          className='text-button2 h-[57px] w-full cursor-pointer rounded-[12px] bg-[var(--color-blue-700)] text-white disabled:cursor-default disabled:opacity-60'>
          {changePasswordMutation.isPending
            ? '변경 중...'
            : '비밀번호 변경하기'}
        </button>
      </main>
    </div>
  );
};
