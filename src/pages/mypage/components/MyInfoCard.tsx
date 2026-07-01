import IcUser from '@/shared/assets/svg/ic-user.svg';

interface MyInfoCardProps {
  name: string;
  studentInfo: string;
}

function MyInfoCard({name, studentInfo}: MyInfoCardProps) {
  return (
    <div className='flex items-center gap-[18px] rounded-[12px] border border-[var(--color-blue-100)] bg-white px-[20px] py-[20px]'>
      <div className='flex h-[65px] w-[65px] shrink-0 items-center justify-center rounded-full bg-[#E5E7EB]'>
        <img
          src={IcUser}
          alt='기본 프로필'
          className='h-[36px] w-[36px] opacity-50'
        />
      </div>

      <div className='flex flex-col gap-[12px]'>
        <strong className='text-label1 text-[#222222]'>{name}</strong>
        <span className='text-caption5 text-gray-600'>{studentInfo}</span>
      </div>
    </div>
  );
}

export default MyInfoCard;
