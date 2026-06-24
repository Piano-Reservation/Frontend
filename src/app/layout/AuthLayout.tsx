import type {ReactNode} from 'react';

import gachonLogo from '@/shared/assets/images/gachon-logo.png';

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({children}: AuthLayoutProps) => {
  return (
    <div className='bg-bg-page relative flex min-h-dvh flex-col items-center px-6'>
      <div className='absolute top-30 text-center'>
        <h1 className='text-title1 text-text-body tracking-[0.72px] whitespace-pre-line'>
          {'가천대학교 피아노과\n연습실 어플'}
        </h1>
      </div>

      <div className='flex w-full flex-1 flex-col items-center justify-center'>
        {children}
      </div>

      <div className='absolute bottom-20'>
        <img alt='가천대학교' className='h-12.75' src={gachonLogo} />
      </div>
    </div>
  );
};

export default AuthLayout;
