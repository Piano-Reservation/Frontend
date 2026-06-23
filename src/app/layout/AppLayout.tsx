import {Outlet} from 'react-router';

import {BottomNavigation} from '@/shared/components';

const AppLayout = () => {
  return (
    <div className='min-h-dvh pb-[72px]'>
      <Outlet />
      <BottomNavigation />
    </div>
  );
};

export default AppLayout;
