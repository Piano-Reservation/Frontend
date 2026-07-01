import {useMutation, useQueryClient} from '@tanstack/react-query';

import {postBasementOccupancy} from '@/pages/reservation/api/basementOccupancyApi';
import type {BasementOccupancy} from '@/pages/reservation/api/types/basementOccupancy';
import {QUERY_KEYS} from '@/shared/query/query-keys';

export const useCreateBasementOccupancy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postBasementOccupancy,
    onSuccess: async (newOccupancy) => {
      queryClient.setQueryData<BasementOccupancy[]>(
        QUERY_KEYS.BASEMENT.MY_OCCUPANCIES,
        (occupancies = []) => [
          ...occupancies.filter(
            (occupancy) => occupancy.occupancyId !== newOccupancy.occupancyId
          ),
          newOccupancy,
        ]
      );

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
