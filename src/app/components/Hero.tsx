"use client";

import { useEffect, useState } from "react";
import CustomCursor from "./CustomCursor";

export default function Hero() {
  return (
<main className="relative min-h-screen w-full overflow-hidden bg-[#751612]">
<img
  src="/images/Fondo-Hero.jpg"
  alt="Hero"
  className="hidden md:block w-full h-full object-cover"
/>
<img
  src="/images/opción-vertical.jpg"
  alt="Hero"
  className="block md:hidden w-full h-full object-cover"
/>
</main>



  );
}
