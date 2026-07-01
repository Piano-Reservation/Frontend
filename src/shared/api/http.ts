import type {AxiosInstance} from 'axios';
import {publicInstance} from '@/shared/api/axios';
import type z from 'zod';
import {createApiSuccessSchema} from '@/shared/api/response-schema';

interface ApiResponse<T> {
  message: string;
  data: T;
}

export const http = {
  get: async <T>(
    url: string,
    dataSchema: z.ZodType<T>,
    instance: AxiosInstance = publicInstance
  ): Promise<ApiResponse<T>> => {
    const response = await instance.get(url);
    const result = createApiSuccessSchema(dataSchema).parse(response.data);
    return {message: result.message, data: result.data as T};
  },

  post: async <T>(
    url: string,
    body: unknown,
    dataSchema: z.ZodType<T>,
    instance: AxiosInstance = publicInstance
  ): Promise<ApiResponse<T>> => {
    const response = await instance.post(url, body);
    const result = createApiSuccessSchema(dataSchema).parse(response.data);
    return {message: result.message, data: result.data as T};
  },

  patch: async <T>(
    url: string,
    dataSchema: z.ZodType<T>,
    instance: AxiosInstance = publicInstance
  ): Promise<ApiResponse<T>> => {
    const response = await instance.patch(url);
    const result = createApiSuccessSchema(dataSchema).parse(response.data);
    return {message: result.message, data: result.data as T};
  },
};
