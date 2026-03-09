"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, Clock, ChevronRight } from 'lucide-react';

const CAT_COLORS = {
    Disease: '#22aa4f', Superfood: '#e67e22', Health: '#2980b9',
    Herbal: '#8e44ad', Nutrition: '#c0392b', Sunnah: '#d4a017', Lifestyle: '#16a085',
};

export default function BlogSlider() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        fetch('/api/blogs')
            .then(r => r.json())
            .then(d => { if (d.success) setBlogs(d.data.filter(b => b.published !== false)); })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);


    const visibleCards = 3;
    const maxIndex = Math.max(0, blogs.length - visibleCards);

    const goNext = useCallback(() => {
        setCurrent(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, [maxIndex]);

    const goPrev = () => {
        setCurrent(prev => (prev <= 0 ? maxIndex : prev - 1));
    };

    useEffect(() => {
        if (!isHovered && blogs.length > visibleCards) {
            intervalRef.current = setInterval(goNext, 5000);
        }
        return () => clearInterval(intervalRef.current);
    }, [isHovered, goNext, blogs.length]);

    return (
        <section className="relative overflow-hidden rounded-3xl" style={{ background: 'linear-gradient(135deg, #1a3a25 0%, #21492f 50%, #1e3d28 100%)' }}>
            {/* Organic Background Patterns */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <svg className="absolute -top-32 -right-32 w-[500px] h-[500px] opacity-[0.06]" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="250" cy="250" r="250" fill="white" />
                </svg>
                <svg className="absolute -top-10 -left-10 w-56 h-72 opacity-[0.07]" viewBox="0 0 200 300" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 120 300 C 120 250 140 150 150 50" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" />
                    <path d="M 128 250 C 60 230 30 200 40 150 C 80 150 110 190 135 220" />
                    <path d="M 140 180 C 70 160 20 120 30 70 C 70 70 110 120 145 150" />
                    <path d="M 132 230 C 180 220 200 190 190 140 C 160 140 140 170 138 200" />
                </svg>
                <svg className="absolute bottom-0 left-0 w-full opacity-[0.05]" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" fill="white" />
                </svg>
                <svg className="absolute -bottom-16 -right-16 w-72 h-72 opacity-[0.05]" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="150" cy="150" r="150" fill="white" />
                </svg>
            </div>

            <div className="relative z-10 p-6 md:p-10">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                        <span className="text-[#4ade80] font-black text-[10px] tracking-[0.25em] uppercase mb-3 block">
                            Wisdom of Nature
                        </span>
                        <h2 className="text-white text-2xl md:text-4xl font-black leading-tight mb-2">
                            Knowledge That <span className="text-[#4ade80]">Nurtures Life</span>
                        </h2>
                        <p className="text-white/50 text-sm font-medium italic">
                            Qudrati ghiza aur sehatmand zindagi ka raaz
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black text-xs uppercase tracking-widest px-5 py-3 rounded-xl transition-all whitespace-nowrap backdrop-blur-md group"
                    >
                        View Knowledge
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Loading Skeleton */}
                {loading ? (
                    <div className="grid grid-cols-3 gap-5">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="rounded-[20px] overflow-hidden bg-white/5 animate-pulse">
                                <div className="aspect-[16/10] bg-white/10" />
                                <div className="p-4 space-y-2">
                                    <div className="h-3 bg-white/10 rounded w-3/4" />
                                    <div className="h-2 bg-white/10 rounded w-full" />
                                    <div className="h-2 bg-white/10 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : blogs.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-16 border-2 border-dashed border-white/10 rounded-3xl">
                        <p className="text-white/40 font-black text-xs uppercase tracking-widest mb-2">No Blogs Published Yet</p>
                        <Link href="/admin/blogs" className="text-[#4ade80] text-xs font-bold underline">Write your first blog →</Link>
                    </div>
                ) : (
                    /* Slider Container */
                    <div
                        className="relative"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Left Arrow */}
                        <button
                            onClick={goPrev}
                            className={`absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 shadow-lg text-[#21492f] hover:bg-white transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                        >
                            <ArrowLeft size={18} />
                        </button>

                        {/* Cards Track */}
                        <div className="overflow-hidden">
                            <div
                                className="flex gap-5 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                style={{ transform: `translateX(calc(-${current * (100 / visibleCards)}% - ${current * 20 / visibleCards}px))` }}
                            >
                                {blogs.map((post) => (
                                    <Link
                                        key={post._id}
                                        href={`/blog/${post.slug}`}
                                        className="flex-shrink-0 group/card"
                                        style={{ width: `calc(${100 / visibleCards}% - ${(visibleCards - 1) * 20 / visibleCards}px)` }}
                                    >
                                        <div className="rounded-[20px] overflow-hidden bg-white/10 backdrop-blur-md border border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500">
                                            {/* Image */}
                                            <div className="relative w-full aspect-[16/10] overflow-hidden">
                                                <Image
                                                    src={post.image || '/header.jpg'}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover group-hover/card:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                                <span
                                                    className="absolute top-3 left-3 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md"
                                                    style={{ backgroundColor: CAT_COLORS[post.category] || '#22aa4f' }}
                                                >
                                                    {post.category || 'Blog'}
                                                </span>
                                                <span className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white/90 text-[9px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full flex items-center gap-1.5">
                                                    <Clock size={9} />
                                                    {post.readTime || '5 min read'}
                                                </span>
                                            </div>

                                            {/* Card Body */}
                                            <div className="p-4">
                                                <h3 className="text-white font-black text-sm md:text-base leading-snug mb-1.5 group-hover/card:text-[#4ade80] transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <p className="text-white/50 text-xs font-medium italic leading-relaxed mb-3 line-clamp-2">
                                                    {post.description}
                                                </p>
                                                <div className="flex items-center gap-1.5 text-[#4ade80] font-black text-[10px] uppercase tracking-widest group-hover/card:gap-3 transition-all">
                                                    Explore
                                                    <ArrowRight size={11} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={goNext}
                            className={`absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 shadow-lg text-[#21492f] hover:bg-white transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                        >
                            <ArrowRight size={18} />
                        </button>
                    </div>
                )}

                {/* Dots */}
                {!loading && blogs.length > visibleCards && (
                    <div className="flex items-center justify-center gap-2 mt-6">
                        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`transition-all duration-300 rounded-full ${current === i ? 'w-6 h-2 bg-[#4ade80]' : 'w-2 h-2 bg-white/25 hover:bg-white/50'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
