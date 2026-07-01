import {useMutation, useQueryClient} from '@tanstack/react-query';

import {cancelReservation} from '../api/reservationApi';
import {QUERY_KEYS} from '@/shared/query/query-keys';

export const useCancelReservation = (date: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelReservation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.RESERVATION.MY_LIST(date),
      });
    },
  });
};
