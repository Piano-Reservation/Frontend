import {z} from 'zod';

export const basementOccupancySchema = z.object({
  occupancyId: z.number().int().positive(),
  roomId: z.number().int().positive(),
  floor: z.number().int().nonnegative(),
  roomCode: z.string().min(1),
  roomName: z.string().min(1),
  status: z.enum(['IN_USE', 'EXITED']),
  enteredAt: z.iso.datetime({local: true}),
  exitedAt: z.iso.datetime({local: true}).nullable(),
});

export const basementOccupancyListSchema = z.array(basementOccupancySchema);

export const basementOccupancyStatusSchema = z.object({
  roomId: z.number().int().positive(),
  floor: z.number().int().nonnegative(),
  roomCode: z.string().min(1),
  roomName: z.string().min(1),
  occupied: z.boolean(),
  occupantName: z.string().nullable(),
  occupancyId: z.number().int().positive().nullable(),
  enteredAt: z.iso.datetime({local: true}).nullable(),
});

export const basementOccupancyStatusListSchema = z.array(
  basementOccupancyStatusSchema
);

export type BasementOccupancy = z.infer<typeof basementOccupancySchema>;
export type BasementOccupancyStatus = z.infer<
  typeof basementOccupancyStatusSchema
>;
