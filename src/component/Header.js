"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";



const slides = [
  {
    title: "YOUR BODY'S NATURAL DEFENSE IN A MODERN ERA (2026+)",
    subtitle: "Healing Nature's Way",
    description:
      "Discover Personalized Diet & Simple Exercise Plans to Manage Modern Conditions. Combat Diabetes, Fight Infections, Manage Mental Health, & Strengthen Your System Naturally.",
    image: "/ilajbillghiza-banner.png",
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
            <div className="relative z-10 px-4 md:px-10 py-8 md:py-12 max-w-xl h-full flex flex-col justify-center">

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-2 py-1 mb-3">
                  <Image
                    src="/desk-top.png"
                    alt="IlajbilGhiza"
                    width={160}
                    height={100}
                    className="rounded-full object-contain"
                  />
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-[#21492f] leading-[1.2] md:leading-tight mb-4">
                  {slides[slide].title}
                </h1>

                {/* Description */}
                <p className="text-[#21492f] text-sm md:text-lg font-medium mb-6 leading-relaxed max-w-md">
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

              <div className="absolute inset-0 bg-gradient-to-r from-[#f8faf9] via-[#f8faf9]/90 to-transparent"></div>

            </div>

          </section>

        </div>

      </div>
    </div>
  );
}
