import {z} from 'zod';

const activeRestrictionSchema = z.object({
  restricted: z.literal(true),
  startDate: z.iso.date(),
  endDate: z.iso.date(),
  reason: z.string(),
  remainingDays: z.number().int().nonnegative(),
});

const inactiveRestrictionSchema = z.object({
  restricted: z.literal(false),
  startDate: z.iso.date().nullable().optional(),
  endDate: z.iso.date().nullable().optional(),
  reason: z.string().nullable().optional(),
  remainingDays: z.number().int().nonnegative().nullable().optional(),
});

export const currentRestrictionSchema = z.discriminatedUnion('restricted', [
  activeRestrictionSchema,
  inactiveRestrictionSchema,
]);

export type CurrentRestriction = z.infer<typeof currentRestrictionSchema>;
