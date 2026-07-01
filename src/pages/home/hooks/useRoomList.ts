import {useQuery} from '@tanstack/react-query';

import {getRoomList} from '@/pages/home/api/roomApi';
import {QUERY_KEYS} from '@/shared/query/query-keys';

export const useRoomList = (floor: number, enabled = true) =>
  useQuery({
    queryKey: QUERY_KEYS.ROOM.LIST(floor),
    queryFn: () => getRoomList(floor),
    enabled,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
