import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function Card({ label, title, href = "#", img, imgWidth = 96, imgHeight = 96, bg = "#ffffff", textClass = "text-[#214a32]" }) {
    return (
        <Link
            href={href}
            className={`group rounded-2xl p-6 flex items-center justify-between gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden relative ${textClass}`}
            style={{ backgroundColor: bg }}
        >
            <div className="z-10 flex-1">
                {label && (
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest mb-2">
                        {label}
                    </span>
                )}
                <h2 className="text-xl md:text-2xl font-black leading-tight mb-3 transition-transform group-hover:scale-105 origin-left">
                    {title}
                </h2>
                <div className="flex items-center gap-2 text-sm font-bold underline underline-offset-4 decoration-2">
                    Browse <MoveRight size={16} className="transition-transform group-hover:translate-x-2" />
                </div>
            </div>

            {img && (
                <div className="relative flex-shrink-0 z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <Image
                        src={img}
                        alt={title}
                        width={imgWidth}
                        height={imgHeight}
                        className="object-contain drop-shadow-2xl"
                    />
                </div>
            )}

            {/* Subtle background decoration */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
        </Link>
    );
}

