"use client";

import React, { useState, useEffect, use } from 'react';
import PageHeader from '@/component/PageHeader';
import { BookOpen, User, Clock, ArrowLeft, ShieldCheck, Heart } from 'lucide-react';
import Link from 'next/link';

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
        return <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center font-black text-blue-600 uppercase tracking-widest text-sm italic">Loading Insight...</div>;
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center p-6 text-center">
                <div>
                    <BookOpen size={64} className="mx-auto text-slate-200 mb-6" />
                    <h1 className="text-4xl font-black text-slate-900 uppercase italic mb-4">Blog Not Found</h1>
                    <Link href="/blogs" className="inline-flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-xs hover:underline">
                        <ArrowLeft size={16} /> Back to Insights
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfdfa] pb-24 font-sans">
            <PageHeader
                title={blog.title}
                description={`Written by ${blog.authorName} • ${blog.category}`}
                backgroundImage={blog.featuredImage || "/header.jpg"}
            />

            <article className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
                <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-100 p-10 md:p-16">
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 mb-12 py-6 border-b border-slate-50">
                        <div className="flex items-center gap-3">
                            <div className="size-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black shrink-0 relative">
                                {blog.authorPhoto ? (
                                    <img src={blog.authorPhoto} alt="" className="size-full object-cover rounded-2xl" />
                                ) : (
                                    blog.authorName?.charAt(0)
                                )}
                                <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5 border-2 border-white shadow-sm">
                                    <ShieldCheck size={12} />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{blog.authorName}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Medical Specialist</p>
                            </div>
                        </div>

                        <div className="h-10 w-px bg-slate-100 hidden md:block"></div>

                        <div className="flex items-center gap-3 text-slate-400">
                            <Clock size={18} />
                            <span className="text-xs font-bold uppercase tracking-widest leading-none">5 Min Read</span>
                        </div>

                        <div className="ml-auto">
                            <span className="bg-blue-50 text-blue-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100/50">
                                {blog.category}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-slate prose-lg max-w-none">
                        <div className="text-slate-600 font-bold leading-loose whitespace-pre-line text-lg">
                            {blog.content}
                        </div>
                    </div>

                    {/* Engagement */}
                    <div className="mt-16 pt-12 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-2 bg-slate-50 hover:bg-red-50 hover:text-red-500 px-6 py-3 rounded-2xl transition-all font-black text-xs uppercase tracking-widest text-slate-500">
                                <Heart size={16} /> 24 Helpful
                            </button>
                        </div>
                        <Link href="/blogs" className="text-xs font-black uppercase tracking-widest text-blue-600 hover:underline">
                            Share Insight
                        </Link>
                    </div>
                </div>
            </article>

            {/* Related Blog or Call to action */}
            <div className="max-w-4xl mx-auto px-6 mt-12 bg-blue-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden group">
                <div className="absolute top-0 left-0 size-64 bg-white/5 rounded-full -ml-32 -mt-32 group-hover:scale-110 transition-transform duration-1000"></div>
                <h2 className="text-3xl font-black mb-6 uppercase tracking-tight relative z-10 italic">Consult Our Experts</h2>
                <p className="text-blue-100 font-medium mb-10 max-w-xl mx-auto leading-relaxed relative z-10">
                    Need professional medical advice? Book an appointment with one of our specialized doctors today.
                </p>
                <Link href="/doctors" className="inline-block bg-white text-blue-600 px-12 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 transition-all relative z-10">
                    Find a Doctor
                </Link>
            </div>
        </div>
    );
}
