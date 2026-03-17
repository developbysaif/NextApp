"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Search,
    Filter,
    BookOpen,
    User,
    Clock,
    ChevronRight,
    ShieldCheck,
    HeartPulse,
    Activity,
    Baby,
    Apple
} from "lucide-react";

const specialties = [
    { name: "All", id: "all", icon: <BookOpen size={16} /> },
    { name: "Cardiology", id: "cardiology", icon: <HeartPulse size={16} /> },
    { name: "Nutrition", id: "nutrition", icon: <Apple size={16} /> },
    { name: "Dermatology", id: "dermatology", icon: <Activity size={16} /> },
    { name: "Pediatrics", id: "pediatrics", icon: <Baby size={16} /> },
];

export default function BlogListingPage() {
    const [blogs, setBlogs] = useState([]);
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const allBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
        // Only show published blogs
        setBlogs(allBlogs.filter(b => b.status === "PUBLISHED"));
    }, []);

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = activeFilter === "all" || blog.category === activeFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-[#fcfdfa] pb-20">
            {/* Hero Section */}
            <section className="bg-blue-600 py-20 px-6 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 size-64 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 size-96 bg-blue-400 rounded-full blur-3xl" />
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight uppercase">Medical <span className="text-blue-200">Insights</span></h1>
                    <p className="text-xl text-blue-100 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                        Read verified medical advice and health tips from top-rated doctors and specialists.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative group mb-6">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={24} />
                        <input
                            type="text"
                            placeholder="Search by topic, symptom, or doctor..."
                            className="w-full bg-white text-slate-900 rounded-[2.5rem] pl-16 pr-8 py-5 text-lg font-bold shadow-2xl focus:ring-8 focus:ring-blue-500/20 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Doctor CTA */}
                    <div className="text-center">
                        <Link href="/doctor/dashboard/blogs" className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-white hover:text-blue-600 transition-all shadow-2xl border border-white/20 group">
                            <BookOpen size={20} className="group-hover:rotate-12 transition-transform" />
                            Are you a doctor? Write a Blog
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 mt-16">
                {/* Specialty Filters */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
                    {specialties.map((spec) => (
                        <button
                            key={spec.id}
                            onClick={() => setActiveFilter(spec.id)}
                            className={`
                                flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all
                                ${activeFilter === spec.id
                                    ? "bg-blue-600 text-white shadow-xl shadow-blue-900/20 scale-105"
                                    : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"}
                            `}
                        >
                            {spec.icon} {spec.name}
                        </button>
                    ))}
                </div>

                {/* Blog Grid */}
                {filteredBlogs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                        <BookOpen size={64} className="mx-auto text-slate-200 mb-6" strokeWidth={1} />
                        <h3 className="text-xl font-black text-slate-900 uppercase">No medical blogs found</h3>
                        <p className="text-slate-400 font-bold mt-2">Try adjusting your search or filter criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredBlogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function BlogCard({ blog }) {
    return (
        <Link href={`/blogs/${blog.slug}`} className="group h-full">
            <article className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                    {blog.featuredImage ? (
                        <img src={blog.featuredImage} alt={blog.title} className="size-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                        <div className="size-full bg-slate-50 flex items-center justify-center text-slate-300"><BookOpen size={48} /></div>
                    )}
                    <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-blue-600 shadow-sm border border-white/50">
                            {blog.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                        {blog.title}
                    </h2>

                    {/* Doctor Info */}
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
                </div>
            </article>
        </Link>
    );
}
