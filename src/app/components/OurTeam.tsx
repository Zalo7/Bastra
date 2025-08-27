"use client";

import Image from "next/image";
import { useState } from "react";

const teamMembers = [
  {
    name: "Gimena Yurcie",
    role: "Diseñadora Gráfica, Ilustradora",
    img: "/images/Gimena.png",
    img2: "/images/Foto-Gime.png",
    description: `Como diseñadora gráfica e ilustradora en “Bastra”, transformo conceptos e ideas en piezas visuales únicas que transmiten identidad y emoción. Desde el diseño de logotipos hasta ilustraciones personalizadas, mi objetivo es que cada proyecto comunique de forma clara y creativa la esencia de tu marca.`,
  },
  {
    name: "Darinka Polich",
    role: "Content Creator, Community Manager",
    img: "/images/Darinka.jpg",
    img2: "/images/Darinka.JPG",
    description: `En Bastra Studio gestiono redes sociales y creo contenido que conecta. Diseño estrategias, produzco fotos, videos y campañas alineadas con la esencia de la marca. Cada publicación tiene un objetivo claro: atraer, inspirar, vender o fidelizar.`,
  },
  {
    name: "Gonzalo Lorenzon",
    role: "Desarrollador Web, Editor AudioVisual",
    img: "/images/Gonzalo.jpg",
    img2: "/images/Foto-Gonza.png",
    description: `En “Bastra” combino mi experiencia como desarrollador web con mis habilidades en edición audiovisual para crear soluciones digitales funcionales y visualmente atractivas. Me encargo de construir sitios web que no solo funcionan bien, sino que también cuentan historias a través de imágenes, videos y experiencias interactivas.`,
  },
  {
    name: "Sofía Husty",
    role: "Fotógrafa, Productora Visual",
    img: "/images/Sofia.JPG",
    img2: "/images/Sofia.JPG",
    description: `Como fotógrafa y productora audiovisual de “Bastra”, mi trabajo consiste no solo en materializar tus ideas y hacerlas realidad, sino en ayudarte a envisionarlas y crear una imagen clara de lo que identifica a tu marca, lo que la representa y diferencia de las demás.`,
  },
];

export default function OurTeam() {
  return (
    <div className="min-h-screen bg-[#edebdd] text-[#810010]">
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-center mb-16 font-[PT-Bold] text-[#810010]">
          Nuestro Equipo
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
}

function TeamCard({
  member,
}: {
  member: {
    name: string;
    role: string;
    img: string;
    img2?: string;
    description: string;
  };
}) {
  // Estado para mobile/touch: abrir/cerrar con tap
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div className="flex flex-col items-center text-center group">
      <h2 className="text-2xl text-[#810010] font-semibold mb-2 font-[PT-Bold]">
        {member.name}
      </h2>

      {/* Contenedor clickeable en mobile, hover en desktop */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={toggle}
        onKeyDown={onKeyDown}
        className="relative overflow-hidden rounded-lg shadow-lg outline-none focus:ring-2 focus:ring-[#810010]/40"
      >
        <Image
          src={member.img}
          alt={member.name}
          width={300}
          height={450}
          className={[
            "rounded-lg object-cover transition-all duration-300",
            // Efecto en desktop (hover) y en mobile (open)
            open ? "scale-110 blur-sm" : "scale-100 blur-0",
            "md:group-hover:scale-110 md:group-hover:blur-sm",
          ].join(" ")}
          draggable={false}
          priority={false}
        />

        {/* Overlay con descripción: visible en hover (md+) o cuando open=true */}
        <div
          className={[
            "absolute inset-0 bg-[#810100]/80 transition-opacity duration-300 flex items-center justify-center p-4",
            open ? "opacity-100" : "opacity-0",
            "md:opacity-0 md:group-hover:opacity-100",
          ].join(" ")}
        >
          <p className="text-[#edebdd] font-[PT-Regular] text-sm">
            {member.description}
          </p>
        </div>
      </div>

      {/* Roles debajo (con saltos en comas) */}
      <p className="mt-3 text-[#810010] font-[PT-Regular] whitespace-pre-line">
        {member.role.replace(/,\\s*/g, "\n")}
      </p>
    </div>
  );
}
