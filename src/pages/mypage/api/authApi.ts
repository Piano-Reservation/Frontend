import {privateInstance} from '@/shared/api/axios';
import {API_ENDPOINTS} from '@/shared/api/endpoints';
import {createApiSuccessSchema} from '@/shared/api/response-schema';
import {logoutDataSchema, type LogoutData} from './types/auth';

const logoutResponseSchema = createApiSuccessSchema(logoutDataSchema);

export const logout = async (): Promise<LogoutData> => {
  const response = await privateInstance.delete(API_ENDPOINTS.AUTH);
  const result = logoutResponseSchema.parse(response.data);

  return result.data;
};
