"use client";

import { Badge } from "@/components/UI/Badge";
import { useEffect, useState } from "react";

type Props = {
  auctionEnd: string;
};

export default function CountDownTimer({ auctionEnd }: Props) {
  const [days, hours, minutes, seconds] = useCountdown(auctionEnd);

  const completed = days + hours + minutes + seconds <= 0;

  return (
    completed
      ? <Badge variant="destructive">Auction Finished</Badge>
      : <Badge className="countdown" variant={
        (days === 0 && hours < 10)
          ? "secondary"
          : "default"
      }  >
        <span style={{ "--value": days } as React.CSSProperties} />:
        <span style={{ "--value": hours } as React.CSSProperties} />:
        <span style={{ "--value": minutes } as React.CSSProperties} />:
        <span style={{ "--value": seconds } as React.CSSProperties} />
      </ Badge>
  );
}

const useCountdown = (targetDate: string) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};