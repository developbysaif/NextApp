"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ChevronRight,
    Home,
    Search,
    Calendar,
    User,
    Clock,
    ArrowRight,
    ShieldCheck,
    Sparkles,
    Leaf,
    Droplets,
    Wind,
    ArrowUpRight
} from 'lucide-react';
import BlogSlider from '@/component/BlogSlider';

export default function DermatologistInsightsPage() {
    const [blogs, setBlogs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('/api/blogs');
                const result = await res.json();
                if (result.success) {
                    setBlogs(result.data.filter(b => b.category === 'Dermatologist Insights'));
                }
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchBlogs();
    }, []);

    const specializations = [
        {
            title: "Natural Acne Management",
            icon: <Leaf className="w-8 h-8 text-[#214a32]" />,
            link: "#"
        },
        {
            title: "Natural Sun Protection & Care",
            icon: <ShieldCheck className="w-8 h-8 text-[#214a32]" />,
            link: "#"
        },
        {
            title: "Eczema & Sensitive Skin",
            icon: <Droplets className="w-8 h-8 text-[#214a32]" />,
            link: "#"
        },
        {
            title: "Anti-Aging & Rejuvenation",
            icon: <Sparkles className="w-8 h-8 text-[#214a32]" />,
            link: "#"
        },
        {
            title: "Scalp & Hair Health",
            icon: <Wind className="w-8 h-8 text-[#214a32]" />,
            link: "#"
        }
    ];

    const sidebarInsights = [
        { id: 1, title: "Managing Rosacea Naturally", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=200&auto=format&fit=crop" },
        { id: 2, title: "Understanding Skin Microbiome", img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=200&auto=format&fit=crop" },
        { id: 3, title: "The Diet-Skin Connection", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=200&auto=format&fit=crop" },
        { id: 4, title: "Choosing Non-Toxic Makeup", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=200&auto=format&fit=crop" },
        { id: 5, title: "Post-Sun Care Tips", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=200&auto=format&fit=crop" }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0 bg-[#214a32]">
                    <img
                        src="https://images.unsplash.com/photo-1589927986089-35812388d1f4?q=80&w=2000&auto=format&fit=crop"
                        alt="Background"
                        className="w-full h-full object-cover opacity-50"
                        onError={(e) => { e.target.src = '/header.jpg'; e.target.style.opacity = '0.3'; }}
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                <div className="relative z-10 text-center text-white px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
                    >
                        Dermatologist Insights
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light"
                    >
                        Discover the latest natural-based insights for healthy skin, from acne to anti-aging.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 text-sm"
                    >
                        <Link href="/" className="hover:text-green-300 transition-colors flex items-center gap-1">
                            <Home size={14} /> Home
                        </Link>
                        <ChevronRight size={14} />
                        <span className="font-semibold">Dermatologist Insights</span>
                    </motion.div>
                </div>
            </section>

            {/* Specialization Section */}
            <section className="py-16 bg-[#F8FAF5]">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="bg-[#EFF4E8] rounded-[40px] p-8 md:p-12 border border-[#DBE4D0]">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-2xl font-bold text-[#214a32] uppercase tracking-wider">
                                Dermatologist Specialization
                            </h2>
                            <Link href="#" className="flex items-center gap-1 text-[#214a32] font-semibold hover:underline">
                                View All Specialities <ArrowRight size={18} />
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
                                    <h3 className="text-[#214a32] font-bold text-sm md:text-base mb-4 min-h-[40px] flex items-center justify-center">
                                        {item.title}
                                    </h3>
                                    <button className="text-xs font-bold text-[#214a32] border-b border-[#214a32] pb-1 hover:opacity-70 transition-opacity">
                                        Read Insights
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-10 text-center">
                            <Link href="#" className="text-[#214a32] font-bold border-b-2 border-[#214a32] pb-1 inline-block">
                                View all Recent Blogs
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="pb-24 pt-8 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Blog Posts Column */}
                        <div className="lg:col-span-8 space-y-8">
                            {loading ? (
                                <div className="flex items-center justify-center py-20">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#214a32]"></div>
                                </div>
                            ) : blogs.length > 0 ? (
                                <>
                                    {/* Main Featured Post */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="bg-white rounded-[40px] overflow-hidden border border-[#D1D9CA] shadow-sm group hover:shadow-xl transition-all duration-500"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2">
                                            <div className="relative h-[300px] md:h-full bg-gray-100">
                                                <img
                                                    src={blogs[0].image || "https://images.unsplash.com/photo-1596755384221-56986a5122d4?q=80&w=800&auto=format&fit=crop"}
                                                    alt="Featured"
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                    onError={(e) => { e.target.src = '/placeholder.png'; }}
                                                />
                                                <div className="absolute top-4 left-4 bg-[#214a32] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                                    Latest
                                                </div>
                                            </div>
                                            <div className="p-8 md:p-10 flex flex-col justify-center">
                                                <h2 className="text-2xl md:text-3xl font-bold text-[#214a32] mb-4 leading-tight uppercase">
                                                    {blogs[0].title}
                                                </h2>
                                                <p className="text-[#4F5E4B] text-sm leading-relaxed mb-6 line-clamp-3">
                                                    {blogs[0].description}
                                                </p>
                                                <div className="flex items-center gap-3 mb-8">
                                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#EFF4E8] bg-gray-50 flex items-center justify-center">
                                                        <User size={20} className="text-gray-300" />
                                                    </div>
                                                    <span className="text-sm font-bold text-[#214a32]">Expert Insight</span>
                                                </div>
                                                <Link href={`/blogs/${blogs[0].slug}`} className="w-fit bg-[#EFF4E8] text-[#214a32] font-bold px-6 py-2.5 rounded-full border border-[#D1D9CA] hover:bg-[#214a32] hover:text-white transition-all duration-300 text-center uppercase tracking-widest text-xs">
                                                    Read More
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Secondary Posts Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {blogs.slice(1, 3).map((post, idx) => (
                                            <motion.div
                                                key={post._id || idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="bg-white rounded-[32px] overflow-hidden border border-[#D1D9CA] group hover:shadow-lg transition-all"
                                            >
                                                <div className="flex gap-4 p-4">
                                                    <div className="w-1/3 relative aspect-square rounded-2xl overflow-hidden shrink-0 bg-gray-50">
                                                        <img
                                                            src={post.image || "https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?q=80&w=400&auto=format&fit=crop"}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                            onError={(e) => { e.target.src = '/placeholder.png'; }}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-center py-2 overflow-hidden">
                                                        <h3 className="text-sm font-bold text-[#214a32] mb-1 line-clamp-2 leading-snug uppercase tracking-tight">
                                                            {post.title}
                                                        </h3>
                                                        <p className="text-[10px] text-[#8D9F91] font-bold mb-3">Expert Insight</p>
                                                        <Link href={`/blogs/${post.slug}`} className="text-[#214a32] text-[10px] font-bold border-b border-[#214a32] w-fit uppercase tracking-widest hover:text-[#214a32] transition-colors">
                                                            Read More
                                                        </Link>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="p-20 text-center bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                                    <h3 className="text-xl font-bold text-[#214a32] opacity-40 uppercase tracking-widest">No Insights Available Yet</h3>
                                    <p className="text-sm font-bold text-gray-400 mt-2 italic">New blogs will appear here once published from the admin panel.</p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar Column */}
                        <div className="lg:col-span-4">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-[40px] border border-[#D1D9CA] overflow-hidden"
                            >
                                <div className="p-8 border-b border-[#F4F4EB]">
                                    <h2 className="text-2xl font-bold text-[#214a32]">Top Insights Sidebar</h2>
                                </div>
                                <div className="p-8 space-y-6">
                                    {sidebarInsights.map((item, idx) => (
                                        <Link key={item.id} href="#" className="flex gap-4 group items-center">
                                            <div className="w-16 h-16 relative rounded-xl overflow-hidden shrink-0 shadow-sm border border-[#F4F4EB]">
                                                <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="text-sm font-bold text-[#214a32] group-hover:text-green-600 transition-colors leading-tight">
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
