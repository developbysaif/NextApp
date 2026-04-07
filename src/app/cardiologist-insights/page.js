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
    Heart,
    Activity,
    Stethoscope
} from 'lucide-react';
import BlogSlider from '@/component/BlogSlider';
export default function CardiologistInsightsPage() {
    const [blogs, setBlogs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('/api/blogs');
                const result = await res.json();
                if (result.success) {
                    setBlogs(result.data.filter(b => b.category === 'Cardiologist Insights'));
                }
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchBlogs();
    }, []);

    const cardiologists = [
        { name: "Dr. Smith", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=100&auto=format&fit=crop" },
        { name: "Dr. Jane", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=100&auto=format&fit=crop" },
        { name: "Dr. Allen", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=100&auto=format&fit=crop" }
    ];

    return (
        <div className="min-h-screen bg-[#FDFCF8] text-[#2A231C] font-sans">
            {/* Hero Section */}
            <section className="relative w-full pt-12 md:pt-20 pb-20 md:pb-32 overflow-hidden bg-[#F4F4EB]">
                {/* Decorative Elements (Floating Icons/Images) */}
                <div className="absolute top-10 left-10 opacity-20 hidden lg:block animate-pulse">
                    <Heart size={48} className="text-[#A13124]" strokeWidth={1.5} />
                </div>
                <div className="absolute bottom-10 right-20 opacity-20 hidden lg:block animate-bounce">
                    <Stethoscope size={56} className="text-[#214a32]" strokeWidth={1} />
                </div>
                <div className="absolute top-20 right-10 opacity-15 hidden lg:block">
                    <div className="w-40 h-40 rounded-full shadow-2xl border-4 border-white overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Pulse" />
                    </div>
                </div>
                <div className="absolute bottom-20 left-10 opacity-15 hidden lg:block">
                    <div className="w-32 h-32 rounded-full shadow-2xl border-4 border-white overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1512103143424-3406e1cc815d?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Herbs" />
                    </div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto bg-white/60 backdrop-blur-md p-10 md:p-16 rounded-[60px] border border-white shadow-2xl relative"
                    >
                        {/* More Floating Mini Icons */}
                        <div className="absolute -top-6 -left-6 bg-white p-4 rounded-3xl shadow-lg border border-[#F4F4EB]">
                            <Activity className="text-[#E15B3A]" size={24} />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-3xl shadow-lg border border-[#F4F4EB]">
                            <Heart className="text-[#214a32]" size={24} />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif font-black text-[#142A1D] mb-4 tracking-tight">
                            Cardiologist Insights
                        </h1>
                        <p className="text-[#4F5E4B] text-lg font-medium max-w-lg mx-auto leading-relaxed mb-8">
                            Medical advice from certified cardiologists rooted in natural wisdom.
                        </p>

                        <div className="inline-flex items-center gap-2 bg-white/80 px-6 py-2 rounded-full text-xs font-bold text-[#142A1D] border border-white shadow-sm">
                            <Link href="/" className="hover:text-[#214a32] transition-colors flex items-center gap-1.5">
                                <Home size={14} /> Home
                            </Link>
                            <ChevronRight size={14} className="text-[#D1D9CA]" />
                            <span className="text-[#8D9F91]">Cardiologist Insights</span>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Wave/Gradient transition */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#FDFCF8] to-transparent"></div>
            </section>

            {/* Main Content */}
            <section className="container mx-auto px-6 py-12 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* Articles Section */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl md:text-4xl font-serif font-black text-[#142A1D]">Articles</h2>
                            <div className="h-0.5 flex-1 mx-8 bg-gradient-to-r from-[#D1D9CA] to-transparent hidden md:block"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                            {loading ? (
                                <div className="col-span-full py-20 flex justify-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#142A1D]"></div>
                                </div>
                            ) : blogs.length > 0 ? (
                                blogs.map((article, index) => (
                                    <motion.div
                                        key={article._id || index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#F4F4EB] flex flex-col h-full"
                                    >
                                        <div className="relative h-60 overflow-hidden bg-gray-50">
                                            <img
                                                src={article.image || "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800&auto=format&fit=crop"}
                                                alt={article.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                onError={(e) => { e.target.src = '/placeholder.png'; }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>

                                        <div className="p-8 flex flex-col flex-1">
                                            <h3 className="text-xl font-serif font-bold text-[#142A1D] mb-4 leading-snug group-hover:text-[#214a32] transition-colors line-clamp-2 uppercase tracking-tight">
                                                {article.title}
                                            </h3>
                                            <p className="text-[#4F5E4B] text-sm leading-relaxed mb-6 flex-1 line-clamp-3 font-medium">
                                                {article.description}
                                            </p>

                                            <div className="flex items-center justify-between pt-6 border-t border-[#F8F6EF]">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D1D9CA] bg-gray-50 flex items-center justify-center">
                                                        <User size={16} className="text-gray-300" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[11px] font-bold text-[#142A1D] uppercase tracking-wide">Expert Insight</span>
                                                    </div>
                                                </div>
                                                <Link href={`/blogs/${article.slug}`} className="w-8 h-8 rounded-full bg-[#F4F4EB] flex items-center justify-center text-[#142A1D] hover:bg-[#214a32] hover:text-white transition-all shadow-sm">
                                                    <ArrowRight size={14} />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full p-20 text-center bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                                    <h3 className="text-xl font-bold text-[#142A1D] opacity-40 uppercase tracking-widest">No Insights Available Yet</h3>
                                    <p className="text-sm font-bold text-gray-400 mt-2 italic">New articles will appear here once published from the admin panel.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-12">

                        {/* Meet Doctors */}
                        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-[#F4F4EB]">
                            <h3 className="text-xl font-serif font-bold text-[#142A1D] mb-8">Meet Our Cardiologists</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-4">
                                    {cardiologists.map((doc, i) => (
                                        <div key={i} className="w-14 h-14 rounded-full border-4 border-white overflow-hidden shadow-lg relative group">
                                            <Image src={doc.img} alt={doc.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                                        </div>
                                    ))}
                                    <div className="w-14 h-14 rounded-full border-4 border-white bg-[#F4F4EB] flex items-center justify-center text-[#142A1D] shadow-lg cursor-pointer hover:bg-[#214a32] hover:text-white transition-all">
                                        <ChevronRight size={20} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-1.5 mt-8 justify-center">
                                <div className="w-2 h-2 rounded-full bg-[#142A1D]"></div>
                                <div className="w-2 h-2 rounded-full bg-[#D1D9CA]"></div>
                                <div className="w-2 h-2 rounded-full bg-[#D1D9CA]"></div>
                            </div>
                        </div>

                        {/* Popular Topics */}
                        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-[#F4F4EB]">
                            <h3 className="text-xl font-serif font-bold text-[#142A1D] mb-8">Most Popular Topics</h3>
                            <ul className="space-y-5">
                                {[
                                    "Managing Hypertension with Ayurvedic Herbs",
                                    "AI Diet Plans",
                                    "Book appointment",
                                    "Doctor Portal",
                                    "Health Blogs",
                                    "Contact Us"
                                ].map((topic, i) => (
                                    <li key={i}>
                                        <Link href="#" className="group flex items-center justify-between text-sm font-bold text-[#4F5E4B] hover:text-[#214a32] transition-colors">
                                            <span className="leading-tight">{topic}</span>
                                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#214a32]" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Filter Section */}
                        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-[#F4F4EB]">
                            <h3 className="text-xl font-serif font-bold text-[#142A1D] mb-8">Filter by Topic</h3>
                            <div className="relative">
                                <select className="w-full bg-[#F4F4EB] border-2 border-transparent rounded-2xl px-6 py-4 text-sm font-bold text-[#142A1D] appearance-none focus:bg-white focus:border-[#214a32] outline-none transition-all shadow-inner">
                                    <option>All Topic</option>
                                    <option>Hypertension</option>
                                    <option>Diet</option>
                                    <option>Herbal Medicine</option>
                                </select>
                                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#8D9F91] pointer-events-none" size={18} />
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

function ChevronDown({ className, size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M6 9l6 6 6-6" />
        </svg>
    );
}
