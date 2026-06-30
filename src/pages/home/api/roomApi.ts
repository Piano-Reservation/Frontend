import {z} from 'zod';

import {privateInstance} from '@/shared/api/axios';
import {API_ENDPOINTS} from '@/shared/api/endpoints';
import {http} from '@/shared/api/http';

const roomSchema = z.object({
  roomId: z.number(),
  floor: z.number(),
  code: z.string(),
  name: z.string(),
  majorPracticeTargets: z.array(z.number()),
});

export type Room = z.infer<typeof roomSchema>;

export const getRoomList = async (floor: number): Promise<Room[]> => {
  const {data} = await http.get(
    `${API_ENDPOINTS.ROOM_LIST}?floor=${floor}`,
    z.array(roomSchema),
    privateInstance
  );
  return data;
};
