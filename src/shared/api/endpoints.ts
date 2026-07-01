export const API_ENDPOINTS = {
  USER: {
    ME: '/api/users/me',
    PASSWORD: '/api/users/me/password',
  },
  TEST: '/api/test/notifications',
  RESERVATION: {
    CREATE: '/api/reservations',
    AVAILABILITY: '/api/reservations/availability',
    CANCEL: (reservationId: number) => `/api/reservations/${reservationId}`,
  },
  AUTH: '/api/auth',
  NOTIFICATION: {
    LIST: '/api/notifications',
    SUBSCRIBE: '/api/notifications/subscribe',
    READ: (notificationId: number) => `/api/notifications/${notificationId}`,
    READ_ALL: '/api/notifications/all',
  },
  ROOM_LIST: '/api/rooms',
  ROOM_SCHEDULES: '/api/room-schedules',
  RESTRICTION_CURRENT: '/api/me/restrictions/current',
  MY_RESERVATION: {
    LIST: (date: string) => `/api/me/reservations?date=${date}`,
    HISTORY: (page: number, size: number) =>
      `/api/me/reservations/history?page=${page}&size=${size}`,
  },
  BASEMENT_OCCUPANCIES: '/api/basement/occupancies',
  BASEMENT_OCCUPANCY_STATUS: '/api/basement/occupancies/status',
  MY_BASEMENT_OCCUPANCIES: '/api/me/basement/occupancies',
} as const;
