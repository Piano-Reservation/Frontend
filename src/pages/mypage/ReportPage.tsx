import {useNavigate} from 'react-router';

import IcLeft from '@/shared/assets/svg/ic-chevron-left.svg';

const CONTACT_PHONE_NUMBER = '010-XXXX-XXXX';
const OPEN_CHAT_URL = 'https://open.kakao.com/';

export const ReportPage = () => {
  const navigate = useNavigate();

  return (
    <div className='mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-[var(--color-blue-25)]'>
      <main className='min-h-dvh w-full px-[22px] py-[20px]'>
        <header className='flex items-center gap-[10px]'>
          <button
            type='button'
            aria-label='뒤로가기'
            onClick={() => navigate(-1)}
            className='cursor-pointer'>
            <img src={IcLeft} alt='' className='h-[24px] w-[24px]' />
          </button>

          <h1 className='text-title1 tracking-[-0.5px]'>신고하기</h1>
        </header>

        <section className='mt-[200px]'>
          <p className='text-body2 mb-[20px] leading-[1.5] text-black'>
            오픈채팅방으로 신고하거나 담당 조교에게 전화로 문의해주세요.
          </p>

          <div className='flex flex-col gap-[20px]'>
            <a
              href={`tel:${CONTACT_PHONE_NUMBER.replaceAll('-', '')}`}
              className='block rounded-[14px] border border-[var(--color-blue-100)] bg-white px-[15px] py-[18px]'>
              <span
                className='mb-[14px] block text-[28px] leading-none'
                aria-hidden>
                📞
              </span>
              <span className='text-body2 mb-[10px] block text-[var(--color-gray-600)]'>
                담당 조교 연락처
              </span>
              <strong className='text-label1 block text-black'>
                {CONTACT_PHONE_NUMBER}
              </strong>
            </a>

            <a
              href={OPEN_CHAT_URL}
              target='_blank'
              rel='noreferrer'
              className='block rounded-[14px] border border-[var(--color-blue-100)] bg-white px-[15px] py-[18px]'>
              <span
                className='mb-[14px] block text-[28px] leading-none'
                aria-hidden>
                💬
              </span>
              <span className='text-body2 mb-[10px] block text-[var(--color-gray-600)]'>
                오픈채팅방 링크
              </span>
              <strong className='text-label1 block overflow-hidden text-ellipsis whitespace-nowrap text-black'>
                https://open.kakao.com/................
              </strong>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};
