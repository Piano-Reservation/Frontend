import {QueryClientProvider} from '@tanstack/react-query';
import {RouterProvider} from 'react-router/dom';
import {router} from '@/app/router/router';
import {ToastProvider} from '@/shared/components/toast/ToastProvider';
import {queryClient} from '@/shared/query/queryClient';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </QueryClientProvider>
  );
}
