import {useMutation} from '@tanstack/react-query';

import {postBasementOccupancy} from '@/pages/reservation/api/basementOccupancyApi';

export const useCreateBasementOccupancy = () =>
  useMutation({
    mutationFn: postBasementOccupancy,
  });
