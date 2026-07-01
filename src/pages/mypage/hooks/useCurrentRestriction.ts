import {useQuery} from '@tanstack/react-query';

import {getCurrentRestriction} from '../api/restrictionApi';
import {QUERY_KEYS} from '@/shared/query/query-keys';

export const useCurrentRestriction = () =>
  useQuery({
    queryKey: QUERY_KEYS.RESTRICTION.CURRENT,
    queryFn: getCurrentRestriction,
  });
