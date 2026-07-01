import {useQuery} from '@tanstack/react-query';

import {getMyInfo} from '../api/userApi';
import {QUERY_KEYS} from '@/shared/query/query-keys';

export const useMyInfo = () =>
  useQuery({
    queryKey: QUERY_KEYS.USER.ME,
    queryFn: getMyInfo,
  });
