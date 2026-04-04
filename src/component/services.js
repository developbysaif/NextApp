"use client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { servicesData } from "@/data/services-data";

export default function ServicesCards() {
  return (
    <section className="bg-[#d9dbc9] py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#22aa4f] font-black uppercase tracking-[0.35em] text-[10px] mb-4">
            Expert Guidance
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#21492f]">
            Our Professional Services
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((item, i) => (
            <Link
              key={i}
              href={`/services/${item.slug}`}
              className="group relative rounded-[40px] p-8 h-[300px] flex flex-col justify-between overflow-hidden
              bg-[#f3f4ef] text-gray-800
              hover:bg-[#6bb300] hover:text-white
              transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Faded Icon */}
              <div className="absolute top-8 right-8 text-[100px] opacity-10 group-hover:rotate-12 transition-transform duration-500">
                {item.icon}
              </div>

              {/* Top Icon */}
              <div className="text-4xl filter drop-shadow-sm">{item.icon}</div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-bold mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm opacity-80 leading-relaxed font-medium line-clamp-3">
                  {item.desc}
                </p>
              </div>

              {/* Bottom */}
              <div className="flex items-center gap-3 text-sm font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 group-hover:bg-white animate-pulse"></span>
                <span>{item.doctors}+ Specialist Doctors</span>
              </div>

              {/* Curved Corner + Arrow */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#d9dbc9] rounded-tl-[50px] flex items-center justify-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center
                bg-[#22aa4f] text-white
                group-hover:bg-white group-hover:text-[#22aa4f]
                transition-all duration-500 shadow-lg group-hover:scale-110">
                  <ArrowUpRight size={22} strokeWidth={3} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}