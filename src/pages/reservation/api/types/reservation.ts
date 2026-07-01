import {z} from 'zod';

export const reservationStatusSchema = z.enum([
  'RESERVED',
  'CHECKED_IN',
  'COMPLETED',
  'CANCELLED',
  'NO_SHOW',
]);

export const myReservationSchema = z.object({
  reservationId: z.number().int().positive(),
  date: z.iso.date(),
  roomId: z.number().int().positive(),
  floor: z.number().int().nonnegative(),
  roomCode: z.string().min(1),
  roomName: z.string().min(1),
  startTime: z.iso.time(),
  endTime: z.iso.time(),
  status: reservationStatusSchema,
});

export const myReservationListSchema = z.array(myReservationSchema);

const sortSchema = z.object({
  empty: z.boolean(),
  sorted: z.boolean(),
  unsorted: z.boolean(),
});

export const reservationHistoryPageSchema = z.object({
  content: myReservationListSchema,
  empty: z.boolean(),
  first: z.boolean(),
  last: z.boolean(),
  number: z.number().int().nonnegative(),
  numberOfElements: z.number().int().nonnegative(),
  pageable: z.object({
    offset: z.number().int().nonnegative(),
    pageNumber: z.number().int().nonnegative(),
    pageSize: z.number().int().positive(),
    paged: z.boolean(),
    sort: sortSchema,
    unpaged: z.boolean(),
  }),
  size: z.number().int().positive(),
  sort: sortSchema,
  totalElements: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
});

export type MyReservation = z.infer<typeof myReservationSchema>;
export type ApiReservationStatus = z.infer<typeof reservationStatusSchema>;
export type ReservationHistoryPage = z.infer<
  typeof reservationHistoryPageSchema
>;
