export const DAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

export const FLOORS = [3, 1, 'B1'] as const;
export type FloorValue = (typeof FLOORS)[number];