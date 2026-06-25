import {createBrowserRouter, Navigate} from 'react-router';

import {ROUTES} from '@/shared/constants/routes';
import AppLayout from '@/app/layout/AppLayout';
import {HomePage} from '@/pages/home/HomePage';

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },
  {
    path: ROUTES.LOGIN,
    lazy: async () => {
      const {default: LoginPage} = await import('@/pages/login/LoginPage');
      return {Component: LoginPage};
    },
  },
  {
    path: ROUTES.PASSWORD_CHANGE,
    lazy: async () => {
      const {PasswordChangePage} =
        await import('@/pages/mypage/PasswordChangePage');
      return {Component: PasswordChangePage};
    },
  },
  {
    path: ROUTES.REPORT,
    lazy: async () => {
      const {ReportPage} = await import('@/pages/mypage/ReportPage');
      return {Component: ReportPage};
    },
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTES.RESERVATION,
        lazy: async () => {
          const {MyReservationPage} =
            await import('@/pages/reservation/MyReservationPage');
          return {Component: MyReservationPage};
        },
      },
      {
        path: ROUTES.RESERVATION_DETAIL,
        lazy: async () => {
          const {ReservationDetailPage} =
            await import('@/pages/reservation/ReservationDetailPage');
          return {Component: ReservationDetailPage};
        },
      },
      {
        path: ROUTES.MY_PAGE,
        lazy: async () => {
          const {MyPage} = await import('@/pages/mypage/MyPage');
          return {Component: MyPage};
        },
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.HOME} replace />,
  },
]);
