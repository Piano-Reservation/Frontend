import {z} from 'zod';

export const logoutDataSchema = z.string().nullable();

export type LogoutData = z.infer<typeof logoutDataSchema>;
