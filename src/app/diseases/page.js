"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Droplets, Heart, Leaf, Bone, ArrowRight
} from 'lucide-react';

export default function DiseasesAndAilmentsPage() {
    return (
        <div className="font-sans antialiased text-gray-900 bg-[#fdfaf5]">

            {/* ═══════════════════════════════════════════
                1. HERO SECTION (Dark Green Wavy)
            ═══════════════════════════════════════════ */}
            <section
                className="relative overflow-hidden py-16 md:py-24 text-center"
                style={{ background: 'linear-gradient(135deg, #1a3a25 0%, #21492f 60%, #1c3d28 100%)' }}
            >
                {/* Decorative background waves */}
                <svg className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 1440 400" preserveAspectRatio="none">
                    <path d="M0,150 C300,50 600,250 900,150 C1200,50 1440,200 1440,200 L1440,400 L0,400 Z" fill="#22aa4f" opacity="0.1" />
                    <path d="M0,250 C400,350 800,50 1200,200 L1440,150 L1440,400 L0,400 Z" fill="#1c3d28" />
                </svg>

                <div className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center">
                    {/* Logo (Optional styling to match the screenshot header) */}

                    <h1 className="text-3xl md:text-5xl font-black text-[#cbb18a] leading-tight mb-6" style={{ fontFamily: 'var(--font-serif), serif' }}>
                        Organically Healing Diseases &amp; Ailments
                    </h1>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed font-medium italic max-w-2xl mx-auto">
                        The problem with modern food is that it's designed for shelf life, not your life.
                        We started IlajbilGhiza to bridge the gap between Islamic Sunnah and modern
                        scientific nutrition.
                    </p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                2. DISEASE AND TREATMENT HEADER + CENTERPIECE
            ═══════════════════════════════════════════ */}
            <section className="pt-16 pb-12 px-4 relative">
                {/* Subtle leaf background SVG strokes */}
                <div className="absolute left-0 top-10 opacity-10 pointer-events-none hidden md:block">
                    <svg width="200" height="400" viewBox="0 0 200 400" fill="none" stroke="#21492f" strokeWidth="2">
                        <path d="M-50,200 Q50,150 100,50 Q120,100 80,180 Q150,250 -20,350" />
                    </svg>
                </div>

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-black text-[#2e4029] mb-10">
                        Disease and Treatment
                    </h2>

                    {/* Grand Centerpiece Image placeholder (AI Generative space) */}
                    <div className="relative w-full max-w-4xl mx-auto h-[300px] md:h-[450px] mb-10">
                        <Image
                            src="/Fruits.png" // Fallback to existing asset since AI limit hit
                            alt="Botanical illustration of healing foods"
                            fill
                            className="object-contain"
                            priority
                        />
                        {/* Overlay text if needed to explain AI limit locally to user, skipped here */}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                3. 4 GRID CARDS
            ═══════════════════════════════════════════ */}
            <section className="pb-20 px-4 relative z-10">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

                    {/* Card 1: Diabetes */}
                    <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-[#e8dfcf] shadow-sm flex relative overflow-hidden group hover:shadow-lg transition-all">
                        <div className="flex-1 pr-4 z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-red-100/50 flex items-center justify-center">
                                    <Droplets size={20} className="text-red-600" />
                                </div>
                                <h3 className="text-lg font-black text-[#2e4029] leading-tight max-w-[150px]">
                                    Type-2 Diabetes Management
                                </h3>
                            </div>
                            <p className="text-[#555] text-xs leading-relaxed mb-6 font-medium">
                                Custom illustrated with complex carbohydrates and spices sources.
                            </p>
                            <Link href="/disease/diabetes" className="inline-block bg-[#c0a072] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[#b08d5c] transition-colors">
                                View Remedy
                            </Link>
                        </div>
                        {/* Right side image */}
                        <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-40 h-40 z-0">
                            <Image src="/Dry Fruit.png" alt="Oats and cinnamon" fill className="object-contain" />
                        </div>
                    </div>

                    {/* Card 2: Blood Pressure */}
                    <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-[#e8dfcf] shadow-sm flex relative overflow-hidden group hover:shadow-lg transition-all">
                        <div className="flex-1 pr-4 z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-red-100/50 flex items-center justify-center">
                                    <Heart size={20} className="text-red-600" />
                                </div>
                                <h3 className="text-lg font-black text-[#2e4029] leading-tight max-w-[150px]">
                                    Blood Pressure Balance
                                </h3>
                            </div>
                            <p className="text-[#555] text-xs leading-relaxed mb-6 font-medium">
                                Hibiscus flowers, with hibiscus, powers, gentian, and natural natural fonts.
                            </p>
                            <Link href="/disease/blood-pressure" className="inline-block bg-[#2f4d36] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[#203625] transition-colors">
                                View Remedy
                            </Link>
                        </div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 z-0">
                            <Image src="/Anar.png" alt="Hibiscus and pomegranate" fill className="object-contain" />
                        </div>
                    </div>

                    {/* Card 3: Weight Control */}
                    <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-[#e8dfcf] shadow-sm flex relative overflow-hidden group hover:shadow-lg transition-all">
                        <div className="flex-1 pr-4 z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-green-100/50 flex items-center justify-center">
                                    <Leaf size={20} className="text-green-600" />
                                </div>
                                <h3 className="text-lg font-black text-[#2e4029] leading-tight max-w-[150px]">
                                    Natural Weight Control
                                </h3>
                            </div>
                            <p className="text-[#555] text-xs leading-relaxed mb-6 font-medium">
                                High-fiber foods and water in measured whole natural health water.
                            </p>
                            <Link href="/disease/weight" className="inline-block bg-[#2f4d36] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[#203625] transition-colors">
                                Read More
                            </Link>
                        </div>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-36 h-36 z-0">
                            <Image src="/Mint.png" alt="Salad and water" fill className="object-contain" />
                        </div>
                    </div>

                    {/* Card 4: Joint Pain */}
                    <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-[#e8dfcf] shadow-sm flex relative overflow-hidden group hover:shadow-lg transition-all">
                        <div className="flex-1 pr-4 z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-orange-100/50 flex items-center justify-center">
                                    <Bone size={20} className="text-[#a6763f]" />
                                </div>
                                <h3 className="text-lg font-black text-[#2e4029] leading-tight max-w-[150px]">
                                    Joint Pain Relief
                                </h3>
                            </div>
                            <p className="text-[#555] text-xs leading-relaxed mb-6 font-medium">
                                Custom-healthy recipe with joint-healthy ginger, turmeric, and walnuts.
                            </p>
                            <Link href="/disease/joints" className="inline-block bg-[#c0a072] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[#b08d5c] transition-colors">
                                Read More
                            </Link>
                        </div>
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-40 h-40 z-0 opacity-90">
                            <Image src="/Herbs.png" alt="Ginger and knee joint" fill className="object-contain" />
                        </div>
                    </div>

                </div>
            </section>

            {/* ═══════════════════════════════════════════
                4. COMMITMENT BANNERS & EXTRA CARDS
            ═══════════════════════════════════════════ */}
            <section className="pb-20 px-4">
                <div className="max-w-5xl mx-auto">

                    {/* Wood Commitment Banner */}
                    <div
                        className="rounded-3xl p-8 md:p-12 mb-8 text-center shadow-lg relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #442a19 0%, #683a21 100%)' }}
                    >
                        {/* Overlay to faux-wood texture */}
                        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />

                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-black text-[#e4cda7] mb-3">
                                Our commitment to quality &amp; trust
                            </h2>
                            <p className="text-[#d8c39e] text-xs md:text-sm max-w-2xl mx-auto font-medium leading-relaxed">
                                IlajbilGhiza is consistent to transparency clinics nutrition guidance, and our privacy. All health
                                recommendations are science-backed and designed for real-world application.
                            </p>
                        </div>
                    </div>

                    {/* 2 Bottom Cards */}
                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Card: Hair Fall */}
                        <div
                            className="rounded-3xl p-8 relative overflow-hidden flex items-center"
                            style={{ background: 'linear-gradient(135deg, #254a32 0%, #1e3a27 100%)' }}
                        >
                            <div className="flex-1 pr-24 relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                        {/* Icon mimicking hair follicle */}
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a5d898" strokeWidth="2">
                                            <path d="M12 2v20M8 8 C8 8, 12 12, 12 12M16 8 C16 8, 12 12, 12 12" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-black text-white leading-tight">
                                        Hair Fall &amp; Restoration
                                    </h3>
                                </div>
                                <p className="text-white/70 text-xs leading-relaxed mb-6 font-medium">
                                    Custom illustrated with bottle of rosemary-infused oil, amla, and moringa.
                                </p>
                                <Link href="/disease/hair-fall" className="inline-block bg-[#dbbb8e] text-[#2e4029] px-6 py-2 rounded-full text-xs font-black hover:bg-[#ebd0a8] transition-colors">
                                    Read More
                                </Link>
                            </div>
                            <div className="absolute -right-2 -bottom-2 w-32 h-32 opacity-90">
                                <Image src="/Lime.png" alt="Amla and oil" fill className="object-contain" />
                            </div>
                        </div>

                        {/* Card: Teeth Whitening */}
                        <div
                            className="rounded-3xl p-8 relative overflow-hidden flex items-center"
                            style={{ background: 'linear-gradient(135deg, #d2ad79 0%, #be9052 100%)' }}
                        >
                            <div className="flex-1 pr-24 relative z-10">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                        {/* Tooth Icon */}
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1">
                                            <path d="M12 22C10.5 22 9 19 9 19C9 19 8 20.5 6.5 20.5C5 20.5 4 19 4 17C4 16 4 13 4 11C4 6.5 7.5 3 12 3C16.5 3 20 6.5 20 11C20 13 20 16 20 17C20 19 19 20.5 17.5 20.5C16 20.5 15 19 15 19C15 19 13.5 22 12 22Z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-black text-[#2e4029] leading-tight">
                                        Natural Teeth Whitening<br />&amp; Break Remedy
                                    </h3>
                                </div>
                                <p className="text-[#443621] text-xs leading-relaxed mb-6 font-medium">
                                    Miswak with a nature-used in miswak, custom-recipe and simple charcoal recipe.
                                </p>
                                <Link href="/disease/teeth-whitening" className="inline-block bg-[#2f4d36] text-white px-6 py-2 rounded-full text-xs font-black hover:bg-[#203625] transition-colors">
                                    Read More
                                </Link>
                            </div>
                            <div className="absolute -right-4 -bottom-4 w-40 h-40">
                                <Image src="/Mint.png" alt="Miswak and charcoal" fill className="object-contain grayscale contrast-125 sepia-[0.3]" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                5. KNOWLEDGE CENTER BANNER
            ═══════════════════════════════════════════ */}
            <section className="pb-16 px-4">
                <div
                    className="max-w-5xl mx-auto rounded-[40px] py-16 px-8 text-center relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #183321 0%, #173d22 100%)' }}
                >
                    {/* Wavy overlapping SVGs simulating paper cut layers */}
                    <svg className="absolute top-0 left-0 w-full h-[60%] opacity-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,0 L100,0 L100,50 C70,100 30,0 0,60 Z" fill="#22aa4f" />
                    </svg>
                    <svg className="absolute bottom-0 left-0 w-full h-[60%] opacity-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,100 L100,100 L100,50 C70,0 30,100 0,40 Z" fill="#4ade80" />
                    </svg>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-black text-[#cbb18a] mb-4" style={{ fontFamily: 'var(--font-serif), serif' }}>
                            Knowledge Center
                        </h2>
                        <p className="text-white/80 text-sm max-w-xl mx-auto mb-8 font-medium leading-relaxed">
                            Good health starts with informed choices. Take a step toward natural healing,
                            smarter nutrition, and a healthier future.
                        </p>

                        <div className="flex justify-center gap-4">
                            <Link
                                href="/diet-plan"
                                className="bg-white text-[#21492f] px-6 py-3 rounded-full text-xs font-bold shadow-md hover:bg-gray-100 transition-colors"
                            >
                                Request a nutrition plan
                            </Link>
                            <Link
                                href="/book-appointment"
                                className="bg-transparent border border-white/30 text-white px-6 py-3 rounded-full text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2"
                            >
                                Contact experts <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* Small pagination dots mimicking slider */}
                        <div className="flex justify-center gap-2 mt-8">
                            <span className="w-8 h-1.5 bg-white/80 rounded-full" />
                            <span className="w-1.5 h-1.5 bg-white/30 rounded-full" />
                            <span className="w-1.5 h-1.5 bg-white/30 rounded-full" />
                            <span className="w-1.5 h-1.5 bg-white/30 rounded-full" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
