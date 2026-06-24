import {Outlet} from 'react-router';

import {BottomNavigation} from '@/shared/components';
import {ToastProvider} from '@/shared/components/toast';

const AppLayout = () => {
  return (
    <ToastProvider>
      <div className='min-h-dvh pb-18'>
        <Outlet />
        <BottomNavigation />
      </div>
    </ToastProvider>
  );
};

export default AppLayout;
