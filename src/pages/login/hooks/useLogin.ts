import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {useNavigate} from 'react-router';

import {postLogin} from '@/pages/login/api/loginApi';
import {useToast} from '@/shared/components/toast/ToastContext';
import {ROUTES} from '@/shared/constants/routes';

export const useLogin = () => {
  const navigate = useNavigate();
  const {showToast} = useToast();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: () => {
      navigate(ROUTES.HOME);
    },
    onError: (error) => {
      let message = '로그인 중 오류가 발생했습니다.';

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401) {
          message = '학번 또는 비밀번호가 일치하지 않습니다.';
        } else if (status === 403) {
          message = '이용이 제한된 계정입니다.';
        }
      }

      showToast({variant: 'error', message});
    },
  });
};
