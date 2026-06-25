export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  HOME: '/home',
  FLOOR_DETAIL: '/home/floor/:floor',
  FLOOR_STATUS: '/home/floor/:floor/status',
  RESERVATION: '/reservation',
  RESERVATION_DETAIL: '/reservation/:id',
  MY_PAGE: '/mypage',
  PASSWORD_CHANGE: '/mypage/password',
  REPORT: '/mypage/report',
} as const;

export const createPath = {
  reservationDetail: (id: string | number) =>
    ROUTES.RESERVATION_DETAIL.replace(':id', String(id)),
  floorDetail: (floor: string | number) =>
    ROUTES.FLOOR_DETAIL.replace(':floor', String(floor)),
  floorStatus: (floor: string | number) =>
    ROUTES.FLOOR_STATUS.replace(':floor', String(floor)),
} as const;
