import {z} from 'zod';

import {API_ENDPOINTS} from '@/shared/api/endpoints';
import {http} from '@/shared/api/http';

interface LoginRequest {
  studentNumber: string;
  password: string;
}

export const postLogin = (body: LoginRequest): Promise<string> => {
  return http.post(API_ENDPOINTS.AUTH, body, z.string());
};
