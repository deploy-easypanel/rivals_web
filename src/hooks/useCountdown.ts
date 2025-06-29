import { useEffect, useState } from 'react';

export default function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!targetDate) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(targetDate).getTime();
      const distance = end - now;

      if (distance <= 0) {
        setTimeLeft('Agora!');
        clearInterval(interval);
        return;
      }

      const dias = Math.floor(distance / (1000 * 60 * 60 * 24));
      const horas = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((distance / (1000 * 60)) % 60);
      const segundos = Math.floor((distance / 1000) % 60);

      setTimeLeft(`${dias}d ${horas}h ${minutos}m ${segundos}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}
