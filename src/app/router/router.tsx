import {createBrowserRouter, Navigate} from 'react-router';

import {ROUTES} from '@/shared/constants/routes';
import AppLayout from '@/app/layout/AppLayout';
import {HomePage} from '@/pages/home/HomePage';

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Navigate to={ROUTES.HOME} replace />,
  },
  {
    path: ROUTES.LOGIN,
    lazy: async () => {
      const {LoginPage} = await import('@/pages/login/LoginPage');
      return {Component: LoginPage};
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
        path: ROUTES.ANNOUNCEMENT,
        lazy: async () => {
          const {AnnouncementPage} =
            await import('@/pages/announcement/AnnouncementPage');
          return {Component: AnnouncementPage};
        },
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
