import {privateInstance} from '@/shared/api/axios';
import {API_ENDPOINTS} from '@/shared/api/endpoints';
import {http} from '@/shared/api/http';
import {userInfoSchema, type UserInfo} from './types/user';

export const getMyInfo = () =>
  http.get<UserInfo>(API_ENDPOINTS.USER.ME, userInfoSchema, privateInstance);
