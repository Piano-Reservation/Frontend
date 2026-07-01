import {privateInstance} from '@/shared/api/axios';
import {API_ENDPOINTS} from '@/shared/api/endpoints';
import {http} from '@/shared/api/http';
import {
  currentRestrictionSchema,
  type CurrentRestriction,
} from './types/restriction';

export const getCurrentRestriction = async (): Promise<CurrentRestriction> => {
  const response = await http.get<CurrentRestriction>(
    API_ENDPOINTS.RESTRICTION_CURRENT,
    currentRestrictionSchema,
    privateInstance
  );

  return response.data;
};
