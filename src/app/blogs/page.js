"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Search, BookOpen, ChevronRight, ShieldCheck, HeartPulse, Activity,
    Baby, Apple, Utensils, Heart, Dumbbell, Pill, Leaf, Brain, Star
} from "lucide-react";

const categoryIconMap = {
    all: <BookOpen size={15} />,
    cardiology: <HeartPulse size={15} />,
    nutrition: <Apple size={15} />,
    dermatology: <Activity size={15} />,
    pediatrics: <Baby size={15} />,
    breakfast: <Utensils size={15} />,
    lunch: <Utensils size={15} />,
    dinner: <Utensils size={15} />,
    snack: <Leaf size={15} />,
    other: <Star size={15} />,
    health: <Heart size={15} />,
    fitness: <Dumbbell size={15} />,
    medicine: <Pill size={15} />,
    mental: <Brain size={15} />,
};

export default function BlogListingPage() {
    const [blogs, setBlogs] = useState([]);
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadAllBlogs = async () => {
            try {
                // 1. Fetch from API (Universal Server Blogs)
                let apiBlogs = [];
                try {
                    const res = await fetch('/api/blogs');
                    const result = await res.json();
                    if (result.success) {
                        apiBlogs = result.data.filter(b => b.published !== false).map(b => ({
                            id: b._id,
                            slug: b.slug,
                            title: b.title,
                            content: b.description || b.content || '',
                            category: (b.category || 'health').toLowerCase(),
                            featuredImage: b.image || b.featuredImage,
                            authorName: b.authorName || 'Doctor',
                            status: 'PUBLISHED',
                            source: 'api'
                        }));
                    }
                } catch (err) {
                    console.error("Failed to fetch API blogs:", err);
                }

                // 2. Load from localStorage "blogs" (Locally saved blogs)
                const doctorBlogs = JSON.parse(localStorage.getItem("blogs") || "[]")
                    .filter(b => b.status === "PUBLISHED" || !b.status)
                    .map(b => ({ ...b, source: 'doctor' }));

                // 3. Load from localStorage "blogPosts" (Healthy Menu posts)
                const menuPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]")
                    .map(b => ({
                        id: b.id,
                        slug: b.slug || b.id.toString(),
                        title: b.title,
                        content: b.description || '',
                        category: (b.category || 'other').toLowerCase(),
                        featuredImage: b.img,
                        authorName: 'Admin',
                        status: 'PUBLISHED',
                        source: 'menu',
                        cal: b.cal, carbs: b.carbs, prot: b.prot, fat: b.fat,
                        score: b.score, dif: b.dif, keywords: b.keywords
                    }));

                // Combine all arrays
                const allSources = [...doctorBlogs, ...apiBlogs, ...menuPosts];
                
                // Deduplicate by slug to prevent the same article showing multiple times
                const uniqueBlogsMap = new Map();
                allSources.forEach(blog => {
                    if (!uniqueBlogsMap.has(blog.slug)) {
                        uniqueBlogsMap.set(blog.slug, blog);
                    }
                });
                
                const combined = Array.from(uniqueBlogsMap.values());
                setBlogs(combined);

                // Build unique category list
                const customCats = JSON.parse(localStorage.getItem("blogCategories") || "[]");
                const autoCats = [...new Set(combined.map(b => b.category).filter(Boolean))];
                const allCats = [...new Set([...autoCats, ...customCats.map(c => c.toLowerCase())])];
                setCategories(allCats);
            } catch (e) {
                console.error("Error loading blogs", e);
            }
        };

        loadAllBlogs();
    }, []);

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = activeFilter === "all" || blog.category?.toLowerCase() === activeFilter;
        return matchesSearch && matchesFilter;
    });

    const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

    return (
        <div className="min-h-screen bg-[#FDFBF7] pb-20">
            {/* Hero */}
            <section className="bg-gradient-to-br from-[#215b33] via-[#2a7040] to-[#B4E567] py-20 px-6 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#B4E567] rounded-full blur-3xl" />
                </div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
                        Health <span className="text-[#B4E567]">Insights</span> & Recipes
                    </h1>
                    <p className="text-lg text-white/80 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                        Verified health advice, recipes, and meal plans from doctors and nutrition experts.
                    </p>
                    <div className="max-w-2xl mx-auto relative mb-6">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by topic, recipe, or keyword..."
                            className="w-full bg-white text-gray-900 rounded-[2.5rem] pl-14 pr-8 py-4 text-sm font-bold shadow-2xl focus:ring-4 focus:ring-[#B4E567]/40 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 mt-10">
                {/* Category Filter Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                    <button
                        onClick={() => setActiveFilter("all")}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${activeFilter === "all" ? "bg-[#B4E567] text-gray-900 shadow-md" : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"}`}
                    >
                        <BookOpen size={14} /> All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${activeFilter === cat ? "bg-[#B4E567] text-gray-900 shadow-md" : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"}`}
                        >
                            {categoryIconMap[cat] || <Star size={14}/>} {capitalize(cat)}
                        </button>
                    ))}
                </div>

                {/* Count indicator */}
                <p className="text-xs font-bold text-gray-400 mb-6 text-center">
                    Showing <span className="text-gray-900">{filteredBlogs.length}</span> posts
                </p>

                {/* Grid */}
                {filteredBlogs.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
                        <div className="text-6xl mb-4">🥗</div>
                        <h3 className="text-xl font-black text-gray-900">No posts found</h3>
                        <p className="text-gray-400 font-bold mt-2 text-sm">Try searching or changing the filter.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredBlogs.map((blog) => (
                            <BlogCard key={`${blog.source}-${blog.id}`} blog={blog} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function BlogCard({ blog }) {
    // Route to correct detail page based on source
    const href = blog.source === 'menu'
        ? `/dashboard/menu/${blog.id}`
        : `/blogs/${blog.slug}`;

    const catColors = {
        breakfast: 'bg-[#c3e884] text-[#496b16]',
        lunch: 'bg-[#FFD166] text-[#8f680d]',
        dinner: 'bg-[#FF9F43] text-white',
        snack: 'bg-gray-100 text-gray-600',
    };
    const catColor = catColors[blog.category?.toLowerCase()] || 'bg-[#B4E567]/20 text-[#496b16]';

    return (
        <Link href={href} className="group h-full block">
            <article className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                    {blog.featuredImage ? (
                        <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-200"><BookOpen size={48} /></div>
                    )}
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm border border-white/30 ${catColor}`}>
                            {blog.category}
                        </span>
                    </div>
                    {blog.source === 'menu' && blog.cal && (
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[9px] font-black text-gray-700 shadow-sm">
                            🔥 {blog.cal} kcal
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-base font-black text-gray-900 mb-3 group-hover:text-[#215b33] transition-colors leading-tight line-clamp-2">
                        {blog.title}
                    </h2>

                    {blog.content && (
                        <p className="text-xs font-medium text-gray-500 leading-relaxed line-clamp-2 mb-4">{blog.content}</p>
                    )}

                    {/* Macros for menu posts */}
                    {blog.source === 'menu' && blog.carbs && (
                        <div className="flex gap-3 text-[9px] font-bold text-gray-400 mb-4">
                            <span className="text-[#8f680d]">C: {blog.carbs}g</span>
                            <span className="text-[#a65d14]">P: {blog.prot}g</span>
                            <span className="text-gray-500">F: {blog.fat}g</span>
                        </div>
                    )}

                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                        <div className="w-8 h-8 bg-[#B4E567]/20 rounded-xl flex items-center justify-center text-[#496b16] font-black text-xs shrink-0 relative border border-[#B4E567]/30">
                            {blog.authorName?.charAt(0) || 'N'}
                            <div className="absolute -top-1 -right-1 bg-[#215b33] text-white rounded-full p-0.5 border border-white shadow-sm">
                                <ShieldCheck size={8} />
                            </div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-[10px] font-black text-gray-800 truncate">{blog.authorName || 'Nutrigo'}</p>
                            <p className="text-[9px] font-bold text-gray-400">
                                {blog.source === 'menu' ? 'Nutrigo Recipe' : 'Verified Doctor'}
                            </p>
                        </div>
                        <ChevronRight size={14} className="text-gray-300 group-hover:text-[#B4E567] transition-colors shrink-0" />
                    </div>
                </div>
            </article>
        </Link>
    );
}
