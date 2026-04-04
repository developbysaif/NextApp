
"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, User, Calendar, Share2, Facebook, Twitter, Link as LinkIcon, ArrowRight } from "lucide-react";
import Link from 'next/link';

// Mock data (in a real app, this would come from a database/API)
const NEWS_POSTS = [
    {
        id: "1",
        slug: "healthy-eating-habits",
        title: "Healthy Eating Habits for a Better Life",
        content: `
            <p>Maintaining a healthy diet is one of the most important things you can do for your overall well-being. It is not just about losing weight; it is about fueling your body with the nutrients it needs to function optimally.</p>
            <h3>The Importance of Whole Foods</h3>
            <p>Whole foods such as fruits, vegetables, whole grains, and lean proteins should form the foundation of your diet. These foods are naturally rich in vitamins, minerals, and antioxidants that protect your cells from damage.</p>
            <h3>Hydration is Key</h3>
            <p>Water is essential for every process in your body. Aim for at least 8 glasses a day to keep your energy levels up and your digestion smooth.</p>
            <h3>Sustainability Over Perfection</h3>
            <p>Don't strive for a perfect diet overnight. Small, consistent changes are more likely to stick and lead to long-term success.</p>
        `,
        date: "17 May 2025",
        author: "Nashid Martines",
        image: "/images/millet_upma.png",
        category: "Nutrition"
    },
    // Add more if needed
];

export default function NewsDetail() {
    const { slug } = useParams();
    const router = useRouter();
    
    // Find post in static data or localStorage
    let post = NEWS_POSTS.find(p => p.slug === slug || p.id === slug);
    
    if (!post) {
        // Fallback to localStorage (where admin/doctor posts are saved)
        const savedPosts = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem("news_posts") || "[]" : "[]");
        post = savedPosts.find(p => p.slug === slug || p.id === slug);
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfdfa]">
                <h1 className="text-4xl font-black text-[#21492f] mb-4">Post Not Found</h1>
                <Link href="/" className="px-8 py-4 bg-[#22aa4f] text-white rounded-full font-black uppercase tracking-widest hover:bg-[#21492f] transition-all">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfdfa] pb-24">
            {/* Header / Hero */}
            <header className="bg-white border-b border-gray-100 py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 text-[#22aa4f] font-black uppercase tracking-[0.2em] text-[10px] mb-8 hover:translate-x-[-4px] transition-transform">
                        <ArrowLeft size={16} /> Back to Updates
                    </Link>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-[#ebf7ed] text-[#22aa4f] px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest border border-[#d6edd5]">
                            {post.category || "News"}
                        </span>
                        <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                            <Calendar size={14} /> {post.date}
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-[#21492f] leading-[1.1] mb-10 uppercase tracking-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-between gap-8 pt-8 border-t border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-[#21492f] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Written by</p>
                                <p className="text-lg font-black text-[#21492f] uppercase tracking-tight">{post.author}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-400 hover:text-[#22aa4f]">
                                <Facebook size={20} />
                            </button>
                            <button className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-400 hover:text-[#22aa4f]">
                                <Twitter size={20} />
                            </button>
                            <button className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-400 hover:text-[#22aa4f]">
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Feature Image */}
            <div className="max-w-6xl mx-auto px-6 -mt-10 mb-20 relative z-10">
                <div className="aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                    <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                    />
                </div>
            </div>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-6">
                <div 
                    className="prose prose-xl max-w-none prose-headings:text-[#21492f] prose-headings:font-black prose-p:text-gray-600 prose-p:font-medium prose-p:leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
                />

                {/* Tags / Footer */}
                <div className="mt-20 pt-10 border-t border-gray-100 flex flex-wrap gap-4">
                    {["Healthy", "Lifestyle", "Nutrition", "Wellness"].map(tag => (
                        <span key={tag} className="px-6 py-2 bg-[#f4f5ee] text-[#21492f] rounded-2xl text-[10px] font-black uppercase tracking-widest border border-transparent hover:border-[#22aa4f]/20 transition-all">
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Newsletter Box */}
                <div className="mt-24 p-10 md:p-14 bg-[#21492f] rounded-[4rem] text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#22aa4f] rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] opacity-20 transition-opacity group-hover:opacity-40"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6">Stay updated with <br /> our latest health news</h2>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input 
                                type="email" 
                                placeholder="Enter your email address" 
                                className="flex-1 bg-white/10 border border-white/20 rounded-[2rem] px-8 py-5 text-lg font-medium focus:outline-none focus:bg-white/20 transition-all placeholder:text-white/40"
                            />
                            <button className="bg-[#22aa4f] hover:bg-[#1f933f] text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3">
                                Subscribe Now <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
