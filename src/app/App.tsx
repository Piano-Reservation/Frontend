import {RouterProvider} from 'react-router/dom';
import {router} from '@/app/router/router';
import {ToastProvider} from '@/shared/components/toast/ToastProvider';

export default function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}
