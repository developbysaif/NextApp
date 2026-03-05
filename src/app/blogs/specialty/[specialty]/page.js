"use client";

import React, { useState, useEffect, use } from 'react';
import PageHeader from '@/component/PageHeader';
import { BookOpen, User, Clock, ArrowLeft, ShieldCheck, HeartPulse, Activity, Apple, Baby } from 'lucide-react';
import Link from 'next/link';

const specialties = {
    "Cardiology": { icon: HeartPulse, color: "text-red-500", bg: "bg-red-50", description: "Heart health and cardiovascular system insights." },
    "Nutrition": { icon: Apple, color: "text-green-500", bg: "bg-green-50", description: "Organic food, diets, and nutrition-based healing." },
    "Dermatology": { icon: Activity, color: "text-blue-500", bg: "bg-blue-50", description: "Skin health and natural complexion treatments." },
    "Pediatrics": { icon: Baby, color: "text-purple-500", bg: "bg-purple-50", description: "Child healthcare and development advice." },
    "Cardiologist": { icon: HeartPulse, color: "text-red-500", bg: "bg-red-50", description: "Medical advice from certified cardiologists." }
};

export default function SpecialtyBlogsPage({ params }) {
    const { specialty } = use(params);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const specialtyInfo = specialties[specialty] || { icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50", description: "Discover the latest medical insights in this field." };
    const Icon = specialtyInfo.icon;

    useEffect(() => {
        const fetchBlogs = () => {
            const allBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
            // Filtering by category or specialty-like mapping
            const filtered = allBlogs.filter(b =>
                (b.category?.toLowerCase() === specialty.toLowerCase()) ||
                (specialty.toLowerCase() === "cardiologist" && b.category?.toLowerCase() === "cardiology")
            );
            setBlogs(filtered);
            setLoading(false);
        };
        fetchBlogs();
    }, [specialty]);

    if (loading) {
        return <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center font-black text-blue-600 uppercase tracking-widest text-sm italic">Filtering Insights...</div>;
    }

    return (
        <div className="min-h-screen bg-[#fcfdfa] pb-24 font-sans">
            <PageHeader
                title={`${specialty} Insights`}
                description={specialtyInfo.description}
                backgroundImage="/header.jpg"
            />

            <div className="max-w-7xl mx-auto px-6 mt-16">
                {/* Filter Info */}
                <div className="flex items-center gap-6 mb-16 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 size-32 opacity-5 -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-700">
                        <Icon size={120} />
                    </div>

                    <div className={`size-16 rounded-2xl ${specialtyInfo.bg} ${specialtyInfo.color} flex items-center justify-center shrink-0 shadow-sm`}>
                        <Icon size={32} />
                    </div>

                    <div className="flex-1">
                        <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tight">{specialty} Specialization</h2>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">Verified Expert Articles</p>
                    </div>

                    <Link href="/blogs" className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
                        <ArrowLeft size={16} /> All Specialities
                    </Link>
                </div>

                {/* Blogs Grid */}
                {blogs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                        <BookOpen size={64} className="mx-auto text-slate-200 mb-6" strokeWidth={1} />
                        <h3 className="text-xl font-black text-slate-900 uppercase italic">No articles found in {specialty}</h3>
                        <p className="text-slate-400 font-bold mt-2">Check back later for new insights from our experts.</p>
                        <Link href="/blogs" className="mt-8 inline-flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[10px] hover:underline">
                            View All Recent Blogs
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {blogs.map((blog) => (
                            <Link href={`/blogs/${blog.slug}`} key={blog.id} className="group">
                                <article className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col p-8">
                                    <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight mb-6 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                                        {blog.title}
                                    </h3>

                                    <div className="flex items-center gap-3 mt-auto pt-6 border-t border-slate-50">
                                        <div className="size-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-black shrink-0 relative">
                                            {blog.authorPhoto ? (
                                                <img src={blog.authorPhoto} alt="" className="size-full object-cover rounded-xl" />
                                            ) : (
                                                blog.authorName?.charAt(0)
                                            )}
                                            <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5 border-2 border-white shadow-sm">
                                                <ShieldCheck size={10} />
                                            </div>
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-xs font-black text-slate-800 uppercase tracking-tight truncate">{blog.authorName}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Verified Doctor</p>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
