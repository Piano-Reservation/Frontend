interface HomeNoticeItemProps {
  index: number;
  text: string;
}

const HomeNoticeItem = ({index, text}: HomeNoticeItemProps) => (
  <div className='bg-bg-surface border-border-default flex items-start gap-3 rounded-lg border p-3'>
    <span className='text-action-primary text-label3 w-3.5 shrink-0 text-center tracking-[0.31px]'>
      {index}
    </span>
    <p className='text-body3 text-text-body tracking-[0.36px]'>{text}</p>
  </div>
);

export default HomeNoticeItem;
