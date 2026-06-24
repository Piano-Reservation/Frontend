import {IcSvgLogo} from '@/shared/icons';
import {cn} from '@/shared/utils/cn';

interface HeaderProps {
  userName: string;
  userGrade: number;
  studentId: string;
  className?: string;
}

const Header = ({userName, userGrade, studentId, className}: HeaderProps) => (
  <header
    className={cn('flex w-full items-center justify-between', className)}>
    <div className='flex items-center gap-[2px]'>
      <IcSvgLogo className='h-4.5 w-5.5 shrink-0' />
      <span className='text-caption5 text-text-body tracking-[-0.24px] whitespace-nowrap'>
        가천대학교 음대 연습실 신청
      </span>
    </div>
    <div className='flex items-center gap-[3px]'>
      <span className='text-label2 text-text-body tracking-[-0.28px]'>{userName}</span>
      <span className='text-caption5 text-text-muted tracking-[-0.24px] whitespace-nowrap'>
        ({userGrade}학년/{studentId})
      </span>
    </div>
  </header>
);

export default Header;
