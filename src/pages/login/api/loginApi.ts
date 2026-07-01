import {z} from 'zod';

import {API_ENDPOINTS} from '@/shared/api/endpoints';
import {http} from '@/shared/api/http';

interface LoginRequest {
  studentNumber: string;
  password: string;
}

export const postLogin = async (body: LoginRequest): Promise<string> => {
  const {message} = await http.post(API_ENDPOINTS.AUTH, body, z.null());
  return message;
};
