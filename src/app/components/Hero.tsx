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
      <main className="min-h-screen flex items-center justify-center bg-[#810100] text-[#edebdd]">
        <p className="font-[Monotalic] text-4xl md:text-6xl text-center">
          The wait is over!
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#810100] relative overflow-hidden">
      <CustomCursor />

      {/* Fondo con puntitos cálidos animados */}
      <div className="absolute inset-0 sparkle-background"></div>

      <div className="relative z-10 text-[#edebdd] px-6 text-center">
        <h1 className="font-[Zodiak-Regular] text-2xl md:text-4xl mb-6">
        Todo Bastra <br /> en un solo sitio.
        </h1>

        <div className="flex justify-center gap-4 md:gap-8 font-[Monotalic]">
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-7xl text-[#edebdd]">{timeLeft.days}</span>
            <span className="text-sm md:text-lg font-[Zodiak-LightItalic]">Días</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-7xl text-[#edebdd]">{timeLeft.hours}</span>
            <span className="text-sm md:text-lg font-[Zodiak-LightItalic]">Horas</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-7xl text-[#edebdd]">{timeLeft.minutes}</span>
            <span className="text-sm md:text-lg font-[Zodiak-LightItalic]">Minutos</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-7xl text-[#edebdd]">{timeLeft.seconds}</span>
            <span className="text-sm md:text-lg font-[Zodiak-LightItalic]">Segundos</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Puntitos/partículas cálidas moviéndose en diagonal */
        .sparkle-background {
          background-image:
            radial-gradient(circle at 20% 30%, rgba(237, 235, 221, 0.25) 1.5px, transparent 2px), /* crema */
            radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.18) 1.2px, transparent 2px), /* blanco */
            radial-gradient(circle at 40% 80%, rgba(129, 1, 0, 0.25) 1.4px, transparent 2px),     /* bordó */
            radial-gradient(circle at 85% 25%, rgba(242, 181, 68, 0.25) 1.2px, transparent 2px); /* dorado */
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
