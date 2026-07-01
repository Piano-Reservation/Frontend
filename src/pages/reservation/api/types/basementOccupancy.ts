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

export type BasementOccupancy = z.infer<typeof basementOccupancySchema>;
