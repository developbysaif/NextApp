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
import BlogSlider from '@/component/BlogSlider';

export default function NutritionistInsightsPage() {
    const [blogs, setBlogs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('/api/blogs');
                const result = await res.json();
                if (result.success) {
                    setBlogs(result.data.filter(b => b.category === 'Nutritionist Insights'));
                }
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchBlogs();
    }, []);

    const experts = Array(4).fill({
        name: "Dr. Ayesha Khan",
        role: "Nutritionist",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=100&auto=format&fit=crop"
    });

    const tags = ["Organic", "Weight Loss", "Gut Health", "AI Diet", "Superfoods"];

    return (
        <div className="min-h-screen bg-[#FDFCF8] text-[#2A231C] font-sans">
            {/* Hero Section */}
            <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-[#142A1D]">
                <img
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop"
                    alt="Nutritionist Hero"
                    className="w-full h-full object-cover opacity-60"
                    onError={(e) => { e.target.src = '/header.jpg'; e.target.style.opacity = '0.4'; }}
                />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>

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
                            <Link href="/" className="hover:text-[#214a32] transition-colors flex items-center gap-1.5">
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
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#142A1D]"></div>
                            </div>
                        ) : blogs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {blogs.map((article, index) => (
                                    <Link
                                        key={article._id || index}
                                        href={`/blogs/${article.slug}`}
                                        className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#F4F4EB] flex flex-col h-full"
                                    >
                                        <div className="relative h-48 overflow-hidden bg-gray-50">
                                            <img
                                                src={article.image || "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop"}
                                                alt={article.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                onError={(e) => { e.target.src = '/placeholder.png'; }}
                                            />
                                        </div>

                                        <div className="p-6 flex flex-col flex-1">
                                            <h3 className="text-sm font-bold text-[#142A1D] mb-3 leading-snug group-hover:text-[#214a32] transition-colors line-clamp-2 uppercase tracking-tight">
                                                {article.title}
                                            </h3>
                                            <p className="text-[#4F5E4B] text-[11px] leading-relaxed mb-6 flex-1 line-clamp-3 font-medium">
                                                {article.description}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-[#F8F6EF]">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full overflow-hidden border border-[#D1D9CA] bg-gray-50 flex items-center justify-center">
                                                        <User size={12} className="text-gray-300" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] font-black text-[#142A1D] uppercase tracking-wide leading-none">Expert Insight</span>
                                                    </div>
                                                </div>
                                                <ArrowRight size={14} className="text-[#214a32] group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="p-20 text-center bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                                <h3 className="text-xl font-bold text-[#142A1D] opacity-40 uppercase tracking-widest">No Insights Available Yet</h3>
                                <p className="text-sm font-bold text-gray-400 mt-2 italic">New articles will appear here once published from the admin panel.</p>
                            </div>
                        )}
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
                                        <Link href="#" className="text-[10px] font-bold text-[#214a32] hover:underline uppercase tracking-widest leading-none">
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
                                        className="px-4 py-2 bg-[#F4F4EB] hover:bg-[#214a32] hover:text-white rounded-full text-[10px] font-bold text-[#142A1D] uppercase tracking-widest transition-all shadow-sm"
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Blog Section (Slider) */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <BlogSlider />
                </div>
            </section>
        </div>
    );
}
