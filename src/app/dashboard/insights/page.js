"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    BookOpen, 
    Search, 
    TrendingUp, 
    Star, 
    Clock, 
    Eye, 
    Share2, 
    ChevronRight, 
    Bookmark, 
    Flame, 
    User,
    ArrowUpRight,
    PlayCircle
} from 'lucide-react';
import Link from 'next/link';

export default function HealthInsightsPage() {
    const [activeTab, setActiveTab] = useState('Featured');
    const tabs = ['Recent', 'Featured', 'Trending', 'Popular'];

    const articles = [
        { 
            id: 1, 
            title: 'How Nutrient Timing Affects Your Workout Performance', 
            author: 'Coach Daniel Green', 
            authorImg: 'https://i.pravatar.cc/150?u=daniel',
            date: 'Sept 14, 2028', 
            category: 'Performance', 
            views: '5.2k', 
            readTime: '6 min',
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop'
        },
        { 
            id: 2, 
            title: 'Superfoods to Boost Your Immunity This Season', 
            author: 'Dr. Emily Lawson', 
            authorImg: 'https://i.pravatar.cc/150?u=emily',
            date: 'Sept 12, 2028', 
            category: 'Nutrition', 
            views: '8.1k', 
            readTime: '8 min',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop'
        },
        { 
            id: 3, 
            title: '10 Minutes Yoga for Daily Flexibility', 
            author: 'Mia Johnson', 
            authorImg: 'https://i.pravatar.cc/150?u=mia',
            date: 'Sept 10, 2028', 
            category: 'Mindfulness', 
            views: '3.4k', 
            readTime: '5 min',
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop'
        },
    ];

    const trendingTags = ['#Hydration', '#IntermittentFasting', '#Superfoods', '#MindfulEating', '#BalancedBites', '#PostWorkoutNutrition'];

    return (
        <div className="space-y-8 pb-10">
            {/* Header & Search */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 font-outfit uppercase tracking-tight">Health Insights</h2>
                    <p className="text-gray-500 font-medium tracking-tight">Expert knowledge for your physical and mental well-being.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group/search lg:max-w-md w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-[#214a32] transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search articles..." 
                            className="w-full pl-16 pr-6 py-4 bg-white border border-gray-100 rounded-3xl text-[10px] font-black uppercase tracking-widest shadow-sm focus:ring-2 focus:ring-green-500 transition-all placeholder:text-gray-300"
                        />
                    </div>
                </div>
            </div>

            {/* Featured Article - Big Banner */}
            <div className="relative group overflow-hidden">
                <Link href="/dashboard/insights/hydration-science">
                <div className="bg-[#214a32] rounded-[4rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 text-white shadow-2xl shadow-green-900/20 group-hover:scale-[1.01] transition-transform duration-700 cursor-pointer overflow-hidden border border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 opacity-20 group-hover:opacity-30 transition-opacity" />
                    <div className="flex-1 space-y-6 relative z-10 transition-transform duration-700 group-hover:translate-x-2">
                        <div className="flex items-center gap-4">
                            <span className="px-5 py-2 bg-white/10 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 flex items-center gap-2"><Star size={12} fill="currentColor" /> Featured Article</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/50 flex items-center gap-1"><Clock size={12} /> 12 min read</span>
                        </div>
                        <h3 className="text-3xl md:text-6xl font-black font-outfit uppercase tracking-tight leading-tight">
                            The Importance of Hydration for Optimal Health
                        </h3>
                        <div className="flex items-center gap-4 pt-4">
                            <img src="https://i.pravatar.cc/150?u=amelia" className="size-12 rounded-2xl border-4 border-white/10" />
                            <div>
                                <h4 className="text-sm font-black font-outfit uppercase tracking-tight">Dr. Amelia Johnson</h4>
                                <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Global Health Expert</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative shrink-0 transition-transform duration-1000 group-hover:scale-105 group-hover:rotate-2">
                        <div className="absolute inset-0 bg-white/20 rounded-[3rem] blur-[80px] -z-10 group-hover:blur-[100px] transition-all" />
                        <img 
                            src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&h=600&fit=crop" 
                            className="size-[300px] md:size-[450px] rounded-[3.5rem] object-cover shadow-2xl ring-8 ring-white/10"
                        />
                    </div>
                </div>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Articles Feed */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="flex items-center gap-2 bg-gray-50/50 p-2 rounded-[2rem] w-fit">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                                    px-8 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all
                                    ${activeTab === tab ? 'bg-white text-[#214a32] shadow-sm' : 'text-gray-400 hover:text-gray-600'}
                                `}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {articles.map((article, idx) => (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:shadow-gray-100 transition-all group flex flex-col cursor-pointer"
                            >
                                <div className="relative overflow-hidden aspect-[16/10]">
                                    <div className="absolute top-6 left-6 z-10 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-[9px] font-black uppercase tracking-widest text-[#214a32] shadow-sm">
                                        {article.category}
                                    </div>
                                    <div className="absolute top-6 right-6 z-10 p-3 bg-white/90 backdrop-blur-md rounded-2xl text-gray-400 hover:text-rose-500 shadow-sm transition-all">
                                        <Bookmark size={18} />
                                    </div>
                                    <img src={article.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/60 transition-all" />
                                </div>
                                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                                    <h4 className="text-xl font-black font-outfit uppercase tracking-tight leading-tight group-hover:text-[#214a32] transition-colors">{article.title}</h4>
                                    
                                    <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                                        <div className="flex items-center gap-3">
                                            <img src={article.authorImg} className="size-10 rounded-xl" />
                                            <div>
                                                <h5 className="text-[10px] font-black uppercase tracking-tight">{article.author}</h5>
                                                <p className="text-[9px] font-bold text-gray-400 uppercase">{article.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">
                                            <span className="flex items-center gap-1"><Eye size={14} /> {article.views}</span>
                                            <span className="flex items-center gap-1"><Clock size={14} /> {article.readTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    {/* Trending Tags */}
                    <div className="bg-white p-8 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-6 overflow-hidden relative group">
                        <div className="absolute -right-4 top-0 p-8 text-[#214a32]/5 rotate-12 transition-transform duration-700 group-hover:rotate-0">
                            <TrendingUp size={100} strokeWidth={1} />
                        </div>
                        <h3 className="text-sm font-black font-outfit uppercase tracking-wider relative z-10">Trending Tags</h3>
                        <div className="flex flex-wrap gap-2 relative z-10">
                            {trendingTags.map((tag, i) => (
                                <span key={i} className="px-5 py-2.5 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-[#214a32] hover:text-white transition-all cursor-pointer">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Top Authors */}
                    <div className="bg-white p-8 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-8 overflow-hidden relative group">
                        <div className="absolute -right-6 -bottom-6 p-8 text-[#214a32]/5 rotate-12 transition-transform duration-700 group-hover:rotate-0">
                            <User size={120} strokeWidth={1} />
                        </div>
                        <h3 className="text-sm font-black font-outfit uppercase tracking-wider relative z-10">Top Authors</h3>
                        <div className="space-y-6 relative z-10">
                            {[
                                { name: 'Dr. Amin Jafari', role: 'Psychologist', followers: '12.4k', img: 'https://i.pravatar.cc/150?u=amin' },
                                { name: 'Coach Daniel Green', role: 'Fitness Trainer', followers: '10.1k', img: 'https://i.pravatar.cc/150?u=daniel' },
                                { name: 'Dr. Emily Lawson', role: 'Nutritionist', followers: '8.5k', img: 'https://i.pravatar.cc/150?u=emily' },
                            ].map((author, i) => (
                                <div key={i} className="flex items-center justify-between group/author cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="relative shrink-0">
                                            <img src={author.img} className="size-12 rounded-[1.5rem] group-hover/author:scale-110 transition-transform border border-gray-50" />
                                            <div className="absolute -bottom-1 -right-1 size-4 bg-[#214a32] border-4 border-white rounded-full" />
                                        </div>
                                        <div>
                                            <h4 className="text-[11px] font-black uppercase tracking-tight group-hover/author:text-[#214a32] transition-colors">{author.name}</h4>
                                            <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{author.role} • {author.followers}</p>
                                        </div>
                                    </div>
                                    <button className="p-2.5 bg-gray-50 rounded-xl text-gray-300 hover:text-[#214a32] transition-colors group-hover/author:translate-x-1 transition-transform">
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter / Video Card */}
                    <div className="bg-[#1E1B4B] p-8 rounded-[3.5rem] text-white shadow-xl shadow-indigo-900/10 space-y-6 group cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20" />
                        <div className="relative z-10">
                            <h4 className="text-md font-black uppercase tracking-tight mb-2">Latest Insights Video</h4>
                            <p className="text-white/60 text-xs font-bold leading-relaxed uppercase tracking-widest mb-6">Learn how to manage stress through mindful breathing.</p>
                            <div className="aspect-video bg-white/10 rounded-[2rem] flex items-center justify-center border border-white/5 group-hover:bg-white/20 transition-all shadow-inner relative overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop" className="absolute inset-0 size-full object-cover opacity-40" />
                                <PlayCircle size={48} className="relative z-10 group-hover:scale-125 transition-transform duration-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
