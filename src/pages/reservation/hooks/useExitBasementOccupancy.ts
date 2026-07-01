import {useMutation, useQueryClient} from '@tanstack/react-query';

import {patchBasementOccupancyExit} from '../api/basementOccupancyApi';
import {QUERY_KEYS} from '@/shared/query/query-keys';

export const useExitBasementOccupancy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchBasementOccupancyExit,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.BASEMENT.MY_OCCUPANCIES,
        }),
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.BASEMENT.OCCUPANCY_STATUS,
        }),
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.RESERVATION.MY_HISTORY,
        }),
      ]);
    },
  });
};
