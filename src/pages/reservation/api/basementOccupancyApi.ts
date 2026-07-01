import {privateInstance} from '@/shared/api/axios';
import {API_ENDPOINTS} from '@/shared/api/endpoints';
import {http} from '@/shared/api/http';
import {
  basementOccupancyListSchema,
  basementOccupancyStatusListSchema,
  type BasementOccupancy,
  type BasementOccupancyStatus,
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

export const getBasementOccupancyStatus = async (): Promise<
  BasementOccupancyStatus[]
> => {
  const response = await http.get<BasementOccupancyStatus[]>(
    API_ENDPOINTS.BASEMENT_OCCUPANCY_STATUS,
    basementOccupancyStatusListSchema,
    privateInstance
  );

  return response.data;
};
