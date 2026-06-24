import HomeAlert from '@/pages/home/components/HomeAlert';
import HomeNoticeItem from '@/pages/home/components/HomeNoticeItem';
import {NOTICE_ALERT, NOTICES} from '@/pages/home/constants/home';

const HomeNoticeSection = () => (
  <div className='flex flex-col gap-3'>
    <HomeAlert message={NOTICE_ALERT} />
    {NOTICES.map((text, i) => (
      <HomeNoticeItem key={i} index={i + 1} text={text} />
    ))}
  </div>
);

export default HomeNoticeSection;
