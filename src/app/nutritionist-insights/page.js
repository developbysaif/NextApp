"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ChevronRight,
    Home,
    User,
    ArrowRight,
    Tag,
    Clock,
    Sprout
} from 'lucide-react';
import Navbar from '@/component/Navbar';
import Footer from '@/component/Footer';

export default function NutritionistInsightsPage() {
    const articles = [
        {
            id: 1,
            title: "The Power of Pomegranates for Heart Health",
            excerpt: "The power of powdered engine for pomegranates for heart health, hired health.",
            author: "Dr. Ayesha Khan",
            date: "Oct 24, 2024",
            image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 2,
            title: "Understanding AI Diet Plans: A Beginner's Guide",
            excerpt: "Understating AI Diet Plans views a understating of how weights meat distributed.",
            author: "Dr. Ayesha Khan",
            date: "Oct 24, 2024",
            image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 3,
            title: "Top 5 Organic Superfoods",
            excerpt: "Top 5 organic superfoods in an informative organic fresh and organic center modern arts.",
            author: "Dr. Ayesha Khan",
            date: "Oct 24, 2024",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 4,
            title: "Unlocking Energy with Complex Carbs",
            excerpt: "Unlocking energy with complex carbs in the medical north with nutritious consciousness.",
            author: "Dr. Ayesha Khan",
            date: "Oct 24, 2024",
            image: "https://images.unsplash.com/photo-1510629954389-c1e0da47d414?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 5,
            title: "Mindful Eating for Better Digestion",
            excerpt: "Mindful Eating for Better Digestion, enabling emerge health nutrition minds and of sour team.",
            author: "Dr. Ayesha Khan",
            date: "Oct 24, 2024",
            image: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 6,
            title: "Navigating Food Allergies",
            excerpt: "Navigating food allergies, navigating food allergies, an aspects food allergen awareness.",
            author: "Dr. Ayesha Khan",
            date: "Oct 24, 2024",
            image: "https://images.unsplash.com/photo-1511688858344-1854ef248231?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 7,
            title: "Hydration: The Foundation of Vitality",
            excerpt: "Hydration: the foundation of vitality to understand and vitality hydration.",
            author: "Dr. Ayesha Khan",
            date: "Oct 24, 2024",
            image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 8,
            title: "The Gut-Brain Connection",
            excerpt: "The Gut-Brain connection an interaction nutrition coach or practitioners existing the Gut.",
            author: "Dr. Ayesha Khan",
            date: "Oct 24, 2024",
            image: "https://images.unsplash.com/photo-1515023115689-589c33041d3c?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 9,
            title: "Optimal Pre-Workout Nutrition",
            excerpt: "Optimal Pre-Workout nutrition to meet the convenience of explaining workout nutrition.",
            author: "Dr. Ayesha Khan",
            date: "Oct 24, 2024",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
        }
    ];

    const experts = Array(4).fill({
        name: "Dr. Ayesha Khan",
        role: "Nutritionist",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=100&auto=format&fit=crop"
    });

    const tags = ["Organic", "Weight Loss", "Gut Health", "AI Diet", "Superfoods"];

    return (
        <div className="min-h-screen bg-[#FDFCF8] text-[#2A231C] font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop"
                    alt="Nutritionist Insights Hero"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>

                <div className="container mx-auto px-6 h-full flex flex-col items-center justify-center relative z-10 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-serif font-black mb-4 tracking-tight drop-shadow-md">
                            Nutritionist Insights
                        </h1>
                        <p className="text-white/90 text-lg font-medium max-w-lg mx-auto leading-relaxed mb-8 drop-shadow-sm">
                            Discover the latest medical insights in this field.
                        </p>

                        <div className="inline-flex items-center gap-2 bg-white/95 px-6 py-2.5 rounded-full text-xs font-bold text-[#142A1D] shadow-xl">
                            <Link href="/" className="hover:text-[#22AA4F] transition-colors flex items-center gap-1.5">
                                <Home size={14} /> Home
                            </Link>
                            <ChevronRight size={14} className="text-[#D1D9CA]" />
                            <span className="text-[#8D9F91]">Nutritionist Insights</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="container mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* Articles Grid */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {articles.map((article, index) => (
                                <motion.div
                                    key={article.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#F4F4EB] flex flex-col h-full"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={article.image}
                                            alt={article.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-sm font-bold text-[#142A1D] mb-3 leading-snug group-hover:text-[#22AA4F] transition-colors line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-[#4F5E4B] text-[11px] leading-relaxed mb-6 flex-1 line-clamp-2">
                                            {article.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-[#F8F6EF]">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full overflow-hidden border border-[#D1D9CA]">
                                                    <Image src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=32&h=32&auto=format&fit=crop" alt={article.author} width={24} height={24} className="object-cover" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] font-bold text-[#142A1D] uppercase tracking-wide leading-none">{article.author}</span>
                                                    <span className="text-[8px] text-[#8D9F91] font-medium leading-none mt-1">{article.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-10">

                        {/* Featured Experts */}
                        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-[#F4F4EB]">
                            <h3 className="text-lg font-serif font-black text-[#142A1D] mb-8">Featured Experts</h3>
                            <div className="space-y-6">
                                {experts.map((expert, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#F4F4EB] shadow-sm">
                                            <Image src={expert.image} alt={expert.name} width={48} height={48} className="object-cover group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-[#142A1D] leading-none mb-1">{expert.name}</h4>
                                            <p className="text-[10px] text-[#8D9F91] font-bold uppercase tracking-wider">{expert.role}</p>
                                        </div>
                                        <Link href="#" className="text-[10px] font-bold text-[#22AA4F] hover:underline uppercase tracking-widest leading-none">
                                            View Profile
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Popular Tags */}
                        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-[#F4F4EB]">
                            <h3 className="text-lg font-serif font-black text-[#142A1D] mb-8">Most Popular Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, i) => (
                                    <Link
                                        key={i}
                                        href="#"
                                        className="px-4 py-2 bg-[#F4F4EB] hover:bg-[#22AA4F] hover:text-white rounded-full text-[10px] font-bold text-[#142A1D] uppercase tracking-widest transition-all shadow-sm"
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
