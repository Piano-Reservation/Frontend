import {useMutation} from '@tanstack/react-query';

import {changePassword} from '@/pages/mypage/api/passwordApi';

export const useChangePassword = () =>
  useMutation({mutationFn: changePassword});
