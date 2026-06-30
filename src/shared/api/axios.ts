import axios from 'axios';

import {apiErrorSchema} from '@/shared/api/response-schema';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const publicInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const privateInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

privateInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

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
