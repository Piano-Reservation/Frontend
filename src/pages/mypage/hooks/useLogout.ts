import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {useNavigate} from 'react-router';

import {logout} from '../api/authApi';
import {useToast} from '@/shared/components';
import {ROUTES} from '@/shared/constants/routes';

export const useLogout = () => {
  const navigate = useNavigate();
  const {showToast} = useToast();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      navigate(ROUTES.LOGIN, {replace: true});
    },
    onError: (error) => {
      let message = '로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요.';

      if (axios.isAxiosError(error)) {
        const responseMessage = error.response?.data?.message;
        if (typeof responseMessage === 'string') {
          message = responseMessage;
        }
      }

      showToast({variant: 'error', message});
    },
  });
};
