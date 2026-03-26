"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  { name: "Vegetables and Fruits", slug: "vegetables-fruits" },
  { name: "Fresh Meat", slug: "fresh-meat" },
  { name: "Fish and Seafood", slug: "fish-seafood" },
  { name: "Butter and Cream", slug: "butter-cream" },
  { name: "Oil and Vinegar", slug: "oil-vinegar" },
  { name: "Breads", slug: "breads" },
  { name: "Apple Juice", slug: "apple-juice" },
  { name: "Dry Nuts", slug: "dry-nuts" },
];

const slides = [
  {
    title: "Your Body Is Crying for Help — Are You Listening?",
    subtitle: "Healing Nature's Way",
    description:
      "Natural healing. AI-powered diet plans. Sunnah-based remedies. Start fixing your health before it’s too late.",
    image: "/header.jpg",
    cta1: "Check Symptoms",
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
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">

        <div className="flex gap-6 relative">

          {/* SIDEBAR */}
          <aside className="w-64 border border-[#21492f] bg-white z-40 rounded-3xl overflow-hidden hidden md:block">

            <div className="px-6 py-4 bg-[#21492f] font-black text-white text-xs uppercase tracking-widest">
              ☰ CATEGORIES
            </div>

            <ul className="py-2">
              {categories.map((cat) => (
                <li
                  key={cat.slug}
                  onMouseEnter={() => setActive(cat.name)}
                  onMouseLeave={() => setActive(null)}
                  className={`flex justify-between items-center px-6 py-3 transition-all
                    ${active === cat.name
                      ? "bg-[#22aa4f]/10 text-[#21492f]"
                      : "text-[#21492f]/60 hover:text-[#21492f]"
                    }`}
                >
                  <Link
                    href={`/grocery/category/${cat.slug}`}
                    className="flex-1 font-bold text-xs"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* HERO SECTION */}
          <section className="flex-1 relative bg-[#f8faf9] rounded-[2rem] md:rounded-[3rem] overflow-hidden min-h-[400px] md:min-h-[550px] shadow-sm border border-gray-100">

            {/* INNER CONTENT (EXTRA COMPACT) */}
            <div className="relative z-10 px-4 md:px-10 py-8 md:py-12 max-w-xl h-full flex flex-col justify-center">

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >

                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-[#22aa4f]/10 px-3 py-1 rounded-full mb-3">

                  <span className="w-2 h-2 rounded-full bg-[#22aa4f] animate-pulse"></span>

                  <p className="text-[#22aa4f] font-black text-[10px] uppercase tracking-wider">
                    {slides[slide].subtitle}
                  </p>

                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-[#21492f] leading-[1.2] md:leading-tight mb-4">
                  {slides[slide].title}
                </h1>

                {/* Description */}
                <p className="text-gray-500 text-sm md:text-lg font-medium mb-6 leading-relaxed max-w-md">
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

                  <Link
                    href={slides[slide].cta2Href}
                    className="bg-white text-[#21492f] border border-[#21492f]/10 px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest hover:border-[#22aa4f] hover:text-[#22aa4f] hover:shadow-lg transition-all text-center"
                  >
                    {slides[slide].cta2}
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
