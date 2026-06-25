import {IcSvgChevronLeft} from '@/shared/icons';
import {cn} from '@/shared/utils/cn';

interface PageTitleProps {
  title: string;
  variant?: 'default' | 'back';
  onBack?: () => void;
  className?: string;
}

const PageTitle = ({
  title,
  variant = 'default',
  onBack,
  className,
}: PageTitleProps) => (
  <div className={cn('flex items-center gap-1', className)}>
    {variant === 'back' && (
      <button type='button' onClick={onBack} aria-label='뒤로 가기'>
        <IcSvgChevronLeft className='text-text-body size-6 shrink-0' />
      </button>
    )}
    <h1 className='text-title1 text-text-body tracking-[0.72px]'>{title}</h1>
  </div>
);

export default PageTitle;
