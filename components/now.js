import { useState, useEffect } from 'react';

export default function Now() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="time"
      className="container mx-auto flex w-1/6 items-center
      justify-center rounded-lg border-2 border-gray-700 p-2 text-4xl"
    >
      {time}
    </div>
  );
}
