import {privateInstance} from '@/shared/api/axios';
import {API_ENDPOINTS} from '@/shared/api/endpoints';
import {http} from '@/shared/api/http';
import {
  basementOccupancyListSchema,
  type BasementOccupancy,
} from './types/basementOccupancy';

export const getMyBasementOccupancies = async (): Promise<
  BasementOccupancy[]
> => {
  const response = await http.get<BasementOccupancy[]>(
    API_ENDPOINTS.MY_BASEMENT_OCCUPANCIES,
    basementOccupancyListSchema,
    privateInstance
  );

  return response.data;
};
