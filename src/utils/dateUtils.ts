import { format, parse, isValid } from 'date-fns';

export const formatTimeSlot = (date: Date): string => {
  if (!isValid(date)) return '';
  return format(date, 'h:mm a');
};

export const parseTimeString = (timeString: string): Date | null => {
  try {
    const date = parse(timeString, 'HH:mm', new Date());
    return isValid(date) ? date : null;
  } catch {
    return null;
  }
};

export const createTimeSlotDate = (baseDate: Date, hours: number, minutes: number): Date => {
  const date = new Date(baseDate);
  date.setHours(hours, minutes, 0, 0);
  return date;
};