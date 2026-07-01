export const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatDateText = (date: Date) => {
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  return `${date.getMonth() + 1}월 ${date.getDate()}일 ${weekdays[date.getDay()]}요일`;
};

export const formatHistoryDate = (date: string) => {
  const [, month, day] = date.split('-').map(Number);

  return `${month}.${day}`;
};
