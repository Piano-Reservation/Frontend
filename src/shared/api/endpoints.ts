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
  RESTRICTION_CURRENT: '/api/me/restrictions/current',
  MY_RESERVATION: {
    LIST: '/api/me/reservations',
    HISTORY: '/api/me/reservations/history',
  },
} as const;
