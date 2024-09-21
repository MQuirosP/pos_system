import { format, toZonedTime } from "date-fns-tz";

export function convertToLocalTime(date: Date | string): string {
  if (!date) {
    date = new Date();
  }

  // Cambia la zona horaria según la deseada
  const timeZone = "America/Costa_Rica";
  const zonedDate = toZonedTime(new Date(date), timeZone);

  return format(zonedDate, "yyyy-MM-dd HH:mm:ssXXX", { timeZone });
}
