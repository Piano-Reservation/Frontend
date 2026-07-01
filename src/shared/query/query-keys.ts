export const QUERY_KEYS = {
  USER: {
    ME: ['user', 'me'] as const,
  },
  ROOM: {
    LIST: (floor: number) => ['room', 'list', floor] as const,
    SCHEDULES: (floor: number, date: string) =>
      ['room', 'schedules', floor, date] as const,
  },
  RESERVATION: {
    AVAILABILITY: (roomId: number, date: string) =>
      ['reservation', 'availability', roomId, date] as const,
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
