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
    AVAILABILITY: (roomIdOrDate: number | string, date?: string) =>
      date
        ? (['reservation', 'availability', roomIdOrDate, date] as const)
        : (['reservation', 'availability', roomIdOrDate] as const),
    MY_LIST: (date?: string) =>
      date
        ? (['reservation', 'my-list', date] as const)
        : (['reservation', 'my-list'] as const),
    MY_HISTORY: ['reservation', 'my-history'] as const,
  },
  BASEMENT: {
    MY_OCCUPANCIES: ['basement', 'my-occupancies'] as const,
    OCCUPANCY_STATUS: ['basement', 'occupancy-status'] as const,
  },
  NOTIFICATION: {
    LIST: ['notification', 'list'] as const,
  },
  RESTRICTION: {
    CURRENT: ['restriction', 'current'] as const,
  },
} as const;
