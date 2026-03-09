"use client";

import React, { useState, useEffect, use } from 'react';
import { Facebook, Twitter, Linkedin, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogPostDetail({ params }) {
    const { slug } = use(params);
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = () => {
            const allBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
            const foundBlog = allBlogs.find(b => b.slug === slug);
            setBlog(foundBlog);
            setLoading(false);
        };
        fetchBlog();
    }, [slug]);

    if (loading) {
        return <div className="min-h-screen bg-[#21492f] flex items-center justify-center font-bold text-white uppercase tracking-widest text-sm italic">Loading Insight...</div>;
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-[#21492f] flex items-center justify-center p-6 text-center text-white">
                <div>
                    <h1 className="text-4xl font-outfit font-black mb-4">Article Not Found</h1>
                    <Link href="/blogs" className="inline-flex items-center gap-2 text-[#22aa4f] font-bold uppercase tracking-widest text-xs hover:underline">
                        <ArrowLeft size={16} /> Back to Insights
                    </Link>
                </div>
            </div>
        );
    }

    const recommendedProducts = [
        {
            id: 1,
            name: "Premium Honey & Ginger Blend",
            price: "$19.00",
            image: "/P1.png"
        },
        {
            id: 2,
            name: "Organic Herbal Roots",
            price: "$33.00",
            image: "/P2.png"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2f5c40] via-[#21492f] to-[#1a3824] pt-32 pb-24 font-sans text-white">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* Main Content Column */}
                    <div className="lg:col-span-8 flex flex-col pt-4">
                        {/* Title - Using a serif/elegant style similar to image */}
                        <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-serif font-medium text-[#f3f5f4] leading-[1.1] mb-10 tracking-tight">
                            {blog.title || "7 surprising health benefits of medicinal mushrooms"}
                        </h1>

                        {/* Share Row */}
                        <div className="flex items-center gap-6 mb-16">
                            <span className="text-[#d1dbd4] font-medium text-lg tracking-wide">Share</span>
                            <div className="flex items-center gap-2.5">
                                {[Facebook, Twitter, Linkedin, Mail].map((Icon, i) => (
                                    <button
                                        key={i}
                                        className="flex items-center justify-center w-10 h-10 bg-[#113521] hover:bg-[#0c2617] text-[#e8eee9] rounded-[4px] transition-colors shadow-sm"
                                        aria-label="Share"
                                    >
                                        <Icon size={18} strokeWidth={2} className={i !== 3 ? "fill-current" : ""} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden mb-16 shadow-2xl bg-[#1a3824]">
                            <img
                                src={blog.featuredImage || "/header.jpg"}
                                alt={blog.title || "Blog cover"}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Content */}
                        <div className="prose prose-lg prose-invert max-w-none prose-p:text-[#c4d1c9] prose-p:leading-relaxed prose-headings:text-white prose-a:text-[#22aa4f] prose-strong:text-white">
                            <div className="whitespace-pre-line text-lg md:text-xl font-medium">
                                {blog.content || "Medicinal mushrooms have been used for thousands of years in traditional medicine. Modern science is finally catching up with ancient wisdom..."}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Products Column */}
                    <div className="lg:col-span-4 lg:pt-6 flex flex-col gap-6 items-center lg:items-end">
                        <div className="w-full max-w-[340px] flex flex-col gap-6">
                            {recommendedProducts.map((product) => (
                                <div key={product.id} className="bg-white p-6 shadow-2xl group border border-transparent hover:border-[#22aa4f]/20 transition-all rounded-[2px] w-full">
                                    <div className="bg-[#e8ebec] aspect-square w-full mb-6 relative overflow-hidden flex items-center justify-center p-8 rounded-[2px]">
                                        {/* Using span for fallback to prevent next/image issues if path is broken, though Image works best if P1.png exists */}
                                        <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-contain drop-shadow-md"
                                            />
                                        </div>
                                    </div>

                                    <h3 className="text-[1.35rem] font-bold text-[#1a1c1a] mb-3 leading-snug tracking-tight">
                                        {product.name}
                                    </h3>

                                    <p className="text-[#3c3e3c] font-medium text-base mb-6">
                                        {product.price}
                                    </p>

                                    <button className="w-full bg-[#113521] text-white py-3.5 font-bold hover:bg-[#0c2617] transition-colors flex items-center justify-center rounded-[2px] shadow-sm tracking-wide">
                                        Add to cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
