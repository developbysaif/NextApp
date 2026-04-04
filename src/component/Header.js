"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";



const slides = [
  {
    title: (
      <>
        YOUR {" "}
        <span className="text-green-600">BODY'S NATURAL DEFENSE</span>{" "}
        IN A MODERN<br></br> ERA (2026+){" "}
      </>
    ),
    description: (
      <>
        Discover{" "}
        <span className="font-bold">Personalized Diet</span> &{" "}
        <span className="font-bold">Simple Exercise Plans</span>{" "}
        to Manage Modern Conditions. Combat{" "}
        <span className="font-bold">Diabetes</span>, Fight{" "}
        <span className="font-bold">Infections</span>, Manage{" "}
        <span className="font-bold">Mental Health</span>, & Strengthen Your System Naturally.
      </>
    ),
    image: "/banner.png",
    cta1: "EXPLORE NATURAL SOLUTIONS",
    cta1Href: "/health-ai",
    cta2: "Get Diet Plan",
    cta2Href: "/diet-plan",
  },
];

export default function Header() {
  const [active, setActive] = useState(null);
  const [slide] = useState(0);

  return (
    <div className="w-full bg-white font-sans">
      <div className="w-full">

        <div className="flex gap-6 relative">


          {/* HERO SECTION */}
          <section className="flex-1 relative bg-[#f8faf9] w-full overflow-hidden min-h-[400px] md:min-h-[550px] shadow-sm ">

            {/* INNER CONTENT (EXTRA COMPACT) */}
            <div className="relative z-10 px-4 md:px-10 pt-8 md:pt-10 max-w-xl h-full flex flex-col items-center justify-start">

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >

                {/* Brand Text */}
                <div className="inline-flex items-center gap-2 px-2 py-1 mb-2">
                  <span className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-[0.05em] md:tracking-[0.1em] text-[#2e6f3d]">
                    ilajbilghiza:
                  </span>
                </div>

                {/* Subtitle */}
                <p className="text-sm md:text-base uppercase tracking-[0.28em] text-[#2e6f3d] font-semibold mb-1">
                  {slides[slide].subtitle}
                </p>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#124126] leading-[1] md:leading-[1] mb-6 uppercase">
                  {slides[slide].title}
                </h1>

                {/* Description */}
                <p className="text-[#1f4c2e] text-sm md:text-base font-medium mb-6 leading-[1.85] max-w-xl">
                  {slides[slide].description}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">

                  <Link
                    href={slides[slide].cta1Href}
                    className="bg-[#22aa4f] text-white px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-[#21492f] hover:shadow-lg hover:shadow-green-500/20 transition-all text-center"
                  >
                    {slides[slide].cta1}
                  </Link>
                </div>

              </motion.div>

            </div>

            {/* BACKGROUND IMAGE */}
            <div className="absolute inset-0 -z-0">

              <Image
                src={slides[slide].image}
                alt="Hero"
                fill
                className="object-cover object-right"
                priority
              />

            </div>

          </section>

        </div>

      </div>
    </div>
  );
}
