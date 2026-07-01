import {useQuery} from '@tanstack/react-query';
import {Navigate, Outlet, useLocation} from 'react-router';

import {getMyInfo} from '@/pages/mypage/api/userApi';
import {ROUTES} from '@/shared/constants/routes';
import {QUERY_KEYS} from '@/shared/query/query-keys';

const AuthGuard = () => {
  const location = useLocation();
  const {isPending, isFetching, isError} = useQuery({
    queryKey: QUERY_KEYS.USER.ME,
    queryFn: getMyInfo,
    retry: false,
    staleTime: 0,
  });

  if (isPending || isFetching) {
    return (
      <div className='flex min-h-dvh items-center justify-center'>
        Loading...
      </div>
    );
  }

  if (isError) {
    return <Navigate to={ROUTES.LOGIN} replace state={{from: location}} />;
  }

  return <Outlet />;
};

export default AuthGuard;
