export const QUERY_KEYS = {
  USER: {
    ME: ['user', 'me'] as const,
  },
  ROOM: {
    LIST: ['room', 'list'] as const,
  },
  RESERVATION: {
    AVAILABILITY: (date: string) =>
      ['reservation', 'availability', date] as const,
    MY_LIST: ['reservation', 'my-list'] as const,
    MY_HISTORY: ['reservation', 'my-history'] as const,
  },
  NOTIFICATION: {
    LIST: ['notification', 'list'] as const,
  },
  RESTRICTION: {
    CURRENT: ['restriction', 'current'] as const,
  },
} as const;
