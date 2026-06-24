import {IcSvgTriangleAlert} from '@/shared/icons';

interface HomeAlertProps {
  message: string;
}

const HomeAlert = ({message}: HomeAlertProps) => (
  <div className='bg-error-bg flex items-center gap-3 rounded-lg p-3'>
    <IcSvgTriangleAlert className='text-error-text size-5 shrink-0' />
    <p className='text-body3 text-error-text min-w-0 flex-1 tracking-[0.36px]'>{message}</p>
  </div>
);

export default HomeAlert;
