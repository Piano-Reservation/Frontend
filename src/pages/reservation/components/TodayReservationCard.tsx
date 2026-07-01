import StatusBadge, {type ReservationStatus} from './StatusBadge';

export interface Reservation {
  id: number;
  room: string;
  time: string;
  status: ReservationStatus;
}

interface TodayReservationCardProps {
  dateText: string;
  reservations: Reservation[];
  isLoading?: boolean;
  isError?: boolean;
  onCancelClick?: (reservation: Reservation) => void;
}

function TodayReservationCard({
  dateText,
  reservations,
  isLoading = false,
  isError = false,
  onCancelClick,
}: TodayReservationCardProps) {
  return (
    <div className='rounded-xl bg-[var(--color-blue-700)] px-[18px] py-5'>
      <p className='text-label2 mb-3 text-white'>{dateText}</p>

      {isLoading || isError ? (
        <div className='flex min-h-[140px] items-center justify-center rounded-xl bg-white text-center'>
          <p className='text-body2 text-[#818080]'>
            {isError
              ? '예약 정보를 불러오지 못했습니다.'
              : '예약 정보를 확인하고 있습니다.'}
          </p>
        </div>
      ) : reservations.length === 0 ? (
        <div className='flex min-h-[140px] flex-col items-center justify-center rounded-xl bg-white text-center'>
          <p className='text-body2 mb-2 text-[#818080]'>
            등록된 일정이 없습니다
          </p>
          <p className='text-body3 text-[#BABABA]'>
            홈화면에서 연습실을 예약해보세요
          </p>
        </div>
      ) : (
        <div className='flex flex-col gap-2.5'>
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className='flex min-h-[54px] items-center justify-between rounded-xl bg-white px-[17px]'>
              <div className='flex items-center gap-[18px]'>
                <strong className='text-label1'>{reservation.room}</strong>
                <span className='text-body2 text-[#515151]'>
                  {reservation.time}
                </span>
              </div>

              <StatusBadge
                status={reservation.status}
                onClick={
                  reservation.status === 'cancelable'
                    ? () => onCancelClick?.(reservation)
                    : undefined
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TodayReservationCard;
