export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
HOME: '/home',
  RESERVATION: '/reservation',
  RESERVATION_DETAIL: '/reservation/:id',
  MY_PAGE: '/mypage',
  ANNOUNCEMENT: '/announcement',
} as const;

export const createPath = {
  reservationDetail: (id: string | number) =>
    ROUTES.RESERVATION_DETAIL.replace(':id', String(id)),
} as const;
