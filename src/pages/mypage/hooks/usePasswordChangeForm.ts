import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router';

import {passwordChangeRequestSchema} from '../api/types/password';
import {useChangePassword} from './useChangePassword';
import {useToast} from '@/shared/components';
import {ROUTES} from '@/shared/constants/routes';

const INVALID_CURRENT_PASSWORD_CODE = 2002;

export const usePasswordChangeForm = () => {
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
  const isPasswordMatched =
    newPassword.length > 0 && newPassword === newPasswordConfirm;
  const newPasswordError =
    newPassword.length > 0 && !passwordValidation.success
      ? (passwordValidation.error.issues[0]?.message ??
        '비밀번호 형식을 확인해주세요.')
      : undefined;
  const newPasswordConfirmError =
    newPasswordConfirm.length > 0 && !isPasswordMatched
      ? '새 비밀번호가 일치하지 않습니다.'
      : undefined;
  const isSubmitDisabled =
    currentPassword.length === 0 ||
    !passwordValidation.success ||
    !isPasswordMatched ||
    changePasswordMutation.isPending;

  const updateCurrentPassword = (value: string) => {
    setCurrentPassword(value);
    setCurrentPasswordError(null);
  };

  const submit = () => {
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

  return {
    currentPassword,
    newPassword,
    newPasswordConfirm,
    currentPasswordError,
    newPasswordError,
    newPasswordConfirmError,
    isSubmitDisabled,
    isPending: changePasswordMutation.isPending,
    updateCurrentPassword,
    updateNewPassword: setNewPassword,
    updateNewPasswordConfirm: setNewPasswordConfirm,
    submit,
  };
};
