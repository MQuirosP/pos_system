import dotenv from 'dotenv';
import { format, toZonedTime } from 'date-fns-tz';

dotenv.config({});

const DEFAULT_TIME_ZONE = process.env.TIMEZONE || 'UTC';

export function formatDateToLocal(date: Date | string): string {
  const zonedDate = toZonedTime(date, DEFAULT_TIME_ZONE);
  return format(zonedDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: DEFAULT_TIME_ZONE });
}
