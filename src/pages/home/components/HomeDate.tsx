import { DAYS } from "../constants/home";

const HomeDate = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const dayOfWeek = DAYS[now.getDay()];

  return (
    <div className='flex items-center gap-2'>
      <span className='text-title1 text-text-body tracking-[0.72px]'>홈</span>
      <div className='bg-text-body h-[21px] w-px' />
      <span className='text-caption2 text-text-body tracking-[0.54px]'>
        {month}월 {day}일
      </span>
      <div className='bg-action-primary flex size-5 items-center justify-center rounded-full'>
        <span className='text-label3 text-white'>{dayOfWeek}</span>
      </div>
    </div>
  );
};

export default HomeDate;
