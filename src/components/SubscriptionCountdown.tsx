import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface SubscriptionCountdownProps {
  expiresAt: string;
}

const SubscriptionCountdown = ({ expiresAt }: SubscriptionCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="glass rounded-xl p-4 flex items-center gap-4">
      <Clock className="w-5 h-5 text-primary flex-shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground mb-1">Subscription expires in</p>
        <div className="flex gap-2 text-sm font-mono font-bold">
          <span className="bg-secondary px-2 py-1 rounded">{pad(timeLeft.days)}d</span>
          <span className="bg-secondary px-2 py-1 rounded">{pad(timeLeft.hours)}h</span>
          <span className="bg-secondary px-2 py-1 rounded">{pad(timeLeft.minutes)}m</span>
          <span className="bg-secondary px-2 py-1 rounded">{pad(timeLeft.seconds)}s</span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCountdown;
