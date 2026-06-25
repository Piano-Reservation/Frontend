import {type TimeSlot} from '@/pages/home/components/ReservationTimeline';
import {type StatusSlot} from '@/pages/home/components/ReservationStatusTimeline';

export const DAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

export const FLOORS = [3, 1, 'B1'] as const;
export type FloorValue = (typeof FLOORS)[number];

export const NOTICE_ALERT = '대리 예약 적발 시, 한 학기 연습실 정지';

export const NOTICES = [
  '당일 오전 8:50 선착순 예약입니다.',
  '3층 연습실은 한 연습실에 최대 2시간, 일일 최대 6시간까지 예약 가능합니다.',
  '1층 연습실은 1개당 최대 2시간, 일일 최대 4시간까지 예약 가능합니다. *3층과 중복하여 하루 총 10시간 예약 가능',
  '3층 연습실은 원래 레슨실입니다. 음식 및 배달음식 취식 적발 시, 경고 없이 해당 학생 연습실 정지입니다.',
  '311호는 본래 교수님 연구실로, 교수님들이 배려해 주신겁니다.\n*사용 미흡 시 경고 없이 연구실 개방 중지',
  '오후 연습실은 전공실기 별로 신청이 구분됩니다. 본인이 듣는 전공실기에 맞춰 신청하세요. 당일 오후 13:00 이후 공란이면, 학년 구분 없이 연습실 사용 가능합니다.',
  '지하 연습실은 시간 제한 없이 사용 가능한 대신 예약제가 아닙니다. 도착한 사람이 바로 이름 적고 사용하면 됩니다. 퇴실 시에는 이름을 꼭 지워주세요.\n※입실 전 예약하는 사람, 예약 안 하고 연습실 사용 적발 시, 지하 연습실 사용 정지',
  '신청한 시간으로부터 15분 뒤에 신청자가 연습실을 비워둔 경우 연습실 신청이 취소됩니다.',
  '예약 취소 시 이름을 지워주세요.',
  '대리 예약, 삭제, 시간 미엄수 등 규칙을 준수해주세요.',
] as const;

export const ROOMS_BY_FLOOR: Record<FloorValue, string[]> = {
  3: [
    '예술체육대학2-301호(전공실기 3,4)',
    '예술체육대학2-302호(전체)',
    '예술체육대학2-303호(전공실기 5,6)',
    '예술체육대학2-304호(전공실기 1,2)',
    '예술체육대학2-310호(전공실기 7,8)',
  ],
  1: [
    '예술체육대학1-101호',
    '예술체육대학1-102호',
    '예술체육대학1-103호',
    '예술체육대학1-104호',
  ],
  B1: [
    '예술체육대학B1-1호',
    '예술체육대학B1-2호',
    '예술체육대학B1-3호',
    '예술체육대학B1-4호',
    '예술체육대학B1-5호',
    '예술체육대학B1-6호',
  ],
};

export const MOCK_SLOTS: TimeSlot[] = [
  {hour: 9, status: 'available'},
  {hour: 10, status: 'available'},
  {hour: 11, status: 'available'},
  {hour: 12, status: 'available'},
  {hour: 13, status: 'available'},
  {hour: 14, status: 'available'},
  {hour: 15, status: 'available'},
  {hour: 16, status: 'available'},
  {hour: 17, status: 'booked'},
  {hour: 18, status: 'booked'},
  {hour: 19, status: 'available'},
  {hour: 20, status: 'available'},
  {hour: 21, status: 'available'},
  {hour: 22, status: 'available'},
  {hour: 23, status: 'available'},
];

export const MOCK_STATUS_SLOTS: StatusSlot[] = [
  {hour: 9, bookedBy: null},
  {hour: 10, bookedBy: '정예지'},
  {hour: 11, bookedBy: '정예지'},
  {hour: 12, bookedBy: '이지은'},
  {hour: 13, bookedBy: '이지은'},
  {hour: 14, bookedBy: '홍길동'},
  {hour: 15, bookedBy: '홍길동'},
  {hour: 16, bookedBy: '박지민'},
  {hour: 17, bookedBy: '오가연', isMine: true},
  {hour: 18, bookedBy: '오가연', isMine: true},
  {hour: 19, bookedBy: null},
  {hour: 20, bookedBy: null},
  {hour: 21, bookedBy: null},
  {hour: 22, bookedBy: null},
  {hour: 23, bookedBy: null},
];