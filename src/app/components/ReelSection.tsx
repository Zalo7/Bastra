"use client";

export default function ReelSection() {
  return (
    <section className="bg-[#810100] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-6">
          {/* Label izquierda */}
          <span className="justify-self-start hidden md:block uppercase tracking-[0.3em] text-sm text-[#edebdd] opacity-80">
            CREATIVE STUDIO
          </span>

          {/* Contenedor del video */}
          <div className="relative w-full max-w-[420px] mx-auto aspect-[9/16] rounded-[28px] overflow-hidden shadow-2xl ring-1 ring-[#edebdd]/20">
            <video
              src="/videos/bastra-reel.mp4"
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
            {/* Vignette sutil */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#810010]/20 via-transparent to-[#810010]/20" />

            {/* Texto centrado sobre el video */}
            <div className="absolute inset-0 grid place-items-center">
              <p className="px-6 text-center text-xs sm:text-sm md:text-base uppercase tracking-[0.35em] text-[#edebdd] drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                Creamos desde la base, ejecutamos con estrategia
              </p>
            </div>
          </div>

          {/* Label derecha */}
          <span className="justify-self-end hidden md:block uppercase tracking-[0.3em] text-sm text-[#edebdd] opacity-80">
            ARGENTINA
          </span>
        </div>
      </div>
    </section>
  );
}
