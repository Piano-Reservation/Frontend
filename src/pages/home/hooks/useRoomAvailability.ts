import {useQuery} from '@tanstack/react-query';

import {getRoomAvailability} from '@/pages/home/api/availabilityApi';
import {toLocalDateString} from '@/pages/home/utils/reservationTime';
import {QUERY_KEYS} from '@/shared/query/query-keys';
import {getCurrentDate} from '@/shared/utils/date';

export const useRoomAvailability = (roomId: number | null) => {
  const date = toLocalDateString(getCurrentDate());

  return useQuery({
    queryKey: QUERY_KEYS.RESERVATION.AVAILABILITY(roomId ?? 0, date),
    queryFn: () => getRoomAvailability(roomId!, date),
    enabled: roomId !== null,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
