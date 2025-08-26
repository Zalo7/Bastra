// // src/components/AboutUs.tsx
// "use client";

// import { useState, useEffect } from "react";

// export default function AboutUs() {
//   const fullText = "Conocenos un poco más...";
//   const [displayedText, setDisplayedText] = useState("");
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     if (index < fullText.length) {
//       const timeout = setTimeout(() => {
//         setDisplayedText(prev => prev + fullText.charAt(index));
//         setIndex(index + 1);
//       }, 80); // velocidad del typewriter
//       return () => clearTimeout(timeout);
//     }
//   }, [index]);

//   return (
//     <section
//       className="w-full h-screen flex items-center justify-center bg-cover bg-center relative"
//       style={{ backgroundImage: "url('../images/Team-BN.jpg')" }}
//     >
//       {/* Overlay sutil para que el texto destaque */}
//       <div className="absolute inset-0 bg-[#edebdd]/10" />

//       {/* Texto animado */}
//       <h1
//         className="w-full h-screen text-5xl font-[Monotalic-Bold] flex justify-center pt-24"
//         style={{ color: "#810010"}}
//       >
//         {displayedText}
//         <span className="animate-pulse">|</span>
//       </h1>
//     </section>
//   );
// }
