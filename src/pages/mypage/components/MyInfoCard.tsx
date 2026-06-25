interface MyInfoCardProps {
  name: string;
  studentInfo: string;
}

function MyInfoCard({ name, studentInfo }: MyInfoCardProps) {
  return (
    <div className='flex items-center gap-[18px] rounded-[12px] border border-[var(--color-blue-100)] bg-white px-[20px] py-[20px]'>
      <div className='h-[65px] w-[65px] shrink-0 rounded-full bg-[#D1D2D4]' />

      <div className='flex flex-col gap-[12px]'>
        <strong className='text-label1 text-[#222222]'>{name}</strong>
        <span className='text-caption5 text-gray-600'>{studentInfo}</span>
      </div>
    </div>
  );
}

export default MyInfoCard;