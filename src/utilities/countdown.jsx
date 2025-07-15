import { useEffect, useState } from "react";

function padZero(value) {
  return value.toString().padStart(2, "0");
}

function calculateTimeLeft(targetDate) {
  const now = new Date();
  const total = targetDate - now;

  if (total <= 0) {
    return { total: 0, months: 0, days: 0, hours: 0 };
  }

  let years = targetDate.getFullYear() - now.getFullYear();
  let months = targetDate.getMonth() - now.getMonth();
  let days = targetDate.getDate() - now.getDate();
  let hours = targetDate.getHours() - now.getHours();

  if (hours < 0) {
    hours += 24;
    days--;
  }

  if (days < 0) {
    const prevMonth = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      0
    );
    days += prevMonth.getDate();
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  let seconds = targetDate.getSeconds() - now.getSeconds();
  if (seconds < 0) {
    seconds += 60;
    hours--;
  }

  const totalMonths = months + years * 12;

  return {
    total,
    months: padZero(totalMonths),
    days: padZero(days),
    hours: padZero(hours),
    seconds: padZero(seconds),
  };
}

export function CountdownTimer() {
  const target = new Date("2025-12-02T23:59:00-08:00");
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  if (timeLeft.total <= 0) {
    return <p className="text-red-600 font-semibold">Deadline has passed</p>;
  }

  return (
    <>
      <p className="text-3xl font-bold flex gap-3 items-baseline">
        <span>{timeLeft.months}</span>
        <span>:</span>
        <span>{timeLeft.days}</span>
        <span>:</span>
        <span>{timeLeft.hours}</span>
        <span>:</span>
        <span>{timeLeft.seconds}</span>
      </p>
      <p className="text-xs text-gray-600 flex gap-4">
        <span>months</span>
        <span></span>
        <span>days</span>
        <span></span>
        <span>hours</span>
        <span></span>
        <span>seconds</span>
      </p>
    </>
  );
}
