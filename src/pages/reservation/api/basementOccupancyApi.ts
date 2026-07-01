import {privateInstance} from '@/shared/api/axios';
import {API_ENDPOINTS} from '@/shared/api/endpoints';
import {http} from '@/shared/api/http';
import {
  basementOccupancySchema,
  basementOccupancyListSchema,
  basementOccupancyStatusListSchema,
  type BasementOccupancy,
  type BasementOccupancyStatus,
} from './types/basementOccupancy';

interface CreateBasementOccupancyRequest {
  roomId: number;
}

export const postBasementOccupancy = async (
  body: CreateBasementOccupancyRequest
): Promise<BasementOccupancy> => {
  const response = await http.post<BasementOccupancy>(
    API_ENDPOINTS.BASEMENT_OCCUPANCIES,
    body,
    basementOccupancySchema,
    privateInstance
  );

  return response.data;
};

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
