import {z} from 'zod';

export const gradeSchema = z.enum([
  'FRESHMAN',
  'SOPHOMORE',
  'JUNIOR',
  'SENIOR',
]);

export const userInfoSchema = z.object({
  id: z.number().int().positive(),
  studentNumber: z.string().regex(/^\d{9}$/),
  name: z.string().min(1),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  grade: gradeSchema,
  practiceCourse: z.enum([
    'PRACTICE_1',
    'PRACTICE_2',
    'PRACTICE_3',
    'PRACTICE_4',
    'PRACTICE_5',
    'PRACTICE_6',
    'PRACTICE_7',
    'PRACTICE_8',
  ]),
  status: z.enum(['ACTIVE', 'LEAVE', 'GRADUATED']),
});

export type Grade = z.infer<typeof gradeSchema>;
export type UserInfo = z.infer<typeof userInfoSchema>;
