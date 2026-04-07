"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Calendar, User, Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const STATIC_NEWS = [
    {
        id: "1",
        slug: "healthy-eating-habits",
        title: "Healthy Eating Habits for a Better Life",
        excerpt:
            "Learn how small, consistent changes in your daily diet can lead to a long-term improvement in your health and vitality...",
        date: "17 May 2025",
        author: "Nashid Martines",
        image: "/images/millet_upma.png",
        category: "Nutrition"
    },
    {
        id: "2",
        slug: "balanced-daily-nutrition",
        title: "Discover the Power of Balanced Daily Nutrition",
        excerpt:
            "A balanced plate is the cornerstone of wellness. Here is how you can ensure you are getting all the essential macro and micronutrients...",
        date: "17 May 2025",
        author: "Nashid Martines",
        image: "/images/millet_upma.png",
        category: "Vitality"
    }
];

export default function NewsUpdate() {
    const [posts, setPosts] = useState(STATIC_NEWS);

    useEffect(() => {
        // Integrate with localStorage for "Admin" posts
        const savedPosts = JSON.parse(localStorage.getItem("news_posts") || "[]");
        if (savedPosts.length > 0) {
            setPosts([...savedPosts, ...STATIC_NEWS]);
        }
    }, []);

    return (
        <div className="bg-[#fcfdfa] pb-32 font-sans overflow-hidden">
            <section className="max-w-7xl mx-auto px-6 py-20 relative">
                {/* Decorative background leaf */}
                <div className="absolute -top-10 -right-20 opacity-5 pointer-events-none">
                    <Bookmark size={400} className="text-[#214a32] rotate-12" strokeWidth={1} />
                </div>

                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16 relative z-10">
                    <div className="max-w-2xl">
                        <p className="text-[#214a32] font-black uppercase tracking-[0.4em] text-[10px] mb-4 flex items-center gap-2">
                             OUR INSIGHTS <span className="w-10 h-[2px] bg-[#214a32]"></span>
                        </p>
                        <h2 className="text-4xl md:text-6xl font-black text-[#214a32] leading-tight uppercase tracking-tight">
                            News And <span className="text-[#214a32]">Health Update</span>
                        </h2>
                    </div>

                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#214a32] hover:text-[#1f7f3b] bg-white px-8 py-4 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all border border-gray-50 group"
                    >
                        View All Articles
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 relative z-10">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-white rounded-[3.5rem] overflow-hidden border border-gray-50 shadow-[0_32px_80px_rgba(33,73,47,0.06)] group hover:shadow-[0_45px_100px_rgba(33,73,47,0.1)] transition-all duration-500 h-full flex flex-col hover:-translate-y-2"
                        >
                            <Link href={`/news/${post.slug || post.id}`} className="block relative h-72 w-full overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-[#214a32] shadow-sm border border-white/50">
                                        {post.category || "News"}
                                    </span>
                                </div>
                            </Link>

                            <div className="p-8 md:p-10 flex-1 flex flex-col">
                                <Link href={`/news/${post.slug || post.id}`}>
                                    <h3 className="text-xl md:text-2xl font-black text-[#214a32] mb-4 uppercase tracking-tighter leading-tight group-hover:text-[#214a32] transition-colors">
                                        {post.title}
                                    </h3>
                                </Link>

                                <p className="text-[15px] text-[#54654a] font-medium leading-relaxed mb-8 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="size-10 bg-[#214a32] rounded-2xl flex items-center justify-center text-white font-black text-sm relative shrink-0">
                                            {post.author.charAt(0)}
                                            <div className="absolute -top-1 -right-1 bg-green-500 border-2 border-white rounded-full p-0.5">
                                                 <div className="size-1.5 rounded-full bg-white"></div>
                                            </div>
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-[11px] font-black text-[#214a32] uppercase tracking-tight truncate">{post.author}</p>
                                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate">{post.date}</p>
                                        </div>
                                    </div>

                                    <Link href={`/news/${post.slug || post.id}`} className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4f5ee] text-[#214a32] transition-all hover:bg-[#214a32] hover:text-white hover:rotate-12 group-hover:bg-[#214a32] group-hover:text-white">
                                        <ArrowRight size={22} />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}
