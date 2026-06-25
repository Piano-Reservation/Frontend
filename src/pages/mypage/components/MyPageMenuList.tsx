import IcRight from '@/shared/assets/svg/ic-chevron-right.svg';

interface MenuItem {
  id: number;
  label: string;
}

interface MyPageMenuListProps {
  menuItems: MenuItem[];
}

function MyPageMenuList({menuItems}: MyPageMenuListProps) {
  return (
    <section className='overflow-hidden rounded-[14px] border border-[var(--color-blue-100)] bg-white'>
      {menuItems.map((item) => (
        <button
          key={item.id}
          type='button'
          className='flex h-[53px] w-full items-center justify-between border-b border-[#D8DDEB] px-[15px] text-left last:border-b-0'>
          <span className='text-label1 text-[#222222]'>{item.label}</span>
          <img src={IcRight} alt='다음 로고' className='h-[20px] w-[20px]' />
        </button>
      ))}

      <button
        type='button'
        className='flex h-[53px] w-full items-center justify-between px-[15px] text-left'>
        <span className='text-label1 text-[var(--color-red-600)]'>
          로그아웃
        </span>
        <img
          src={IcRight}
          alt='가천대학교 로고'
          className='h-[20px] w-[20px]'
        />
      </button>
    </section>
  );
}

export default MyPageMenuList;
