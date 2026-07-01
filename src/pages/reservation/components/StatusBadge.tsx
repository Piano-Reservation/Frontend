export type ReservationStatus =
  | 'completed'
  | 'active'
  | 'cancelable'
  | 'cancelled'
  | 'noShow';

interface StatusBadgeProps {
  status: ReservationStatus;
  onClick?: () => void;
}

const statusText: Record<ReservationStatus, string> = {
  completed: '이용 완료',
  active: '연습 중',
  cancelable: '취소하기',
  cancelled: '예약 취소',
  noShow: '미입실',
};

const statusStyle: Record<ReservationStatus, string> = {
  completed: 'bg-[#e9e9e9] text-[#999999]',
  active: 'bg-[#8cc63f]/20 text-[#6a9d26]',
  cancelable: 'bg-[#E32d30]/20 text-[#ae1a1d]',
  cancelled: 'bg-[#e9e9e9] text-[#818181]',
  noShow: 'bg-[#e9e9e9] text-[#818181]',
};

function StatusBadge({status, onClick}: StatusBadgeProps) {
  const className = `text-body3 min-w-[76px] rounded-full px-3 py-1.5 text-center ${
    onClick ? 'cursor-pointer' : 'cursor-default'
  } ${statusStyle[status]}`;

  if (onClick) {
    return (
      <button type='button' onClick={onClick} className={className}>
        {statusText[status]}
      </button>
    );
  }

  return <span className={className}>{statusText[status]}</span>;
}

export default StatusBadge;
