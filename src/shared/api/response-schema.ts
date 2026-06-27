import {z} from 'zod';

const apiErrorMetaSchema = z.object({
  path: z.string(),
  timestamp: z.number(),
});

export const apiErrorSchema = z.object({
  success: z.literal(false),
  status: z.number(),
  code: z.string(),
  message: z.string(),
  meta: apiErrorMetaSchema,
});

export const createApiSuccessSchema = <T>(dataSchema: z.ZodType<T>) =>
  z.object({
    success: z.literal(true),
    status: z.number(),
    message: z.string(),
    data: dataSchema,
  });

export type ApiError = z.infer<typeof apiErrorSchema>;
