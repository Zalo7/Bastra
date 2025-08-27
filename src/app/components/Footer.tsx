"use client";

import Link from "next/link";

/**
 * Footer minimalista adaptado a la estética de Bastra.
 * - Fondo granate (#810100) como la navbar.
 * - Tipografía clara (#EDEBDD).
 * - Email destacado en tipografía bold.
 * - Redes con efecto underline animado al hover.
 * - Responsive: stack en mobile, 3 columnas en desktop.
 */
export default function BastraFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#810100] text-[#EDEBDD]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12 items-start">
          {/* Columna 1: título + email */}
          <div>
            <p className="text-base sm:text-lg tracking-wide opacity-90 font-[Zodiak-ThinItalic]">
              ¿Tenés un proyecto en mente?
            </p>
            <a
              href="mailto:bastrastudio@gmail.com"
              className="mt-3 block text-2xl sm:text-3xl font-[Zodiak-Regular] text-[#EDEBDD] hover:underline underline-offset-4"
            >
              bastrastudio@gmail.com
            </a>
          </div>

          {/* Columna 2: redes */}
          <nav aria-label="Redes sociales" className="md:justify-self-center">
            <ul className="space-y-3 text-lg font-[Zodiak-Regular]">
              <li>
                <FooterLink href="https://instagram.com" label="Instagram" />
              </li>
              <li>
                <FooterLink href="https://facebook.com" label="Facebook" />
              </li>
              <li>
                <FooterLink href="https://behance.net" label="Behance" />
              </li>
              <li>
                <FooterLink href="https://tiktok.com" label="TikTok" />
              </li>
              <li>
                <FooterLink href="https://pinterest.com" label="Pinterest" />
              </li>
            </ul>
          </nav>

          {/* Columna 3: copyright */}
          <div className="md:justify-self-end flex items-end md:items-start">
            <p className="text-sm sm:text-base text-[#EDEBDD]/80 font-[Zodiak-LightItalic]">
              © {new Date().getFullYear()} Bastra Studio. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="relative inline-block text-lg font-[PT-Regular] text-[#EDEBDD]/90 hover:text-[#EDEBDD]
                 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#EDEBDD]
                 after:transition-all after:duration-300 hover:after:w-full"
    >
      {label}
    </Link>
  );
}