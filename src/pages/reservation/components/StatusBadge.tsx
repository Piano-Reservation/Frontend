export type ReservationStatus =
  | 'completed'
  | 'active'
  | 'exitable'
  | 'cancelable'
  | 'cancelled'
  | 'noShow';

interface StatusBadgeProps {
  status: ReservationStatus;
  disabled?: boolean;
  onClick?: () => void;
}

const statusText: Record<ReservationStatus, string> = {
  completed: '\uC774\uC6A9 \uC644\uB8CC',
  active: '\uC5F0\uC2B5 \uC911',
  exitable: '\uD1F4\uC2E4\uD558\uAE30',
  cancelable: '\uCDE8\uC18C\uD558\uAE30',
  cancelled: '\uC608\uC57D \uCDE8\uC18C',
  noShow: '\uBBF8\uC785\uC2E4',
};

const statusStyle: Record<ReservationStatus, string> = {
  completed: 'bg-[#e9e9e9] text-[#999999]',
  active: 'bg-[#8cc63f]/20 text-[#6a9d26]',
  exitable: 'bg-[#8cc63f]/20 text-[#6a9d26]',
  cancelable: 'bg-[#E32d30]/20 text-[#ae1a1d]',
  cancelled: 'bg-[#e9e9e9] text-[#818181]',
  noShow: 'bg-[#e9e9e9] text-[#818181]',
};

function StatusBadge({status, disabled = false, onClick}: StatusBadgeProps) {
  const className = `text-body3 min-w-[76px] rounded-full px-3 py-1.5 text-center ${
    onClick ? 'cursor-pointer disabled:cursor-not-allowed' : 'cursor-default'
  } ${statusStyle[status]}`;

  if (onClick) {
    return (
      <button
        type='button'
        onClick={onClick}
        disabled={disabled}
        className={className}>
        {statusText[status]}
      </button>
    );
  }

  return <span className={className}>{statusText[status]}</span>;
}

export default StatusBadge;
