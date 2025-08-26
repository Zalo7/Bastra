"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="top-0 z-50 w-full h-16 bg-[#810100] text-white">
      <div className="max-w-7xl h-full mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="Ir a inicio" className="shrink-0">
          <Image
            src="/images/Bastra-Logo-Nombre.png"
            alt="Bastra"
            width={160}
            height={80}
            priority
          />
        </Link>

        {/* Links desktop (desde lg en adelante) */}
        <ul className="hidden lg:flex items-center gap-8 text-md font-medium font-[Zodiak-Regular]">
          <li>
            <Link
              href="/contactus"
              className="inline-block bg-[#edebdd] text-[#810100] rounded-lg text-sm px-5 py-2.5 hover:opacity-90"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link href="/portfolio" className="hover:underline">
              Our Portfolio
            </Link>
          </li>
          <li>
            <Link href="/team" className="hover:underline">
              Our Team
            </Link>
          </li>
        </ul>

        {/* Botón hamburguesa (visible hasta lg) */}
        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-white/10"
        >
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* hamburguesa */}
            <path d="M4 6h16M4 12h16M4 18h16" stroke="#edebdd" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Panel móvil (visible < lg) */}
      <div
        className={`lg:hidden fixed top-16 left-0 right-0 z-50 bg-[#810100] text-white border-t border-white/10 transition-[transform,opacity] duration-200 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-6 text-lg font-[Zodiak-Regular]">
          <Link href="/contactus" onClick={() => setOpen(false)} className="bg-[#edebdd] text-[#810100] rounded-lg px-4 py-2 text-center">
            Contact Us
          </Link>
          <Link href="/portfolio" onClick={() => setOpen(false)} className="hover:underline">
            Our Portfolio
          </Link>
          <Link href="/team" onClick={() => setOpen(false)} className="hover:underline">
            Our Team
          </Link>
        </div>
      </div>
    </nav>
  );
}
