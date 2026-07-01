import {useQuery} from '@tanstack/react-query';

import {getRoomSchedules} from '@/pages/home/api/roomScheduleApi';
import {toLocalDateString} from '@/pages/home/utils/reservationTime';
import {QUERY_KEYS} from '@/shared/query/query-keys';
import {getCurrentDate} from '@/shared/utils/date';

export const useRoomSchedules = (floor: number, enabled = true) => {
  const date = toLocalDateString(getCurrentDate());

  return useQuery({
    queryKey: QUERY_KEYS.ROOM.SCHEDULES(floor, date),
    queryFn: () => getRoomSchedules(floor, date),
    enabled,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
