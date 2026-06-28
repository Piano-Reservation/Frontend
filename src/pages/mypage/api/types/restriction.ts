import {z} from 'zod';

const activeRestrictionSchema = z.object({
  restricted: z.literal(true),
  startDate: z.string(),
  endDate: z.string(),
  reason: z.string(),
  remainingDays: z.number().int().nonnegative(),
});

const inactiveRestrictionSchema = z.object({
  restricted: z.literal(false),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  reason: z.string().nullable().optional(),
  remainingDays: z.number().int().nonnegative().nullable().optional(),
});

export const currentRestrictionSchema = z.discriminatedUnion('restricted', [
  activeRestrictionSchema,
  inactiveRestrictionSchema,
]);

export type CurrentRestriction = z.infer<typeof currentRestrictionSchema>;
