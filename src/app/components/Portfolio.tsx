"use client";

import { useEffect, useState } from "react";

/* ===========================
   Bloque: Proyecto a pantalla completa (full-bleed)
   =========================== */
   function ProjectFullBleed({
    nombre,
    descripcion,
    secciones,
  }: {
    nombre: string;
    descripcion: string;
    secciones: { src: string; alt?: string }[];
  }) {
    return (
      <div
        style={{
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          width: "100vw",
        }}
      >
        {/* Texto arriba (izquierda) */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12 text-left">
          <h2 className="text-2xl md:text-5xl font-[PT-Bold] text-[#810010] mb-3 md:mb-4">
            {nombre}
          </h2>
          <p className="text-sm md:text-lg font-[PT-Regular] text-[#810010]/90 leading-relaxed">
            {descripcion}
          </p>
        </div>
  
        {/* Secciones de imágenes */}
        {secciones.map((sec, i) => (
          <section
            key={i}
            aria-label={`${nombre} – imagen ${i + 1}`}
            className="
              relative
              w-screen
              bg-[#edebdd]                    /* fondo neutro si la img no llena */
              h-auto md:h-[70vh]              /* mobile: auto; desktop: 70vh */
              overflow-hidden
            "
            style={{
              marginLeft: "calc(50% - 50vw)",
              marginRight: "calc(50% - 50vw)",
            }}
          >
            <img
              src={sec.src}
              alt={sec.alt ?? `${nombre} – sección ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              draggable={false}
              className="
                block
                w-full
                h-auto md:h-full
                object-contain md:object-cover
                object-center md:object-center
                mx-auto
              "
            />
          </section>
        ))}
      </div>
    );
  }

/* ===========================
   Bloque: Cuadrícula 2×2 estática (sin hover)
   =========================== */
function FourUpGrid({
  images,
  className = "",
  square = false,
}: {
  images: { src: string; alt?: string }[];
  className?: string;
  square?: boolean;
}) {
  const slots = [...images];
  while (slots.length < 4) slots.push({ src: "/images/placeholder.jpg", alt: "placeholder" });

  return (
    <div className={`max-w-[1600px] mx-auto px-4 md:px-8 ${className}`}>
      <div className="bg-white/80 backdrop-blur-[2px] shadow-md p-2 md:p-3 rounded-2xl">
        <div className="grid grid-cols-2 gap-2.5 md:gap-4">
          {slots.slice(0, 4).map((img, i) => (
            <div
              key={i}
              className={`relative ${square ? "aspect-square" : "aspect-[4/3]"} overflow-hidden rounded-xl`}
            >
              <img
                src={img.src}
                alt={img.alt ?? `grid item ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===========================
   Sofía – Hero full-screen + strip horizontal 4-up (con separadores)
   =========================== */
   function SofiaHeroAndStrip({
    images,
  }: {
    images: { src: string; alt?: string }[];
    title?: string;
  }) {
    if (!images.length) return null;
    const [hero, ...rest] = images;
  
    // duplicamos para loop infinito suave
    const stripImages = [...rest, ...rest];
  
    return (
      <section className="bg-[#edebdd]">
        {/* HERO full-screen (primera foto) */}
        <div
          className="relative"
          style={{
            width: "100vw",
            height: "75vh",
            marginLeft: "calc(50% - 50vw)",
            marginRight: "calc(50% - 50vw)",
          }}
        >
          <img
            src={hero.src}
            alt={hero.alt ?? "Foto destacada"}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          {/* Viñeta sutil para dar profundidad */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.25) 100%)",
            }}
          />
        </div>
  
        {/* STRIP horizontal auto-scroll (2 mob / 3 tablet / 4 desktop) */}
        <div
          className="relative overflow-hidden group"
          style={{
            width: "100vw",
            marginLeft: "calc(50% - 50vw)",
            marginRight: "calc(50% - 50vw)",
          }}
        >
          {/* Altura del carrusel */}
          <div className="relative h-[40vh] sm:h-[44vh] md:h-[46vh] lg:h-[48vh] flex items-stretch">
            <div className="sofia-strip flex">
              {stripImages.map((img, i) => (
                <div
                  key={`${img.src}-${i}`}
                  className="flex-none h-full"
                  style={{
                    // anchuras por defecto para mobile; se sobre-escriben en media queries
                    width: "50vw",
                    // línea de 2px entre cada foto
                    borderRight: "2px solid #edebdd",
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt ?? `Foto ${i + 1}`}
                    className="h-full w-full object-cover block"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
  
        <style jsx>{`
          /* Carrusel continuo */
          .sofia-strip {
            width: max-content;
            will-change: transform;
            animation: sofia-slide-left 42s linear infinite;
          }
          .group:hover .sofia-strip {
            animation-play-state: paused;
          }
          @keyframes sofia-slide-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
  
          /* Mostrar 3 en tablet, 4 en desktop, 5 en XL */
          @media (min-width: 640px) {
            .sofia-strip > div {
              width: 33.3333vw !important;
            }
          }
          @media (min-width: 1024px) {
            .sofia-strip > div {
              width: 25vw !important; /* 4 visibles */
            }
          }
          @media (min-width: 1440px) {
            .sofia-strip > div {
              width: 20vw !important; /* 5 visibles si hay espacio */
            }
          }
        `}</style>
      </section>
    );
  }
  

/* ===========================
   Data: categorías y proyectos (Gimena + Sofía)
   =========================== */
const categories = [
  {
    title: "Diseño Gráfico",
    sub: ["Identidad Visual", "Ilustración", "Editorial", "Packaging"],
  },
  {
    title: "Marketing",
    sub: ["Social Media", "Estrategia", "Campañas", "Content Creation"],
  },
  {
    title: "Fotografía Profesional",
    sub: ["Fotografía de Producto", "Fotografía de Eventos", "Video", "Producción"],
  },
  {
    title: "Desarrollo Web",
    sub: ["Landing Pages", "Tienda Nube", "UI/UX", "Mantenimiento"],
  },
];

const proyectosDiseno = [
  {
    nombre: "Casa Aldo",
    descripcion:
      "Con más de 50 años de trayectoria, Casa Aldo se dedica a la venta de productos artesanales en cuero, artículos para el campo y marroquinería. Su identidad necesitaba reflejar la tradición, el trabajo artesanal y la cercanía con sus clientes. El diseño desarrollado destaca el valor de lo hecho a mano, la calidad y la calidez en el trato, comunicando la esencia de una empresa que no solo vende, sino que también comparte experiencias en cada encuentro.",
    secciones: [
      { src: "/images/Gimena/Casa-aldo.jpg", alt: "Casa Aldo – Hero" },
      { src: "/images/Gimena/Casa-aldo-3.jpg", alt: "Casa Aldo – Franjas de marca" },
      { src: "/images/Gimena/Casa-aldo-1.jpg", alt: "Casa Aldo – Tipografías y color" },
    ],
    grid: [
      { src: "/images/Gimena/Casa-aldo-4.png", alt: "Aplicación 1" },
      { src: "/images/Gimena/Casa-aldo-5.jpg", alt: "Aplicación 2" },
      { src: "/images/Gimena/Casa-aldo-6.png", alt: "Aplicación 3" },
      { src: "/images/Gimena/Casa-aldo-9.png", alt: "Aplicación 4" },
    ],
  },
  {
    nombre: "Botánica Teteria",
    descripcion:
      "La Botánica es una tetería con ambientación natural y cálida que también funciona como tienda de plantas de interior, macetas artesanales y objetos botánicos. El proyecto se enfocó en diseñar una identidad visual que transmita conexión con la naturaleza, creando un entorno visual que invita a disfrutar de un té rodeado de verde, calma y armonía. Una marca pensada para quienes buscan momentos de desconexión y bienestar en un espacio único.",
    secciones: [
      { src: "/images/Gimena/Botanica.jpg", alt: "Botanica – Hero" },
      { src: "/images/Gimena/Botanica-1.jpg", alt: "Botanica – Aplicaciones" },
    ],
    grid: [
      { src: "/images/Gimena/Botanica-3.jpg", alt: "Botanica – Caja" },
      { src: "/images/Gimena/Botanica-2.png", alt: "Botanica – Menú" },
      { src: "/images/Gimena/Botanica-5.jpg", alt: "Botanica – Bolsas" },
      { src: "/images/Gimena/Botanica-4.jpg", alt: "Botanica – Stickers" },
    ],
  },
  {
    nombre: "Tons & Timbres",
    descripcion:
      "Escola de Música Tons e Timbres es una academia que ofrece educación musical de excelencia para todas las edades, con especialización en piano y atención a personas con TEA. El reto fue transmitir, a través de la identidad visual, la combinación entre la enseñanza clásica y métodos innovadores, creando un ambiente inclusivo, lúdico y estimulante. El resultado es una estética fresca y profesional que refleja el compromiso de la escuela con la música como experiencia transformadora.",
    secciones: [
      { src: "/images/Gimena/Tons.jpg", alt: "Tons & Timbres – Hero" },
      { src: "/images/Gimena/Tons-5.jpg", alt: "Tons & Timbres – Iconografía" },
      { src: "/images/Gimena/Tons-2.jpg", alt: "Tons & Timbres – Aplicaciones" },
    ],
    grid: [
      { src: "/images/Gimena/Tons-4.jpg" },
      { src: "/images/Gimena/Tons-3.jpg" },
      { src: "/images/Gimena/Tons-1.jpg" },
      { src: "/images/Gimena/Tons-6.jpg" },
    ],
  },
];

/* Sofía – 7 fotos: 1 hero + 6 para strip */
const fotosSofia: { src: string; alt?: string }[] = [
  { src: "/images/Sofia/Mirrorball.JPG", alt: "Hero Sofía" }, // HERO
  { src: "/images/Sofia/HappyBday.JPG" },
  { src: "/images/Sofia/Party15.JPG" },
  { src: "/images/Sofia/Cake.JPG" },
  { src: "/images/Sofia/Lucia.JPG" },
  { src: "/images/Sofia/Effort.JPG" },
  { src: "/images/Sofia/Ale.JPG" },
  { src: "/images/Sofia/Sayra-1.JPG" },
  { src: "/images/Sofia/Sayra-3.JPG" },
  { src: "/images/Sofia/Flores.JPG" },
  { src: "/images/Sofia/Sayra-2.JPG" },
];

/* ===========================
   Página principal
   =========================== */
export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentCat = categories[activeIndex];

  const [marqueeKey, setMarqueeKey] = useState(0);
  useEffect(() => setMarqueeKey((k) => k + 1), [activeIndex]);

  return (
    <section className="relative min-h-screen bg-[#edebdd]">
      <div className="max-w-[1600px] mx-auto w-full px-4 md:px-8 pt-8 md:pt-12 pb-6">
        <h3 className="text-xs md:text-sm font-[PT-Bold] tracking-widest text-[#810010] mb-3 md:mb-4">
          (04) PORTFOLIO
        </h3>

        {/* Marquee */}
        <div className="relative overflow-hidden group">
          <div key={marqueeKey} className="marquee flex gap-10 md:gap-12 whitespace-nowrap">
            {[...categories, ...categories].map((cat, i) => (
              <button
                key={`${cat.title}-${i}`}
                onClick={() => setActiveIndex(i % categories.length)}
                className={`px-3 md:px-6 py-2 md:py-3 text-2xl md:text-6xl font-[PT-Bold] transition-colors ${
                  categories[activeIndex].title === cat.title
                    ? "text-[#810010]"
                    : "text-[#810010]/30 hover:text-[#810010]"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Subsecciones */}
        <ul className="mt-3 md:mt-6 flex flex-wrap items-center justify-center gap-x-6 md:gap-x-8 gap-y-1.5 md:gap-y-2 text-sm md:text-xl font-[PT-Regular] text-[#810010]">
          {currentCat.sub.map((item, idx) => (
            <li key={idx} className="whitespace-nowrap">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Diseño Gráfico */}
      {activeIndex === 0 && (
        <div
          style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)", width: "100vw" }}
        >
          {proyectosDiseno.map((p, i) => (
            <div key={i}>
              <ProjectFullBleed
                nombre={p.nombre}
                descripcion={p.descripcion}
                secciones={p.secciones}
              />
              <FourUpGrid className="my-8 md:my-12" images={p.grid} />
            </div>
          ))}
        </div>
      )}

      {/* Marketing */}
{/* Marketing */}
{activeIndex === 1 && (
  <section className="py-10 sm:py-14 bg-transparent">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-[PT-Bold] text-[#810010] mb-6 sm:mb-8">
        Marketing – Reels
      </h2>

      {/* Mobile: scroll horizontal / Desktop: grid */}
      <div className="md:grid md:grid-cols-4 md:gap-6 lg:gap-8 flex gap-4 overflow-x-auto snap-x snap-mandatory hidden-scrollbar -mx-2 md:mx-0">
        {[
          { src: "/videos/Darinka.mp4", poster: "/videos/Darinka.mp4" },
          { src: "/videos/Darinka-2.mp4", poster: "/videos/Darinka-2.mp4" },
          { src: "/videos/Darinka-3.mp4", poster: "/videos/Darinka-3.mp4" },
          { src: "/videos/mkt4.mp4", poster: "/images/posters/mkt4.jpg" },
        ].map((r, i) => (
          <article
            key={i}
            className="snap-start md:snap-none shrink-0 basis-[75%] xs:basis-[66%] sm:basis-[55%] md:basis-auto"
          >
            <div className="relative aspect-[9/16] rounded-[24px] md:rounded-[28px] overflow-hidden ring-1 ring-black/10 shadow-xl bg-black/5">
              <video
                src={r.src}
                poster={r.poster}
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
              {/* Vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/10" />
            </div>
          </article>
        ))}
      </div>
    </div>

    <style jsx global>{`
      .hidden-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .hidden-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}</style>
  </section>
)}


      {/* Sofía – Fotografía & Audiovisual */}
      {activeIndex === 2 && <SofiaHeroAndStrip images={fotosSofia} />}

    </section>
  );
}
