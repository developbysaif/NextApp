
"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home } from 'lucide-react';

export default function PageHeader({ title, description, backgroundImage, titleClassName = "", breadcrumbClassName = "" }) {
    return (
        <header
            className="relative bg-[#21492f] text-white w-full min-h-[200px] md:min-h-[280px] overflow-hidden"
        >
            {/* Background Image */}
            {backgroundImage ? (
                <>
                    <Image
                        src={backgroundImage}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-[#21492f]/70 backdrop-blur-[2px]"></div>
                </>
            ) : (
                <div className="absolute inset-0 bg-[#21492f]"></div>
            )}

            <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 py-12 md:py-16">
                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`text-2xl md:text-4xl font-black mb-3 ${titleClassName}`}
                >
                    {title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-white/80 text-xs md:text-base max-w-xl mb-6 font-medium leading-relaxed"
                >
                    {description}
                </motion.p>

                {/* Breadcrumb / Back Link */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`flex items-center gap-2 text-xs font-bold px-5 py-2 rounded-full shadow-md ${breadcrumbClassName || 'text-[#21492f] bg-white/95'}`}
                >
                    <Link href="/" className="flex items-center gap-1.5 hover:text-[#22aa4f] transition-colors">
                        <Home size={12} />
                        <span>Home</span>
                    </Link>
                    <ChevronRight size={12} className="text-stone-300" />
                    <span className="font-black">{title}</span>
                </motion.div>
            </div>
        </header>
    );
}