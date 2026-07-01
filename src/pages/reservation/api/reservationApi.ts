import {z} from 'zod';

import {privateInstance} from '@/shared/api/axios';
import {API_ENDPOINTS} from '@/shared/api/endpoints';
import {http} from '@/shared/api/http';
import {createApiSuccessSchema} from '@/shared/api/response-schema';
import {
  myReservationListSchema,
  reservationHistoryPageSchema,
  type MyReservation,
  type ReservationHistoryPage,
} from './types/reservation';

export const getMyReservations = async (
  date: string
): Promise<MyReservation[]> => {
  const response = await http.get<MyReservation[]>(
    API_ENDPOINTS.MY_RESERVATION.LIST(date),
    myReservationListSchema,
    privateInstance
  );

  return response.data;
};

export const getMyReservationHistory = async (
  page: number,
  size: number
): Promise<ReservationHistoryPage> => {
  const response = await http.get<ReservationHistoryPage>(
    API_ENDPOINTS.MY_RESERVATION.HISTORY(page, size),
    reservationHistoryPageSchema,
    privateInstance
  );

  return response.data;
};

const cancelReservationResponseSchema = createApiSuccessSchema(
  z.string().nullable()
);

export const cancelReservation = async (
  reservationId: number
): Promise<string> => {
  const response = await privateInstance.delete(
    API_ENDPOINTS.RESERVATION.CANCEL(reservationId)
  );
  const result = cancelReservationResponseSchema.parse(response.data);

  return result.message;
};
