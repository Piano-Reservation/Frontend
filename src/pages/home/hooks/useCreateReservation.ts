import {useMutation} from '@tanstack/react-query';

import {postReservation} from '@/pages/home/api/reservationApi';

export const useCreateReservation = () =>
  useMutation({
    mutationFn: postReservation,
  });
