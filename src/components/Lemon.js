import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Lemon() {
    return (
        <section className="max-w-7xl mx-auto px-4 my-6 md:my-10">

            <div
                className="relative bg-[#1cc5a2] rounded-[1.8rem] md:rounded-[2.5rem] 
        p-5 md:p-10 flex flex-col md:flex-row 
        items-center justify-between gap-6 
        overflow-hidden shadow-xl shadow-green-600/20 group"
            >

                {/* Decorative Background */}
                <div
                    className="absolute -top-20 -left-20 w-72 h-72 
          bg-white/10 rounded-full blur-3xl 
          group-hover:bg-white/15 transition-all duration-700"
                />

                <div
                    className="absolute -bottom-20 -right-20 w-56 h-56 
          bg-black/10 rounded-full blur-3xl 
          group-hover:bg-black/15 transition-all duration-700"
                />

                {/* Left Content */}
                <div className="relative z-10 text-white md:w-1/2 text-center md:text-left">

                    {/* Badge */}
                    <span
                        className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md 
            rounded-full text-[11px] font-bold uppercase tracking-wider 
            mb-4"
                    >
                        Special Offer
                    </span>

                    {/* Heading */}
                    <h2
                        className="text-3xl md:text-5xl font-black leading-tight mb-4"
                    >
                        NURTURE YOUR <br className="hidden lg:block" /> SOUL WITH TEA
                    </h2>

                    {/* Description */}
                    <p
                        className="text-white/80 text-sm md:text-base lg:text-lg 
            font-medium max-w-sm mx-auto md:mx-0 
            mb-6 leading-relaxed"
                    >
                        Our Natural and Fresh Green Tea Collection is hand-picked for your
                        health and vitality.
                    </p>

                    {/* Button */}
                    <button
                        className="bg-white text-[#1cc5a2] font-bold 
            px-7 py-3 rounded-xl 
            hover:bg-gray-900 hover:text-white 
            transition-all duration-300 
            flex items-center gap-2 
            mx-auto md:mx-0 shadow-md group/btn"
                    >
                        Shop Now
                        <ArrowRight
                            size={18}
                            className="transition-transform group-hover/btn:translate-x-1"
                        />
                    </button>

                </div>

                {/* Right Image */}
                <div className="relative z-10 md:w-1/2 flex justify-center">

                    <Image
                        src="/Limes.png"
                        alt="Green Tea with Lemon"
                        width={420}
                        height={420}
                        className="w-56 md:w-72 lg:w-[420px] 
            object-contain 
            drop-shadow-[0_20px_20px_rgba(0,0,0,0.25)] 
            transition-transform duration-700 
            group-hover:scale-105 group-hover:-rotate-3"
                    />

                </div>

            </div>
        </section>
    );
}
