import IcLeft from '@/shared/assets/svg/ic-chevron-left.svg';

import {useState} from 'react';
import {useNavigate} from 'react-router';
import {ROUTES} from '@/shared/constants/routes';
import Input from '@/shared/components/input/Input';

const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;
const CURRENT_PASSWORD = '000000'; // ⚠️ 임시 목업임 -> api 연동 시 제거

export const PasswordChangePage = () => {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const isCurrentPasswordValid = currentPassword === CURRENT_PASSWORD;
  const isNewPasswordValid = PASSWORD_REGEX.test(newPassword);
  const isPasswordMatched =
    newPassword.length > 0 && newPassword === newPasswordConfirm;

  const isSubmitDisabled =
    !isCurrentPasswordValid ||
    !newPassword ||
    !newPasswordConfirm ||
    !isNewPasswordValid ||
    !isPasswordMatched;

  const handleSubmit = () => {
    if (isSubmitDisabled) return;

    navigate(ROUTES.MY_PAGE, {
      replace: true,
      state: {isPasswordChanged: true},
    });
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
              onChange={(event) => setCurrentPassword(event.target.value)}
              errorMessage={
                currentPassword.length > 0 && !isCurrentPasswordValid
                  ? '현재 비밀번호가 일치하지 않습니다.'
                  : undefined
              }
              fullWidth
            />

            <Input
              type='password'
              label='새 비밀번호'
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              errorMessage={
                newPassword.length > 0 && !isNewPasswordValid
                  ? '비밀번호는 8자 이상, 16자 이하여야 합니다. 영문, 숫자, 특수문자를 포함해야 합니다.'
                  : undefined
              }
              helperText='비밀번호는 8자 이상, 16자 이하여야 합니다. 영문, 숫자, 특수문자를 포함해야 합니다.'
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
              fullWidth
            />
          </div>
        </section>

        <button
          type='button'
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
          className='text-button2 h-[57px] w-full cursor-pointer rounded-[12px] bg-[var(--color-blue-700)] text-white disabled:cursor-default disabled:opacity-60'>
          변경하기
        </button>
      </main>
    </div>
  );
};
