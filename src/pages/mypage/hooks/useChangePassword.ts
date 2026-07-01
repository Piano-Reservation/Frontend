import {useMutation} from '@tanstack/react-query';

import {changePassword} from '../api/passwordApi';

export const useChangePassword = () =>
  useMutation({mutationFn: changePassword});
