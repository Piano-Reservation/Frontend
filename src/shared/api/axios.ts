import axios from 'axios';

import {apiErrorSchema} from '@/shared/api/response-schema';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const publicInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const privateInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

privateInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const parsedError = apiErrorSchema.safeParse(error.response?.data);

    if (parsedError.success) {
      return Promise.reject(parsedError.data);
    }

    return Promise.reject(error);
  }
);
