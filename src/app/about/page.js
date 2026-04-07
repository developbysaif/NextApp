"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Leaf, Activity, Brain, Stethoscope,
    ArrowRight, Instagram, Twitter, Facebook
} from 'lucide-react';
import BlogSlider from '@/component/BlogSlider';

export default function AboutPage() {
    return (
        <div className="text-gray-900 antialiased font-sans">

            {/* ═══════════════════════════════════════════
                1. PREMIUM IMAGE HERO SECTION
            ═══════════════════════════════════════════ */}
            <section className="relative h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
                {/* Background Image Header */}
                <div 
                    className="absolute inset-0 z-0 scale-105"
                    style={{
                        backgroundImage: "url('/organic_foods.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* Dark gradient for text legibility without white blur */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a25]/80 via-black/40 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-start lg:items-center lg:text-center text-left pt-10">
                    <div className="inline-flex items-center gap-3 bg-[#B4E567] px-8 py-2.5 rounded-full border-2 border-white/40 mb-8 font-bold text-[11px] uppercase tracking-[0.3em] text-[#21492f] shadow-2xl">
                        <Leaf size={14} className="text-[#21492f]" /> Our Heritage
                    </div>
                    
                    <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[0.9] mb-8" style={{ fontFamily: 'var(--font-serif), serif' }}>
                        &ldquo;We Believe <br className="md:hidden" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B4E567] via-[#cbb18a] to-[#cbb18a] drop-shadow-sm">Food Is Medicine</span>&rdquo;
                    </h1>

                    <p className="max-w-2xl text-white/90 font-bold text-base md:text-lg tracking-tight mb-10 drop-shadow-lg leading-relaxed italic">
                        The problem with modern food is that it's designed for shelf-life, not your life.
                        We started Ilaj Bil Ghiza to bridge the gap between Islamic Sunnah and modern
                        scientific nutrition.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                         <div className="flex -space-x-4">
                             <div className="size-12 rounded-full border-2 border-white shadow-xl overflow-hidden"><Image src="/P-1.png" width={48} height={48} className="object-cover" alt="Review 1" /></div>
                             <div className="size-12 rounded-full border-2 border-white shadow-xl overflow-hidden"><Image src="/P-2.png" width={48} height={48} className="object-cover" alt="Review 2" /></div>
                             <div className="size-12 rounded-full border-2 border-white shadow-xl overflow-hidden"><Image src="/P-3.png" width={48} height={48} className="object-cover" alt="Review 3" /></div>
                         </div>
                         <div className="flex flex-col items-start sm:items-start text-left bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
                             <div className="flex gap-1 mb-1 text-[#FFD166]">
                                 {[1,2,3,4,5].map(star => <span key={star}>★</span>)}
                             </div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-white">Loved by thousands across Pakistan</p>
                         </div>
                    </div>
                </div>
                
                {/* Image is fully visible now without white blur transition */}
            </section>

            {/* ═══════════════════════════════════════════
                2. WHO WE ARE + PHILOSOPHY
            ═══════════════════════════════════════════ */}
            <section className="py-16 bg-[#f5f0e8]">
                <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-start">

                    {/* Left text column */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-0.5 bg-[#a6763f] rounded-full" />
                                <h2 className="text-2xl md:text-3xl font-black text-[#21492f]">Who we are</h2>
                            </div>
                            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                                IlajbilGhiza is built on the philosophy of &quot;Dawai se pehle Ghiza&quot;. Our platform connects
                                organic food knowledge and artificial intelligence to provide smarter, safer, and more
                                natural health solutions.
                            </p>
                        </div>

                        {/* Philosophy Card */}
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow border border-stone-100">
                            <h3 className="text-xl md:text-2xl font-black text-[#21492f] mb-1">Our philosophy</h3>
                            <p className="text-[#22aa4f] font-bold italic text-sm mb-4">Dawai se pehle ghiza</p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                We believe food is the body&apos;s first and most powerful form of medicine. By returning to
                                organic, seasonal, and locally available foods, the body can restore balance and heal naturally.
                                Noble. Pure easy and holistic outcome and heal reasonably.
                            </p>

                            {/* Social icons */}
                            <div className="flex gap-3 mb-7">
                                <span className="w-9 h-9 bg-[#21492f] text-white rounded-lg flex items-center justify-center">
                                    <Instagram size={16} />
                                </span>
                                <span className="w-9 h-9 bg-[#22aa4f] text-white rounded-lg flex items-center justify-center">
                                    <Twitter size={16} />
                                </span>
                                <span className="w-9 h-9 bg-[#a6763f] text-white rounded-lg flex items-center justify-center">
                                    <Facebook size={16} />
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/diet-plan"
                                    className="bg-[#a6763f] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:brightness-110 transition-all"
                                >
                                    View who we are
                                </Link>
                                <Link
                                    href="/products"
                                    className="bg-[#21492f] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#22aa4f] transition-all"
                                >
                                    View products
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Image (AI-generated organic foods) */}
                    <div className="relative group">
                        <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/5] max-w-sm mx-auto lg:mx-0">
                            <Image
                                src="/organic_foods.png"
                                alt="Fresh organic produce basket"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        {/* Decorative blob */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#22aa4f]/15 rounded-full blur-xl -z-10" />
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                3. WHAT WE OFFER — 4 image cards
            ═══════════════════════════════════════════ */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16 mb-12">
                        {/* Decorative fruit image (AI-generated) */}
                        <div className="hidden md:block w-32 lg:w-40 flex-shrink-0 relative aspect-square rounded-2xl overflow-hidden shadow-lg self-center">
                            <Image
                                src="/hero_exotic_fruit_bowl.png"
                                alt="Organic foods"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-[#21492f] mb-3">What we offer</h2>
                            <p className="text-gray-500 text-sm max-w-xl font-medium">
                                A comprehensive ecosystem designed for your natural health and wellness.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                title: "Organic & natural foods",
                                desc: "We provide information and access to organic fruits, vegetables, and traditional foods from trusted sources.",
                                img: "/organic_foods.png",
                                icon: Leaf,
                                bg: "bg-green-50",
                                iconColor: "text-[#22aa4f]",
                                border: "border-green-100"
                            },
                            {
                                title: "Disease-based nutrition",
                                desc: "Food-based guidance for conditions such as diabetes, blood pressure, obesity and similar healthcare concerns.",
                                img: "/disease_based.png",
                                icon: Activity,
                                bg: "bg-blue-50",
                                iconColor: "text-blue-600",
                                border: "border-blue-100"
                            },
                            {
                                title: "AI-powered diet planning",
                                desc: "Our AI analyzes health goals to generate nutrition plans providing daily meal plans with exact food quantities.",
                                img: "/ai_diet_planning.png",
                                icon: Brain,
                                bg: "bg-purple-50",
                                iconColor: "text-purple-600",
                                border: "border-purple-100"
                            },
                            {
                                title: "Doctor support",
                                desc: "Get answers for your health queries, advice and guidance to get fit.",
                                img: "/doctor_support.png",
                                icon: Stethoscope,
                                bg: "bg-red-50",
                                iconColor: "text-red-500",
                                border: "border-red-100"
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`group rounded-3xl ${item.bg} border ${item.border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
                            >
                                {/* Card image */}
                                <div className="relative w-full aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                </div>
                                {/* Card body */}
                                <div className="p-5">
                                    <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm ${item.iconColor}`}>
                                        <item.icon size={20} />
                                    </div>
                                    <h3 className="text-base font-black text-[#21492f] mb-2 leading-snug">{item.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed font-medium">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                4. COMMITMENT TO QUALITY & TRUST — dark brown banner
            ═══════════════════════════════════════════ */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div
                        className="relative rounded-3xl p-10 md:p-14 text-center overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #3d2010 0%, #5c3318 100%)' }}
                    >
                        {/* Background wave pattern */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <svg viewBox="0 0 800 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                                <path d="M0,150 Q200,50 400,150 T800,150" stroke="white" strokeWidth="60" fill="none" opacity="0.3" />
                                <path d="M0,200 Q200,100 400,200 T800,200" stroke="white" strokeWidth="40" fill="none" opacity="0.2" />
                            </svg>
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                                Our commitment to quality &amp; trust
                            </h2>
                            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium">
                                IlajbilGhiza is committed to transparency, ethical nutrition guidance, and user privacy. All health
                                recommendations are science-backed and designed for real-world application.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                5. MISSION & VISION — two cards side by side
            ═══════════════════════════════════════════ */}
            <section className="pb-16 bg-white">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6">
                    {/* Mission — green */}
                    <div className="bg-[#22aa4f] rounded-3xl p-8 md:p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="relative z-10">
                            <h3 className="text-xl md:text-2xl font-black text-white mb-3">Our mission</h3>
                            <p className="text-white/85 text-sm leading-relaxed font-medium">
                                Our mission is to educate people about the healing power of food, combine tradition with modern
                                science, and make personalized nutrition accessible to everyone through technology. To heal through
                                Allah&apos;s provision.
                            </p>
                        </div>
                    </div>

                    {/* Vision — warm tan */}
                    <div
                        className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #c9a97a 0%, #b8884c 100%)' }}
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="relative z-10">
                            <h3 className="text-xl md:text-2xl font-black text-white mb-3">Our vision</h3>
                            <p className="text-white/85 text-sm leading-relaxed font-medium">
                                IlajbilGhiza aims to become Pakistan&apos;s most trusted platform for organic food-based health
                                solutions, empowering individuals to live healthier lives, embracing food as life&apos;s best therapy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                6. CTA SECTION — dark green with logo + two buttons
            ═══════════════════════════════════════════ */}
            <section className="pb-10 px-4">
                <div
                    className="max-w-6xl mx-auto rounded-3xl py-14 px-8 md:px-16 text-center relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #1a3a25 0%, #21492f 100%)' }}
                >
                    {/* Decorative leaf top-right */}
                    <div className="absolute top-0 right-0 w-56 h-56 opacity-10 pointer-events-none">
                        <svg viewBox="0 0 200 200" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 180 20 C 100 20 20 100 20 180 C 80 180 150 140 180 20 Z" />
                        </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 opacity-10 pointer-events-none">
                        <svg viewBox="0 0 200 200" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 20 180 C 100 180 180 100 180 20 C 120 20 50 60 20 180 Z" />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        {/* Logo */}
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <span className="text-2xl">🌿</span>
                            <span className="text-white font-black text-2xl tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>IlajbilGhiza</span>
                        </div>

                        <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto font-medium mb-8 leading-relaxed">
                            Good health starts with informed choices. Take a step toward natural healing,
                            smarter nutrition, and a healthier future.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/diet-plan"
                                className="inline-flex items-center gap-2 bg-white text-[#21492f] px-7 py-3.5 rounded-xl font-black text-xs hover:bg-[#4ade80] hover:text-white transition-all shadow-lg"
                            >
                                Request a nutrition plan
                                <ArrowRight size={15} />
                            </Link>
                            <Link
                                href="/book-appointment"
                                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 px-7 py-3.5 rounded-xl font-black text-xs hover:bg-white/20 transition-all"
                            >
                                Contact experts
                                <ArrowRight size={15} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                7. BLOG SLIDER — latest knowledge posts
            ═══════════════════════════════════════════ */}
            <section className="px-4 pb-16 max-w-6xl mx-auto">
                <BlogSlider />
            </section>

        </div>
    );
}
