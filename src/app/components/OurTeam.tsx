"use client";

import Image from "next/image";
import { useState } from "react";

const teamMembers = [
  {
    name: "Gimena Yurcie",
    role: "Diseñadora Gráfica, Ilustradora",
    img: "/images/Gimena 2.jpg",
    description: `Como diseñadora gráfica e ilustradora en “Bastra”, transformo conceptos e ideas en piezas visuales únicas que transmiten identidad y emoción. Desde el diseño de logotipos hasta ilustraciones personalizadas, mi objetivo es que cada proyecto comunique de forma clara y creativa la esencia de tu marca.`,
  },
  {
    name: "Darinka Polich",
    role: "Content Creator, Community Manager",
    img: "/images/Darinka.jpg",
    description: `En Bastra Studio gestiono redes sociales y creo contenido que conecta. Diseño estrategias, produzco fotos, videos y campañas alineadas con la esencia de la marca. Cada publicación tiene un objetivo claro: atraer, inspirar, vender o fidelizar.`,
  },
  {
    name: "Gonzalo Lorenzon",
    role: "Desarrollador Web, Editor AudioVisual",
    img: "/images/Gonzalo.jpg",
    description: `En “Bastra” combino mi experiencia como desarrollador web con mis habilidades en edición audiovisual para crear soluciones digitales funcionales y visualmente atractivas. Me encargo de construir sitios web que no solo funcionan bien, sino que también cuentan historias a través de imágenes, videos y experiencias interactivas.`,
  },
  {
    name: "Sofía Husty",
    role: "Fotógrafa, Productora Visual",
    img: "/images/Sofia.JPG",
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

        {/* Grid con separación clara */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24">
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
    description: string;
  };
}) {
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

      {/* Tarjeta sin borde, separadas entre sí */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={toggle}
        onKeyDown={onKeyDown}
        className="relative w-[min(82vw,300px)] sm:w-[min(46vw,300px)] lg:w-[320px] aspect-[3/4] rounded-2xl overflow-hidden shadow-lg outline-none focus:ring-2 focus:ring-[#810010]/40"
      >
        <Image
          src={member.img}
          alt={member.name}
          fill
          priority
          quality={100}
          sizes="(min-width:1280px) 320px, (min-width:768px) 46vw, 82vw"
          draggable={false}
          className={[
            "object-cover",
            "object-[50%_18%]",
            "transition-transform duration-300",
            open ? "scale-105" : "scale-100",
            "md:group-hover:scale-105",
          ].join(" ")}
        />
        {/* Overlay descripción */}
        <div
          className={[
            "absolute inset-0 bg-[#751612]/80 transition-opacity duration-300",
            "flex items-center justify-center p-4",
            open ? "opacity-100" : "opacity-0",
            "md:opacity-0 md:group-hover:opacity-100",
          ].join(" ")}
        >
          <p className="text-[#edebdd] font-[PT-Regular] text-sm">
            {member.description}
          </p>
        </div>
      </div>

      {/* Roles debajo */}
      <p className="mt-3 text-[#810010] font-[PT-Regular] whitespace-pre-line">
        {member.role.replace(/,\s*/g, "\n")}
      </p>
    </div>
  );
}
