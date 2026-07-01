import {useQuery} from '@tanstack/react-query';

import {getBasementOccupancyStatus} from '@/pages/reservation/api/basementOccupancyApi';
import {QUERY_KEYS} from '@/shared/query/query-keys';

export const useBasementOccupancyStatus = (enabled = true) =>
  useQuery({
    queryKey: QUERY_KEYS.BASEMENT.OCCUPANCY_STATUS,
    queryFn: getBasementOccupancyStatus,
    enabled,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
