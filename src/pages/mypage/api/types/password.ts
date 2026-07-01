import {z} from 'zod';

export const passwordChangeRequestSchema = z.object({
  currentPassword: z.string().min(1, '현재 비밀번호를 입력해주세요.'),
  newPassword: z
    .string()
    .min(6, '새 비밀번호는 최소 6자리여야 합니다.')
    .max(72, '새 비밀번호는 최대 72자리여야 합니다.'),
});

export type PasswordChangeRequest = z.infer<typeof passwordChangeRequestSchema>;
