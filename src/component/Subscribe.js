"use client";

import Image from "next/image";
import { Mail, Send, Leaf } from "lucide-react";

export default function Subscribe() {
    return (
        <section className="relative overflow-visible mx-4 md:mx-10 my-20">

            <div className="max-w-7xl mx-auto relative bg-[#f8faf9] rounded-[3rem] 
      p-6 md:p-12 overflow-hidden shadow-sm border border-gray-100 
      flex flex-col items-center text-center group">

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-[#22aa4f]/5 
        rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />

                <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#a6763f]/5 
        rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

                {/* Image */}
                <Image
                    src="/Mint.png"
                    alt="Organic Mint"
                    width={250}
                    height={250}
                    className="absolute -top-8 -right-2 w-40 md:w-56 
          transition-transform duration-700 group-hover:rotate-12 
          group-hover:scale-110 z-10 opacity-40 md:opacity-100"
                />

                {/* Content */}
                <div className="relative z-20 max-w-3xl">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 
          bg-[#22aa4f]/10 px-4 py-1.5 rounded-full 
          text-[10px] font-bold tracking-widest text-[#22aa4f] 
          mb-5 border border-[#22aa4f]/10">

                        <Leaf size={12} />
                        ilajbilghiza Family
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-5xl font-black text-[#21492f] 
          leading-tight mb-5">
                        Aapki Sehat, <span className="text-[#22aa4f]">Hamara Junoon</span>
                    </h2>

                    {/* Description */}
                    <p className="text-gray-500 text-base md:text-xl 
          font-medium mb-7 max-w-xl mx-auto leading-relaxed">
                        Join 10,000+ families who chose life over disease. Get weekly healing tips delivered with love.
                    </p>

                    {/* Form */}
                    <div className="flex flex-col sm:flex-row gap-3 
          bg-white p-2 rounded-2xl w-full max-w-xl mx-auto 
          shadow-lg border border-gray-100">

                        {/* Input */}
                        <div className="flex-1">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="w-full bg-transparent px-4 py-3 
                text-[#21492f] focus:outline-none text-base 
                font-semibold placeholder-gray-400"
                            />
                        </div>

                        {/* Button */}
                        <button
                            className="bg-[#21492f] text-white px-7 py-3 
              font-bold text-xs uppercase tracking-widest 
              rounded-xl flex items-center justify-center gap-2 
              transition-all hover:bg-[#22aa4f] 
              hover:scale-105 active:scale-95">

                            Join Family <Send size={16} />
                        </button>

                    </div>

                    {/* Footer Text */}
                    <p className="text-gray-400 text-[11px] mt-5 
          font-semibold uppercase tracking-wider">

                        Join 10,000+ health conscious people in Pakistan
                    </p>

                </div>
            </div>
        </section>
    );
}
