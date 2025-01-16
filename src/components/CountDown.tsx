"use client";
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const CountDown = ({ scheduledDate }: { scheduledDate: string }) => {
  const [timeLeft, setTimeLeft] = useState("");

  function convertSeconds(seconds: number) {
    const days = Math.floor(seconds / (24 * 3600));
    seconds %= (24 * 3600);
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    let result = '';
    if (days > 0) result += `${days} day${days > 1 ? 's' : ''} `;
    if (hours > 0) result += `${hours} hour${hours > 1 ? 's' : ''} `;
    if (minutes > 0) result += `${minutes} min${minutes > 1 ? 's' : ''} `;
    if (remainingSeconds > 0 || result === '') result += `${remainingSeconds} sec${remainingSeconds > 1 ? 's' : ''}`;

    return result.trim();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingSeconds = dayjs(scheduledDate).diff(dayjs(), 'seconds');
      if (remainingSeconds <= 0) {
        setTimeLeft("null");
        clearInterval(interval);
      } else {
        setTimeLeft(convertSeconds(remainingSeconds));
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [scheduledDate]);
if(timeLeft==="null") return null
  return (
    <div className='bg-lightBurgundy text-blackBerry rounded-[6px] px-[12px] py-[6px] text-[12px] font-[400]'>
       {timeLeft}
    </div>
  );
};

export default CountDown;
