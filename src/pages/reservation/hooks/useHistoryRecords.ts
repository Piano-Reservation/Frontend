import {useInfiniteQuery, useQuery} from '@tanstack/react-query';

import {getMyBasementOccupancies} from '../api/basementOccupancyApi';
import {getMyReservationHistory} from '../api/reservationApi';
import {QUERY_KEYS} from '@/shared/query/query-keys';

const HISTORY_PAGE_SIZE = 20;

export const useReservationHistory = () =>
  useInfiniteQuery({
    queryKey: QUERY_KEYS.RESERVATION.MY_HISTORY,
    queryFn: ({pageParam}) =>
      getMyReservationHistory(pageParam, HISTORY_PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.number + 1,
  });

export const useBasementOccupancyHistory = () =>
  useQuery({
    queryKey: QUERY_KEYS.BASEMENT.MY_OCCUPANCIES,
    queryFn: getMyBasementOccupancies,
  });
