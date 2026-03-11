"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ChevronRight,
    Home,
    ArrowRight,
    Baby,
    ShieldCheck,
    HeartPulse,
    Milk,
    Brain,
    ArrowUpRight
} from 'lucide-react';
import BlogSlider from '@/component/BlogSlider';

export default function PediatricianInsightsPage() {
    const specializations = [
        {
            title: "Child Nutrition & Growth",
            icon: <Milk className="w-8 h-8 text-[#21492F]" />,
            link: "#"
        },
        {
            title: "Preventive Care & Immunization Support",
            icon: <ShieldCheck className="w-8 h-8 text-[#21492F]" />,
            link: "#"
        },
        {
            title: "Holistic Child Development",
            icon: <Baby className="w-8 h-8 text-[#21492F]" />,
            link: "#"
        },
        {
            title: "Organic Allergy Management",
            icon: <HeartPulse className="w-8 h-8 text-[#21492F]" />,
            link: "#"
        },
        {
            title: "Behavioral Health & Wellness",
            icon: <Brain className="w-8 h-8 text-[#21492F]" />,
            link: "#"
        }
    ];

    const sidebarInsights = [
        { id: 1, title: "Understanding Childhood Eczema: A natural path.", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=200&auto=format&fit=crop" },
        { id: 2, title: "Boosting Immunity with Organic Whole Foods.", img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=200&auto=format&fit=crop" },
        { id: 3, title: "The Role of Prebiotics in Gut Health for Kids.", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=200&auto=format&fit=crop" },
        { id: 4, title: "Managing ADHD: Natural approaches to behavior.", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=200&auto=format&fit=crop" },
        { id: 5, title: "The Importance of Hydration with Natural Sources.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=200&auto=format&fit=crop" }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1589927986089-35812388d1f4?q=80&w=2000&auto=format&fit=crop"
                        alt="Honeycomb background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="relative z-10 text-center text-white px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black mb-4 tracking-tight uppercase"
                    >
                        Pediatrician Insights
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl max-w-2xl mx-auto mb-8 font-medium"
                    >
                        Discover the latest natural-based insights for children's health, from nutrition to developmental care.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-2 bg-white px-6 py-2 rounded-full text-black text-sm font-bold w-fit mx-auto"
                    >
                        <Link href="/" className="hover:text-green-600 transition-colors flex items-center gap-1">
                            <Home size={14} /> Home
                        </Link>
                        <ChevronRight size={14} className="text-gray-400" />
                        <span className="text-gray-600">Pediatrician Insights</span>
                    </motion.div>
                </div>
            </section>

            {/* Specialization Section */}
            <section className="py-16 bg-[#F8FAF5]">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="bg-[#EFF4E8] rounded-[40px] p-8 md:p-12 border border-[#DBE4D0]">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-2xl font-black text-[#21492F] uppercase tracking-wider">
                                Pediatrician Specialization
                            </h2>
                            <Link href="#" className="flex items-center gap-1 text-[#21492F] text-xs font-black uppercase tracking-widest hover:underline">
                                ← View All Specialities
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
                            {specializations.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="bg-white rounded-3xl p-6 flex flex-col items-center text-center border border-[#DBE4D0] shadow-sm"
                                >
                                    <div className="mb-4 bg-[#F8FAF5] p-4 rounded-2xl">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-[#21492F] font-black text-sm md:text-base mb-4 min-h-[40px] flex items-center justify-center leading-tight">
                                        {item.title}
                                    </h3>
                                    <button className="text-[10px] font-black uppercase tracking-widest text-[#21492F] bg-[#F8FAF5] px-4 py-2 rounded-xl hover:bg-[#21492F] hover:text-white transition-all border border-[#21492F]/10">
                                        Read Insights
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-10 text-center">
                            <Link href="#" className="text-[#21492F] font-black text-sm border-b-2 border-[#21492F] pb-1 inline-block uppercase tracking-widest">
                                View all Recent Blogs
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="pb-12 pt-8 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Blog Posts Column */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* Main Featured Post */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-[40px] overflow-hidden border border-[#D1D9CA] shadow-sm group hover:shadow-xl transition-all duration-500"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div className="relative h-[300px] md:h-full">
                                        <Image
                                            src="https://images.unsplash.com/photo-1544126592-807daa215a75?q=80&w=800&auto=format&fit=crop"
                                            alt="Child Nutrition"
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="p-8 md:p-10 flex flex-col justify-center">
                                        <h2 className="text-2xl md:text-3xl font-black text-[#21492F] mb-4 leading-tight uppercase">
                                            The Organic Approach to Pediatric Nutrition
                                        </h2>
                                        <p className="text-[#4F5E4B] text-sm leading-relaxed mb-6 font-medium">
                                            Discover how natural foods and holistic practices can build a stronger immune system and support your child's growth...
                                        </p>
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#EFF4E8]">
                                                <Image src="https://images.unsplash.com/photo-1559839734-2b71f1536701?q=80&w=100&auto=format&fit=crop" alt="Dr Fatima" width={40} height={40} className="object-cover" />
                                            </div>
                                            <span className="text-[11px] font-black uppercase tracking-tight text-[#21492F]">by Dr. Fatima - Pediatric Nutritionist</span>
                                        </div>
                                        <button className="w-fit bg-[#21492F] text-white font-black text-xs uppercase tracking-widest px-8 py-3 rounded-full hover:bg-[#22aa4f] transition-all duration-300">
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Secondary Posts Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    {
                                        title: "The Organic Approach to Pediatric Nutrition",
                                        author: "by Dr. Sarah Khan - Expert Der...",
                                        img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=400&auto=format&fit=crop"
                                    },
                                    {
                                        title: "Discovering the Power of Aloe in Modern Dermatology",
                                        author: "by Dr. Sarah Khan - Expert Dermato...",
                                        img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?q=80&w=400&auto=format&fit=crop"
                                    }
                                ].map((post, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white rounded-[32px] overflow-hidden border border-[#D1D9CA] group hover:shadow-lg transition-all"
                                    >
                                        <div className="flex gap-4 p-4">
                                            <div className="w-1/3 relative aspect-square rounded-2xl overflow-hidden shrink-0">
                                                <Image src={post.img} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="flex flex-col justify-center py-2">
                                                <h3 className="text-sm font-black text-[#21492F] mb-1 line-clamp-2 leading-snug uppercase tracking-tight">
                                                    {post.title}
                                                </h3>
                                                <p className="text-[10px] text-[#8D9F91] font-black mb-3">{post.author}</p>
                                                <button className="text-[#21492F] text-[10px] font-black uppercase tracking-widest border border-[#21492F]/20 px-3 py-1 rounded-lg w-fit group-hover:bg-[#21492F] group-hover:text-white transition-all">
                                                    Read More
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="lg:col-span-4">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-[40px] border border-[#D1D9CA] overflow-hidden sticky top-32"
                            >
                                <div className="p-8 border-b border-[#F4F4EB] bg-[#EFF4E8]/50">
                                    <h2 className="text-xl font-black text-[#21492F] uppercase tracking-widest">Recent Insights</h2>
                                </div>
                                <div className="p-8 space-y-6">
                                    {sidebarInsights.map((item, idx) => (
                                        <Link key={item.id} href="#" className="flex gap-4 group items-center">
                                            <div className="w-16 h-16 relative rounded-xl overflow-hidden shrink-0 shadow-sm border border-[#F4F4EB]">
                                                <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="text-sm font-black text-[#21492F] group-hover:text-green-600 transition-colors leading-tight">
                                                    {idx + 1}. {item.title}
                                                </h3>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Blog Section (Slider) */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <BlogSlider />
                </div>
            </section>
        </div>
    );
}
