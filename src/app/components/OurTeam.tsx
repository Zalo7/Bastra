"use client";

import Image from "next/image";

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
    img2: "/images/Foto-Dari.jpg",
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
    img: "/images/Sofia.jpg",
    img2: "/images/Foto-sofi.jpg",
    description: `Como fotógrafa y productora audiovisual de “Bastra”, mi trabajo consiste no solo en materializar tus ideas y hacerlas realidad, sino en ayudarte a envisionarlas y crear una imagen clara de lo que identifica a tu marca, lo que la representa y diferencia de las demás.`,
  },
];

export default function OurTeam() {
  return (
    <div className="min-h-screen bg-[#edebdd] text-[#810010]">
      {/* Sección principal del equipo */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-center mb-16 font-[PT-Bold] text-[#810010]">
          Nuestro Equipo
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <h2 className="text-2xl text-[#810010] font-semibold mb-2 font-[PT-Bold]">
                {member.name}
              </h2>

              {/* Contenedor con efecto */}
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={member.img}
                  alt={member.name}
                  width={300}
                  height={450}
                  className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-110 group-hover:blur-sm"
                />
                {/* Overlay con descripción */}
                <div className="absolute inset-0 bg-[#810100] bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
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
          ))}
        </div>
      </section>

      {/* Sección de descripciones individuales tipo reel */}
      <section className="bg-[#edebdd] max-w-7xl mx-auto px-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-8 py-12 ${
              index !== teamMembers.length - 1 ? "border-b border-[#810010]/20" : ""
            }`}
          >
            {/* Imagen estilo reel */}
            <div className="flex justify-start items-center w-full md:w-1/2">
              <div className="relative w-[300px] h-[533px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Texto a la derecha */}
            <div className="flex flex-col justify-center items-start w-full md:w-1/2 text-[#810010]">
              <h2 className="text-5xl font-[PT-Bold] mb-6">{member.name}</h2>
              <p className="text-xl font-[PT-Regular] leading-relaxed max-w-xl">
                {member.description}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
