export const DAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

export const FLOORS = [3, 1, 'B1'] as const;
export type FloorValue = (typeof FLOORS)[number];

export const ROOMS_BY_FLOOR: Record<FloorValue, string[]> = {
  3: [
    '예술체육대학1호',
    '예술체육대학2호',
    '예술체육대학3호',
    '예술체육대학4호',
    '예술체육대학5호',
    '예술체육대학6호',
  ],
  1: [
    '예술체육대학7호',
    '예술체육대학8호',
    '예술체육대학9호',
    '예술체육대학10호',
  ],
  B1: [
    '예술체육대학11호',
    '예술체육대학12호',
    '예술체육대학13호',
    '예술체육대학14호',
    '예술체육대학15호',
    '예술체육대학16호',
  ],
};