"use client";

import React, { useState } from "react";
import {
    Quote,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const TESTIMONIALS = [
    {
        id: 1,
        name: "Ahmed",
        role: "Sugar Patient (Recovered)",
        image: "/Group 52.png",
        content:
            "IlajbilGhiza ke AI diet plan se meri sugar control hui aur energy level improve hua.",
        location: "Lahore",
    },
    {
        id: 2,
        name: "Sobia",
        role: "Weight Management",
        image: "/Group 53.png",
        content:
            "Finally, an Urdu platform that understands our desi diet and lifestyle.",
        location: "Karachi",
    },
    {
        id: 3,
        name: "Dr. Rizwan",
        role: "General Physician",
        image: "/Group 54.png",
        content:
            "Scientifically proven nutrition aur quality organic foods par focused platform.",
        location: "Islamabad",
    },
];

const articles = [
    {
        id: 1,
        title: "Organic Diet For Diabetes",
        img: "/N1.png",
        tag: "Disease",
    },
    {
        id: 2,
        title: "Benefits of Moringa Powder",
        img: "/N2.png",
        tag: "Superfood",
    },
    {
        id: 3,
        title: "Natural Ways to Boost Immunity",
        img: "/N3.png",
        tag: "Health",
    },
];

export default function NewsUpdate() {
    const [activeIndex, setActiveIndex] = useState(0);

    const next = () =>
        setActiveIndex((p) => (p + 1) % TESTIMONIALS.length);
    const prev = () =>
        setActiveIndex((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

    return (
        <div className="bg-white py-4 font-sans">

            {/* TESTIMONIALS */}
            <section className="max-w-7xl mx-auto px-4 mb-6">

                {/* Header */}
                <div className="text-center mb-4">
                    <span className="text-[#22aa4f] font-black uppercase tracking-wider text-[10px]">
                        Dilo'n Ki Kahani
                    </span>

                    <h2 className="text-2xl md:text-3xl font-black text-[#21492f] mt-1">
                        Healing Journeys That <span className="text-[#22aa4f]">Inspire Us</span>
                    </h2>
                </div>

                {/* Slider */}
                <div className="relative max-w-5xl mx-auto">

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.3 }}
                            className="bg-[#f8faf9] rounded-2xl p-4 md:p-6 flex flex-col items-center text-center relative border border-gray-100"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-2 right-2 text-[#21492f]/5">
                                <Quote size={80} />
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star
                                        key={s}
                                        size={14}
                                        className="fill-amber-400 text-amber-400"
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-sm md:text-lg font-semibold text-[#21492f] mb-3 italic leading-snug max-w-2xl">
                                “{TESTIMONIALS[activeIndex].content}”
                            </p>

                            {/* Profile */}
                            <div className="flex flex-col items-center">

                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden mb-2 border border-white shadow">
                                    <Image
                                        src={TESTIMONIALS[activeIndex].image}
                                        alt={TESTIMONIALS[activeIndex].name}
                                        width={80}
                                        height={80}
                                        className="object-cover w-full h-full"
                                    />
                                </div>

                                <h4 className="font-black text-sm md:text-base text-[#21492f]">
                                    {TESTIMONIALS[activeIndex].name},{" "}
                                    <span className="text-[#22aa4f]">
                                        {TESTIMONIALS[activeIndex].location}
                                    </span>
                                </h4>

                                <p className="text-gray-500 font-bold text-[10px] uppercase tracking-wide">
                                    {TESTIMONIALS[activeIndex].role}
                                </p>

                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex justify-center items-center gap-2 mt-4">

                        <button
                            onClick={prev}
                            className="p-2 bg-white rounded-lg shadow hover:bg-[#21492f] hover:text-white"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <div className="flex gap-1">
                            {TESTIMONIALS.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveIndex(i)}
                                    className={`h-2 rounded-full transition-all ${activeIndex === i
                                        ? "bg-[#22aa4f] w-6"
                                        : "bg-gray-300 w-2"
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="p-2 bg-white rounded-lg shadow hover:bg-[#21492f] hover:text-white"
                        >
                            <ChevronRight size={18} />
                        </button>

                    </div>
                </div>
            </section>
            <section className="py-6 md:py-10 px-4 md:px-10 bg-[#21492f] rounded-2xl mx-auto max-w-7xl overflow-hidden relative">

                {/* Background */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <Image src="/Waves.png" alt="Bg" fill className="object-cover" />
                </div>

                <div className="relative z-10">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-8 items-start md:items-center">

                        <div>
                            <span className="text-[#22aa4f] font-black uppercase tracking-wider text-[10px]">
                                Wisdom of Nature
                            </span>

                            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
                                Knowledge That Nurtures Life
                            </h2>

                            <p className="text-white/60 text-sm mt-1 max-w-md leading-snug">
                                Qudrati ghiza aur tawana zindagi ka raaz.
                            </p>
                        </div>

                        <button className="hidden md:flex items-center gap-2 px-5 py-2 bg-white text-[#21492f] rounded-lg font-black uppercase text-[10px] hover:bg-[#22aa4f] hover:text-white transition-all">
                            View Knowledge <ArrowRight size={14} />
                        </button>

                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {articles.map((item, i) => (
                            <div
                                key={i}
                                className="bg-white/5 rounded-xl overflow-hidden border border-white/10 flex flex-col transition-all hover:bg-white/10 hover:shadow-md"
                            >
                                {/* Image */}
                                <div className="relative h-36 md:h-40">
                                    <Image src={item.img} alt={item.title} fill className="object-cover" />
                                    <div className="absolute top-2 left-2 bg-white/20 px-2 py-1 rounded text-[9px] font-black text-white uppercase">
                                        {item.tag}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 flex flex-col flex-1">

                                    <h3 className="text-base md:text-lg font-black text-white mb-1 leading-tight">
                                        {item.title}
                                    </h3>

                                    <p className="text-white/40 text-xs md:text-sm mb-2 leading-snug italic">
                                        Scientific research aur natural food based lifestyle.
                                    </p>

                                    <button className="mt-auto flex items-center gap-1 text-[10px] md:text-xs font-black text-white uppercase tracking-wide hover:text-[#22aa4f] transition-colors">
                                        Explore <ArrowRight size={12} className="text-[#22aa4f]" />
                                    </button>

                                </div>
                            </div>
                        ))}

                    </div>

                    {/* Mobile Button */}
                    <button className="md:hidden w-full mt-6 bg-white text-[#21492f] py-2 rounded-lg font-black uppercase text-[10px] hover:bg-[#22aa4f] hover:text-white transition-all">
                        View More Articles
                    </button>

                </div>
            </section>

        </div>
    );
}


