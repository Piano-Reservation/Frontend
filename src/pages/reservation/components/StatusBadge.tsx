export type ReservationStatus = 'completed' | 'active' | 'cancelable';

interface StatusBadgeProps {
  status: ReservationStatus;
}

const statusText: Record<ReservationStatus, string> = {
  completed: '이용 완료',
  active: '연습 중',
  cancelable: '취소하기',
};

const statusStyle: Record<ReservationStatus, string> = {
  completed: 'bg-[#e9e9e9] text-[#999999]',
  active: 'bg-[#8cc63f]/20 text-[#6a9d26]',
  cancelable: 'bg-[#E32d30]/20 text-[#ae1a1d]',
};

function StatusBadge({status}: StatusBadgeProps) {
  return (
    <span
      className={`min-w-[76px] rounded-full px-3 py-1.5 text-center text-[12px] font-medium ${statusStyle[status]}`}>
      {statusText[status]}
    </span>
  );
}

export default StatusBadge;
