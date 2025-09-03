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
            relative w-screen bg-[#edebdd]
            h-auto md:h-[70vh] overflow-hidden
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
            className="block w-full h-auto md:h-full object-contain md:object-cover object-center mx-auto"
          />
        </section>
      ))}
    </div>
  );
}

/* ===========================
   Bloque: Cuadrícula 2×2
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
              className={`relative ${
                square ? "aspect-square" : "aspect-[4/3]"
              } overflow-hidden rounded-xl`}
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
   Sofía – Hero + strip auto-scroll
   =========================== */
function SofiaHeroAndStrip({
  images,
}: {
  images: { src: string; alt?: string }[];
}) {
  if (!images.length) return null;
  const [hero, ...rest] = images;
  const stripImages = [...rest, ...rest];

  return (
    <section className="bg-[#edebdd]">
      {/* HERO */}
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
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.25) 100%)",
          }}
        />
      </div>

      {/* STRIP */}
      <div
        className="relative overflow-hidden group"
        style={{
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
        }}
      >
        <div className="relative h-[40vh] sm:h-[44vh] md:h-[46vh] lg:h-[48vh] flex items-stretch">
          <div className="sofia-strip flex">
            {stripImages.map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                className="flex-none h-full"
                style={{
                  width: "50vw",
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

      {/* Espaciador crema antes del footer */}
      <div className="h-[8vh] w-full bg-[#edebdd]" />

      <style jsx>{`
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
        @media (min-width: 640px) {
          .sofia-strip > div {
            width: 33.3333vw !important;
          }
        }
        @media (min-width: 1024px) {
          .sofia-strip > div {
            width: 25vw !important;
          }
        }
        @media (min-width: 1440px) {
          .sofia-strip > div {
            width: 20vw !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ===========================
   Desarrollo Web – 2 pantallas (Proyectos + Experiencia)
   =========================== */
type Project = {
  title: string;
  blurb?: string;
  live?: string;
  repo?: string;
  tags?: string[];
};
type Experience = {
  period: string;
  title: string;
  org?: string;
  details?: string;
};

const WEB_PROJECTS: Project[] = [
  {
    title: "Bastra Website",
    blurb: "Agencia Creativa desarrollada con Next.js 14 + Tailwind.",
    live: "https://bastrastudio.com",
    tags: ["Next.js", "React", "TypeScript", "Tailwind", "Figma", "Redux"],
  },
  {
    title: "Tienda Nube",
    blurb: "Patry Caballeros Sports (En Desarrollo)",
    tags: ["Setup", "Mantenimiento", "Carga de productos", "Automatizaciones", "Pasarela de pagos"],
  },
  {
    title: "Portfolio Full Stack",
    blurb: "Portofolio como Desarrollador con Stack de tecnologías",
    tags: ["Tailwind", "Javascript", "React", "Redux"],
    live: "https://lnkd.in/dC2UZ7zU",
  },
  {
    title: "Github Profile",
    blurb: "Proyectos, código y conocimientos.",
    live: "hhttps://github.com/Zalo7",
  },
  {
    title: "LinkedIn",
    blurb: "Posteos, experiencia y tecnologías.",
    live: "https://www.linkedin.com/in/gonzalolorenzonfullstack/",
  
  },
  {
    title: "Chandran Hughes Architects",
    blurb: "Animaciones, y diseño visual moderno web para estudio de arquitectura.",
    live: "https://chandran-hughes.com",
    tags: ["Framer", "Cardd", "Figma"],
  },
];

const WEB_EXPERIENCE: Experience[] = [
  {
    period: "2021 — 2022",
    title: "Full Stack Web Developer",
    org: "Soy Henry",
    details:
      "Curso de programación informática, aplicaciones específicas",
  },
  {
    period: "2022",
    title: "Front End Developer",
    org: "Bglobal Solutions",
    details:
      "React | Tailwind | Creatio | Plataforma Low Code | CRM | Automatización de Procesos.",
  },
  {
    period: "2023-2025",
    title: "Full Stack Developer",
    org: "Devlights",
    details:
      "Emulación móvil, NextJS, Tailwind, IOS & Android, Typescript.",
  },
  {
    period: "2025",
    title: "Front End Developer",
    org: "Freelance",
    details:
      "Desarrollo web con herramientas con Cardd y Framer",
  },
  {
    period: "Ahora",
    title: "Full Stack Developer & Editor Audiovisual ",
    org: "Bastra",
    details:
      "Encargado del Desarrollo Web y Edición Audiovisual en Bastra Studio",
  },
];

function WebDevScreens({
  projects = WEB_PROJECTS,
  experience = WEB_EXPERIENCE,
}: {
  projects?: Project[];
  experience?: Experience[];
}) {
  return (
    <>
      {/* P1: PROYECTOS */}
      <section
        className="bg-[#edebdd] py-10 md:py-12"
        style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-6 md:mb-8">
            <h2 className="text-3xl md:text-5xl font-[PT-Bold] text-[#810100]">Proyectos & Perfiles</h2>
            <p className="mt-2 text-[#810100]/90 max-w-3xl font-[PT-Regular]">
              Trabajos realizado y proyectos
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <article
                key={i}
                className="rounded-2xl border-2 border-[#810010]/25 bg-[#810100] p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-[PT-Bold] text-[#edebdd]">{p.title}</h3>
                {p.blurb && (
                  <p className="mt-2 text-sm text-[#edebdd]/90 font-[PT-Regular]">{p.blurb}</p>
                )}

                {p.tags?.length ? (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-[#810010]/25 bg-[#edebdd] px-2.5 py-1 text-xs text-[#810100]"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-lg bg-[#edebdd] px-3 py-2 text-sm font-[PT-Bold] text-[#810100] hover:bg-[#6b000e]"
                    >
                      Ver
                    </a>
                  )}
                  {p.repo && p.repo.length > 0 && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-lg border border-[#810010]/30 bg-white px-3 py-2 text-sm font-[PT-Regular] text-[#810010] hover:bg-white/70"
                    >
                      Código
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* P2: EXPERIENCIA */}
      <section
        className="bg-[#edebdd] py-10 md:py-12"
        style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-6 md:mb-8">
            <h2 className="text-3xl md:text-5xl font-[PT-Bold] text-[#810010]">Experiencia</h2>
            <p className="mt-2 text-[#810010]/90 max-w-3xl font-[PT-Regular]">
              Un resumen de mi camino como desarrollador y diseñador web.
            </p>
          </header>

          <div className="relative pl-6 md:pl-8 max-w-3xl">
            <div className="absolute left-2 md:left-3 top-0 bottom-0 w-[2px] bg-[#810010]/30" />
            <ul className="space-y-6 md:space-y-7">
              {experience.map((e, idx) => (
                <li key={idx} className="relative">
                  <span className="absolute -left-0.5 md:-left-1.5 top-1 h-3 w-3 md:h-3.5 md:w-3.5 rounded-full bg-[#810010]" />
                  <div className="rounded-2xl bg-[#edebdd] border border-[#810010]/20 p-4">
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <span className="text-sm font-[PT-Bold] text-[#810010]/80">{e.period}</span>
                      <h3 className="text-lg font-[PT-Bold] text-[#810010]">{e.title}</h3>
                      {e.org && (
                        <span className="text-sm text-[#810010]/70 font-[PT-Regular]">· {e.org}</span>
                      )}
                    </div>
                    {e.details && (
                      <p className="mt-2 text-[#810010]/90 text-sm font-[PT-Regular]">{e.details}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 md:mt-10">
            <a
              href="mailto:bastrastudio@gmail.com"
              className="inline-flex items-center rounded-xl bg-[#810010] px-5 py-3 font-[PT-Bold] text-[#edebdd] ring-1 ring-[#810010]/20 transition hover:bg-[#6b000e]"
            >
              Hablemos de tu próximo proyecto
            </a>
          </div>
        </div>
      </section>
    </>
  );
}


/* ===========================
   Data: categorías y proyectos (Gimena + Sofía)
   =========================== */
const categories = [
  { title: "Diseño Gráfico", sub: ["Identidad Visual", "Ilustración", "Editorial", "Packaging"] },
  { title: "Marketing", sub: ["Social Media", "Estrategia", "Campañas", "Content Creation"] },
  { title: "Fotografía Profesional", sub: ["Fotografía de Producto", "Fotografía de Eventos", "Video", "Producción"] },
  { title: "Desarrollo Web", sub: ["Full Stack Developer", "Tienda Nube", "Diseñador Web", "UX/UI"] },
];

const proyectosDiseno = [
  {
    nombre: "Casa Aldo",
    descripcion:
      "Con más de 50 años de trayectoria, Casa Aldo se dedica a la venta de productos artesanales en cuero, artículos para el campo y marroquinería…",
    secciones: [
      { src: "/images/Gimena/Casa-aldo.jpg", alt: "Casa Aldo – Hero" },
      { src: "/images/Gimena/Casa-aldo-3.jpg", alt: "Casa Aldo – Franjas de marca" },
      { src: "/images/Gimena/Casa-aldo-1.jpg", alt: "Casa Aldo – Tipografías y color" },
    ],
    grid: [
      { src: "/images/Gimena/Casa-aldo-4.png" },
      { src: "/images/Gimena/Casa-aldo-5.jpg" },
      { src: "/images/Gimena/Casa-aldo-6.png" },
      { src: "/images/Gimena/Casa-aldo-9.png" },
    ],
  },
  {
    nombre: "Botánica Teteria",
    descripcion:
      "La Botánica es una tetería con ambientación natural y cálida…",
    secciones: [
      { src: "/images/Gimena/Botanica.jpg" },
      { src: "/images/Gimena/Botanica-1.jpg" },
    ],
    grid: [
      { src: "/images/Gimena/Botanica-3.jpg" },
      { src: "/images/Gimena/Botanica-2.png" },
      { src: "/images/Gimena/Botanica-5.jpg" },
      { src: "/images/Gimena/Botanica-4.jpg" },
    ],
  },
  {
    nombre: "Tons & Timbres",
    descripcion:
      "Escola de Música Tons e Timbres…",
    secciones: [
      { src: "/images/Gimena/Tons.jpg" },
      { src: "/images/Gimena/Tons-5.jpg" },
      { src: "/images/Gimena/Tons-2.jpg" },
    ],
    grid: [
      { src: "/images/Gimena/Tons-4.jpg" },
      { src: "/images/Gimena/Tons-3.jpg" },
      { src: "/images/Gimena/Tons-1.jpg" },
      { src: "/images/Gimena/Tons-6.jpg" },
    ],
  },
];

/* Sofía – fotos */
const fotosSofia: { src: string; alt?: string }[] = [
  { src: "/images/Sofia/Mirrorball.JPG", alt: "Hero Sofía" },
  { src: "/images/Sofia/HappyBday.JPG" },
  { src: "/images/Sofia/Party15.JPG" },
  { src: "/images/Sofia/Cake.JPG" },
  { src: "/images/Sofia/Effort.jpg" },
  { src: "/images/Sofia/Ale.jpg" },
  { src: "/images/Sofia/Lucia.jpg" },
  { src: "/images/Sofia/Sayra-3.JPG" },
  { src: "/images/Sofia/Flores.JPG" },
  { src: "/images/Sofia/Sayra-1.JPG" },
  { src: "/images/Sofia/Ludmi.jpg" },
  { src: "/images/Sofia/Ludmi-1.jpg" },
  { src: "/images/Sofia/Ludmi-2.jpg" },
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
        <div style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)", width: "100vw" }}>
          {proyectosDiseno.map((p, i) => (
            <div key={i}>
              <ProjectFullBleed nombre={p.nombre} descripcion={p.descripcion} secciones={p.secciones} />
              <FourUpGrid className="my-8 md:my-12" images={p.grid} />
            </div>
          ))}
        </div>
      )}

      {/* Marketing (reels simples con autoplay – si quieres, reusa tu ReelCard) */}
      {activeIndex === 1 && (
        <section className="py-10 sm:py-14 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-[PT-Bold] text-[#810010] mb-6 sm:mb-8">
              Marketing – Reels
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:gap-8">
              {[
                { src: "/videos/Darinka.mp4", cover: "/images/posters/Darinka.jpg" },
                { src: "/videos/Darinka-2.mp4", cover: "/images/posters/Darinka-2.jpg" },
                { src: "/videos/Darinka-3.mp4", cover: "/images/posters/Darinka-3.jpg" },
                { src: "/videos/Isla-video.mp4", cover: "/images/posters/Isla-video.jpg" },
              ].map((r, i) => (
                <div key={i} className="relative aspect-[9/16] rounded-[24px] md:rounded-[28px] overflow-hidden shadow-xl ring-1 ring-[#edebdd]/20 bg-black/5">
                  <video
                    src={r.src}
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="auto"
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/10" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fotografía & Audiovisual */}
      {activeIndex === 2 && <SofiaHeroAndStrip images={fotosSofia} />}

      {/* Desarrollo Web (NUEVO) */}
      {activeIndex === 3 && <WebDevScreens />}

      {/* estilos marquee */}
      <style jsx>{`
        .marquee {
          animation: marquee 24s linear infinite;
        }
        .group:hover .marquee {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
