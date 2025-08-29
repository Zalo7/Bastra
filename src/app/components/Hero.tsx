"use client";

import { useEffect, useState } from "react";
import CustomCursor from "./CustomCursor";

export default function Hero() {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-09-03T00:00:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#751612] text-[#edebdd]">
        <p className="font-[Monotalic] text-4xl md:text-6xl text-center">
          The wait is over!
        </p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#751612]">
      {/* Fondo por dispositivo */}
      <img
        src="/images/Fondo-Hero.jpg"
        alt="Hero"
        className="hidden md:block w-full h-full object-cover"
      />
      <img
        src="/images/opción-vertical.jpg"
        alt="Hero"
        className="block md:hidden w-full h-full object-cover"
      />

      {/* Partículas en #751612 */}
      <div className="pointer-events-none absolute inset-0 sparkle-background" />

      <style jsx>{`
        /* Puntitos/partículas moviéndose en diagonal - color #751612 */
        .sparkle-background {
          background-image:
            radial-gradient(circle at 20% 30%, rgb(117 22 18 / 0.42) 1.5px, transparent 2px),
            radial-gradient(circle at 70% 60%, rgb(117 22 18 / 0.30) 1.2px, transparent 2px),
            radial-gradient(circle at 40% 80%, rgb(117 22 18 / 0.36) 1.4px, transparent 2px),
            radial-gradient(circle at 85% 25%, rgb(117 22 18 / 0.26) 1.2px, transparent 2px);
          background-size: 160px 160px, 220px 220px, 200px 200px, 260px 260px;
          animation: drift 16s linear infinite, flicker 6s ease-in-out infinite;
          opacity: 0.6;
        }

        @keyframes drift {
          0%   { background-position: 0 0, 0 0, 0 0, 0 0; }
          100% { background-position: 160px 160px, -220px -220px, 200px -200px, -260px 260px; }
        }

        @keyframes flicker {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </main>
  );
}
