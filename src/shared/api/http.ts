import type {AxiosInstance} from 'axios';
import {publicInstance} from '@/shared/api/axios';
import type z from 'zod';
import {createApiSuccessSchema} from '@/shared/api/response-schema';

export const http = {
  get: async <T>(
    url: string,
    dataSchema: z.ZodType<T>,
    instance: AxiosInstance = publicInstance
  ): Promise<T> => {
    const response = await instance.get(url);
    const result = createApiSuccessSchema(dataSchema).parse(response.data);
    return result.data as T;
  },

  post: async <T>(
    url: string,
    body: unknown,
    dataSchema: z.ZodType<T>,
    instance: AxiosInstance = publicInstance
  ): Promise<T> => {
    const response = await instance.post(url, body);
    const result = createApiSuccessSchema(dataSchema).parse(response.data);
    return result.data as T;
  },
};
