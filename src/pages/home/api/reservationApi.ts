import {z} from 'zod';

import {privateInstance} from '@/shared/api/axios';
import {API_ENDPOINTS} from '@/shared/api/endpoints';
import {http} from '@/shared/api/http';

interface CreateReservationRequest {
  roomId: number;
  date: string;
  startTime: string;
  endTime: string;
}

const reservationStatusSchema = z.enum([
  'RESERVED',
  'CHECKED_IN',
  'COMPLETED',
  'CANCELLED',
  'NO_SHOW',
]);

const reservationSchema = z.object({
  reservationId: z.number(),
  roomId: z.number(),
  roomName: z.string(),
  floor: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  status: reservationStatusSchema,
});

export type Reservation = z.infer<typeof reservationSchema>;
export type ReservationStatus = z.infer<typeof reservationStatusSchema>;

export const postReservation = async (
  body: CreateReservationRequest
): Promise<Reservation> => {
  const {data} = await http.post(
    API_ENDPOINTS.RESERVATION.CREATE,
    body,
    reservationSchema,
    privateInstance
  );
  return data;
};
