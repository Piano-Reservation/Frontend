import {z} from 'zod';

import {privateInstance} from '@/shared/api/axios';
import {API_ENDPOINTS} from '@/shared/api/endpoints';
import {createApiSuccessSchema} from '@/shared/api/response-schema';
import {
  passwordChangeRequestSchema,
  type PasswordChangeRequest,
} from '@/pages/mypage/api/types/password';

const passwordChangeResponseSchema = createApiSuccessSchema(
  z.string().nullable()
);

export const changePassword = async (
  body: PasswordChangeRequest
): Promise<string> => {
  const request = passwordChangeRequestSchema.parse(body);
  const response = await privateInstance.put(
    API_ENDPOINTS.USER.PASSWORD,
    request
  );
  const result = passwordChangeResponseSchema.parse(response.data);

  return result.message;
};
