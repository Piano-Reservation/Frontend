import {z} from 'zod';

import {privateInstance} from '@/shared/api/axios';
import {API_ENDPOINTS} from '@/shared/api/endpoints';
import {http} from '@/shared/api/http';

export const availabilityStatusSchema = z.enum([
  'AVAILABLE',
  'RESERVED',
  'RESERVED_BY_ME',
]);

const availabilitySlotSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  status: availabilityStatusSchema,
  reservationId: z.number().nullable(),
});

const availabilitySchema = z.object({
  roomId: z.number(),
  roomName: z.string(),
  floor: z.number(),
  date: z.string(),
  slots: z.array(availabilitySlotSchema),
});

export type AvailabilityStatus = z.infer<typeof availabilityStatusSchema>;
export type AvailabilitySlot = z.infer<typeof availabilitySlotSchema>;
export type RoomAvailability = z.infer<typeof availabilitySchema>;

export const getRoomAvailability = async (
  roomId: number,
  date: string
): Promise<RoomAvailability> => {
  const {data} = await http.get(
    `${API_ENDPOINTS.RESERVATION.AVAILABILITY}?roomId=${roomId}&date=${date}`,
    availabilitySchema,
    privateInstance
  );
  return data;
};
