"use client";

export default function ReelSection() {
  return (
    <section className="bg-[#810100] py-20 sm:py-24 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Mobile: 1 col. Desktop: 3 cols (labels se muestran solo en md+) */}
        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-8">
          <span className="hidden md:block uppercase tracking-[0.3em] text-sm text-[#edebdd] opacity-80 justify-self-start">
            CREATIVE STUDIO
          </span>

          {/* Contenedor CENTRAL y sin cortes */}
          <div className="w-full flex justify-center">
            <div
              className="
                relative
                w-[min(95vw,480px)] md:w-[420px]
                aspect-[9/16]
                rounded-2xl sm:rounded-[28px]
                overflow-hidden shadow-2xl ring-1 ring-[#edebdd]/20
              "
            >
              <video
                src="/videos/bastra-reel.mp4"
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              {/* Vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#810010]/20 via-transparent to-[#810010]/20" />

              {/* Servicios apilados con animación escalonada e infinita */}
              <div className="absolute inset-0 grid place-items-center px-4">
                <ul
                  className="
                    reel-stagger
                    text-[#edebdd] uppercase text-center
                    text-[clamp(12px,3.6vw,16px)] sm:text-[clamp(13px,2.6vw,18px)] md:text-base
                    tracking-[0.06em] sm:tracking-[0.1em] md:tracking-[0.25em]
                    leading-tight space-y-1.5 sm:space-y-2
                    drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]
                    max-w-[86%] [text-wrap:balance]
                  "
                  aria-hidden="false"
                >
                  <li>Desarrollo Web</li>
                  <li>Branding</li>
                  <li>Contenido UGC</li>
                  <li>Fotografía Profesional</li>
                  <li>Producciones Audiovisuales</li>
                  <li>Community Manager</li>
                  <li>Estrategias</li>
                </ul>
              </div>
            </div>
          </div>

          <span className="hidden md:block uppercase tracking-[0.3em] text-sm text-[#edebdd] opacity-80 justify-self-end">
            ARGENTINA
          </span>
        </div>
      </div>
    </section>
  );
}
