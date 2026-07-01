import {useQuery} from '@tanstack/react-query';

import {getMyReservations} from '../api/reservationApi';
import {QUERY_KEYS} from '@/shared/query/query-keys';

export const useTodayReservations = (date: string) =>
  useQuery({
    queryKey: QUERY_KEYS.RESERVATION.MY_LIST(date),
    queryFn: () => getMyReservations(date),
  });
