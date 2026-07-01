import {z} from 'zod';

import {availabilityStatusSchema} from '@/pages/home/api/availabilityApi';
import {privateInstance} from '@/shared/api/axios';
import {API_ENDPOINTS} from '@/shared/api/endpoints';
import {http} from '@/shared/api/http';

const roomScheduleSlotSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  status: availabilityStatusSchema,
  reservationId: z.number().nullable(),
});

const roomScheduleSchema = z.object({
  roomId: z.number(),
  roomName: z.string(),
  floor: z.number(),
  date: z.string(),
  slots: z.array(roomScheduleSlotSchema),
});

export type RoomScheduleSlot = z.infer<typeof roomScheduleSlotSchema>;
export type RoomSchedule = z.infer<typeof roomScheduleSchema>;

export const getRoomSchedules = async (
  floor: number,
  date: string
): Promise<RoomSchedule[]> => {
  const {data} = await http.get(
    `${API_ENDPOINTS.ROOM_SCHEDULES}?floor=${floor}&date=${date}`,
    z.array(roomScheduleSchema),
    privateInstance
  );
  return data;
};
