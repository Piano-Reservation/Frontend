import type {BasementOccupancy} from '../api/types/basementOccupancy';
import type {
  ApiReservationStatus,
  MyReservation,
} from '../api/types/reservation';
import type {Reservation} from '../components/TodayReservationCard';
import type {
  History,
  HistoryItem,
  HistoryStatus,
} from '../components/HistoryTimeline';
import {formatHistoryDate} from './reservationFormatters';

const STATUS_MAP: Record<ApiReservationStatus, Reservation['status']> = {
  RESERVED: 'cancelable',
  CHECKED_IN: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'noShow',
};

const HISTORY_STATUS_MAP: Record<ApiReservationStatus, HistoryStatus> = {
  RESERVED: 'reserved',
  CHECKED_IN: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'canceled',
  NO_SHOW: 'noShow',
};

interface HistoryEntry {
  date: string;
  sortTime: string;
  item: HistoryItem;
}

interface OccupancyItem {
  occupancyId: number;
  room: string;
  time: string;
  status: 'completed' | 'active' | 'exitable';
}

const toReservationTimeText = (
  reservation: Pick<MyReservation, 'startTime' | 'endTime'>
) => `${reservation.startTime.slice(0, 5)}-${reservation.endTime.slice(0, 5)}`;

const getOccupancyTime = (occupancy: BasementOccupancy) => {
  const startTime = occupancy.enteredAt.slice(11, 16);
  const endTime = occupancy.exitedAt?.slice(11, 16) ?? '\uC774\uC6A9 \uC911';

  return `${startTime}-${endTime}`;
};

const toOccupancyItem = <TStatus extends OccupancyItem['status']>(
  occupancy: BasementOccupancy,
  status: TStatus
): Omit<OccupancyItem, 'status'> & {status: TStatus} => ({
  occupancyId: occupancy.occupancyId,
  room: `${occupancy.roomCode}\uD638`,
  time: getOccupancyTime(occupancy),
  status,
});

const groupHistoryEntries = (entries: HistoryEntry[]): History[] => {
  const groupedEntries = new Map<string, HistoryEntry[]>();

  entries.forEach((entry) => {
    const dateEntries = groupedEntries.get(entry.date) ?? [];
    dateEntries.push(entry);
    groupedEntries.set(entry.date, dateEntries);
  });

  return [...groupedEntries.entries()]
    .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
    .map(([date, dateEntries]) => ({
      id: date,
      date: formatHistoryDate(date),
      items: dateEntries
        .sort((entryA, entryB) =>
          entryB.sortTime.localeCompare(entryA.sortTime)
        )
        .map((entry) => entry.item),
    }));
};

export const mapTodayReservations = (
  reservations: MyReservation[],
  occupancies: BasementOccupancy[],
  date: string
): Reservation[] => {
  const reservationItems: Reservation[] = reservations.map((reservation) => ({
    id: reservation.reservationId,
    type: 'reservation',
    room: `${reservation.roomCode}\uD638`,
    time: toReservationTimeText(reservation),
    status: STATUS_MAP[reservation.status],
  }));
  const basementItems: Reservation[] = occupancies
    .filter((occupancy) => occupancy.enteredAt.slice(0, 10) === date)
    .map((occupancy) => ({
      id: -occupancy.occupancyId,
      type: 'basementOccupancy',
      ...toOccupancyItem(
        occupancy,
        occupancy.status === 'EXITED' ? 'completed' : 'exitable'
      ),
    }));

  return [...reservationItems, ...basementItems].sort(
    (reservationA, reservationB) =>
      reservationA.time.localeCompare(reservationB.time)
  );
};

export const mapHistoryRecords = (
  reservations: MyReservation[],
  occupancies: BasementOccupancy[],
  today: string
): History[] => {
  const reservationEntries: HistoryEntry[] = reservations.map(
    (reservation) => ({
      date: reservation.date,
      sortTime: reservation.startTime,
      item: {
        id: `reservation-${reservation.reservationId}`,
        room: `${reservation.roomCode}\uD638`,
        time: toReservationTimeText(reservation),
        status: HISTORY_STATUS_MAP[reservation.status],
      },
    })
  );
  const basementEntries: HistoryEntry[] = occupancies
    .filter((occupancy) => occupancy.enteredAt.slice(0, 10) < today)
    .map((occupancy) => ({
      date: occupancy.enteredAt.slice(0, 10),
      sortTime: occupancy.enteredAt.slice(11),
      item: {
        id: `basement-${occupancy.occupancyId}`,
        ...toOccupancyItem(
          occupancy,
          occupancy.status === 'EXITED' ? 'completed' : 'active'
        ),
      },
    }));

  return groupHistoryEntries([...reservationEntries, ...basementEntries]);
};
