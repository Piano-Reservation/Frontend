const pad = (n: number) => String(n).padStart(2, '0');

const toTimeString = (hour: number) => `${pad(hour)}:00:00`;

export const toLocalDateString = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const hoursToReservationTime = (hours: number[]) => {
  const sorted = [...hours].sort((a, b) => a - b);
  return {
    date: toLocalDateString(new Date()),
    startTime: toTimeString(sorted[0]),
    endTime: toTimeString(sorted[sorted.length - 1] + 1),
  };
};
