'use client';

export default function AboutSection() {
  return (
    <section className="w-full px-6 py-20 md:py-32 bg-[#edebdd]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Logo */}
        <div className="flex justify-center md:justify-start">
          <img 
            src="/images/Bastra-studio-red.png"
            alt="Bastra Logo" 
            className="w-72 md:w-96" 
          />
        </div>

        {/* Texto */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#810100] font-[Monotalic-Bold]">¿Quiénes somos?</h2>
          <p className="text-lg leading-relaxed text-[#810100] max-w-xl font-[Zodiak-Regular]">
            Bastra es una agencia creativa que potencia marcas a través de estrategia, estética y autenticidad. 
            Trabajamos como aliados creativos para construir experiencias memorables y posicionamientos sólidos 
            en un mundo cada vez más visual y competitivo.
          </p>
        </div>
      </div>
    </section>
  );
}