import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import  utc from "dayjs/plugin/utc";
// import utc from 'dayjs/plugin/utc' // ES 2015
import  timezone  from "dayjs/plugin/timezone"; 
import dayjs from "dayjs";

dayjs.extend(utc);
dayjs.extend(timezone);
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function readableTime(utcTimeString: string): string {
  // Convert the UTC time string to IST
  const istTime = dayjs.utc(utcTimeString).tz('Asia/Kolkata');
  // Return the formatted IST time
  return istTime.format("DD MMM YYYY | hh:mm A");
}