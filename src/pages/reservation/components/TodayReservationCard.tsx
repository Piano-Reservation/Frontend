import StatusBadge, { type ReservationStatus } from "./StatusBadge";

export interface Reservation {
  id: number;
  room: string;
  time: string;
  status: ReservationStatus;
}

interface TodayReservationCardProps {
  dateText: string;
  reservations: Reservation[];
}

function TodayReservationCard({
  dateText,
  reservations,
}: TodayReservationCardProps) {
  return (
    <div className="rounded-xl bg-[var(--color-blue-700)] px-[18px] py-5">
      <p className="mb-3 text-[14px] font-bold text-white">{dateText}</p>

      {reservations.length === 0 ? (
        <div className="flex min-h-[140px] flex-col items-center justify-center rounded-xl bg-white text-center">
          <p className="mb-2 text-[14px] font-medium text-[#818080]">
            등록된 일정이 없습니다
          </p>
          <p className="text-[12px] font-medium text-[#BABABA]">
            홈화면에서 연습실을 예약해보세요
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="flex min-h-[54px] items-center justify-between rounded-xl bg-white px-[17px]"
            >
              <div className="flex items-center gap-[18px]">
                <strong className="text-[16px] font-semibold">
                  {reservation.room}
                </strong>
                <span className="text-[14px] font-medium text-[#515151]">
                  {reservation.time}
                </span>
              </div>

              <StatusBadge status={reservation.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TodayReservationCard;