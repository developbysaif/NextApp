"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Clock, 
    Eye, 
    Share2, 
    ChevronLeft, 
    Bookmark, 
    ThumbsUp, 
    MessageSquare, 
    TrendingUp, 
    Zap, 
    CheckCircle2, 
    PlayCircle,
    ArrowRight,
    BookOpen
} from 'lucide-react';
import Link from 'next/link';

export default function ArticleDetailPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20">
            {/* Header & Meta */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-6 flex-1">
                    <Link href="/dashboard/insights" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#214a32] group w-fit">
                        <div className="p-2 bg-[#a4d9bc] rounded-lg group-hover:-translate-x-1 transition-transform"><ChevronLeft size={16} /></div>
                        Back to Insights
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-black font-outfit uppercase tracking-tight leading-tight text-gray-900">
                        The Science Behind Hydration: Why Water is Essential for Health
                    </h1>
                    <div className="flex flex-wrap items-center gap-8 pt-4">
                        <div className="flex items-center gap-3">
                            <img src="https://i.pravatar.cc/150?u=amin" className="size-14 rounded-2xl border-4 border-gray-50 shadow-sm" />
                            <div>
                                <h4 className="text-md font-black font-outfit uppercase tracking-tight">Dr. Armin Jafari, MD</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Medical Health Specialist • Sept 15, 2028</p>
                            </div>
                        </div>
                        <div className="h-10 w-px bg-gray-100 hidden md:block" />
                        <div className="flex items-center gap-8 text-[11px] font-black text-gray-400 uppercase tracking-wider">
                            <span className="flex items-center gap-2"><Eye size={16} className="text-gray-200" /> 12.4k Views</span>
                            <span className="flex items-center gap-2"><Clock size={16} className="text-gray-200" /> 12 min read</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-5 bg-white border border-gray-100 rounded-[2rem] text-gray-400 hover:text-[#214a32] hover:shadow-lg transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]"><Share2 size={18} /> Share Insight</button>
                    <button className="p-5 bg-white border border-gray-100 rounded-[2rem] text-gray-400 hover:text-[#214a32] hover:shadow-lg transition-all"><Bookmark size={20} /></button>
                </div>
            </div>

            {/* Featured Image */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative rounded-[4rem] overflow-hidden aspect-[21/9] shadow-2xl group shadow-gray-100 border border-gray-100"
            >
                <img src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=1600&h=900&fit=crop" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 pt-8">
                {/* Article Content */}
                <div className="lg:col-span-3 space-y-12">
                    <div className="prose prose-lg max-w-none prose-p:text-gray-500 prose-p:font-bold prose-p:leading-relaxed prose-p:uppercase prose-p:text-[11px] prose-p:tracking-tight prose-headings:font-black prose-headings:font-outfit prose-headings:uppercase prose-headings:tracking-tight">
                        <p>
                            Water is the fundamental essence of life. Approximately 60% of our body is composed of water, and every single organ, tissue, and cell requires it to function correctly. Despite its importance, many of us overlook our daily hydration needs, leading to various health issues that could easily be prevented. 
                        </p>
                        
                        <div className="p-10 md:p-14 bg-gray-50 rounded-[3rem] border border-gray-100 my-16 relative overflow-hidden group">
                           <div className="absolute -right-6 top-0 p-8 text-[#214a32]/5 rotate-12 transition-transform duration-700 group-hover:rotate-0">
                                <Zap size={150} strokeWidth={1} />
                           </div>
                           <h3 className="text-2xl mb-8 relative z-10">How Much Water Do You Really Need?</h3>
                           <p className="mb-0 text-gray-600 italic relative z-10 leading-relaxed font-bold uppercase tracking-tight text-xs">
                               "While the '8 glasses a day' rule is a good baseline, personal hydration needs vary significantly based on body weight, activity level, and climate. For those living in warmer regions like Pakistan, or those actively exercising, this requirement can double. A good indicator is your urine color; it should be light straw-colored."
                           </p>
                        </div>

                        <h3>The Biology of Hydration</h3>
                        <p>
                            Water plays a critical role in regulating body temperature through sweat, lubricating joints, and flushing out waste products from the kidneys and liver. It also helps transport nutrients throughout the body and maintains healthy skin elasticity.
                        </p>

                        <h3>Signs of Dehydration</h3>
                        <ul className="space-y-6 list-none pl-0 my-10">
                            {[
                                'Frequent fatigue and low energy levels during daytime.',
                                'Dry mouth, chapped lips, and dark yellow urine.',
                                'Persistent headaches or dizziness especially in hot weather.',
                                'Poor skin elasticity and slow wound healing.',
                                'Inability to concentrate or mental "brain fog".'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-6 p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:translate-x-2 transition-transform">
                                    <div className="p-2 bg-rose-50 text-rose-500 rounded-xl shadow-inner"><TrendingUp size={16} className="rotate-180" /></div>
                                    <span className="text-xs font-black uppercase tracking-tight text-gray-500">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <h3>Tips for Staying Hydrated</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                            {[
                                { title: 'Carry a Bottle', desc: 'Always have a reusable water bottle with you at your desk or in your bag.' },
                                { title: 'Set Reminders', desc: 'Use apps or simple phone alarms to remind you to drink every hour.' },
                                { title: 'Eat Water-Rich Foods', desc: 'Incorporate watermelon, cucumber, and oranges into your daily diet.' },
                                { title: 'First Thing in Morning', desc: 'Start your day with two large glasses of water to boost metabolism.' }
                            ].map((tip, i) => (
                                <div key={i} className="p-8 bg-[#a4d9bc]/50 rounded-[2rem] border border-green-100 group hover:bg-[#a4d9bc] transition-colors">
                                    <h4 className="text-sm font-black uppercase text-[#214a32] mb-3 flex items-center gap-2">
                                        <CheckCircle2 size={16} /> {tip.title}
                                    </h4>
                                    <p className="text-[10px] font-bold text-green-900/60 leading-relaxed uppercase tracking-widest">{tip.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h3>Conclusion</h3>
                        <p>
                            Hydration isn't just about quenching thirst; it's about providing your body with the necessary tools it needs to thrive. Small, consistent changes in your daily water intake can lead to profound improvements in your overall quality of life.
                        </p>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center gap-3 pt-12 border-t border-gray-50">
                        <button className="px-10 py-5 bg-gray-50 rounded-[2.5rem] flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#214a32] hover:bg-[#a4d9bc] transition-all">
                            <ThumbsUp size={18} fill="currentColor" /> Helpful (2.4k)
                        </button>
                        <button className="px-10 py-5 bg-gray-50 rounded-[2.5rem] flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:bg-gray-100 transition-all">
                            <MessageSquare size={18} /> 48 Comments
                        </button>
                        <div className="flex-1" />
                        <div className="flex flex-wrap gap-2">
                            {['#Hydration', '#Wellness'].map(t => (
                                <span key={t} className="px-5 py-2.5 bg-gray-100 rounded-2xl text-[9px] font-black uppercase tracking-widest text-gray-400">{t}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Details */}
                <div className="space-y-8">
                    {/* Related Articles */}
                    <div className="bg-white p-8 md:p-10 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-10 group overflow-hidden relative">
                         <div className="absolute -right-6 top-0 p-8 text-[#214a32]/5 rotate-12 transition-transform duration-700 group-hover:rotate-0">
                            <BookOpen size={120} strokeWidth={1} />
                        </div>
                        <h3 className="text-sm font-black font-outfit uppercase tracking-wider relative z-10">Related Insights</h3>
                        <div className="space-y-8 relative z-10">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex gap-4 group/item cursor-pointer">
                                    <div className="size-20 rounded-[1.5rem] overflow-hidden shrink-0 shadow-md">
                                        <img src={`https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop`} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="flex flex-col justify-between py-1">
                                        <h4 className="text-[11px] font-black uppercase tracking-tight leading-tight group-hover/item:text-[#214a32] transition-colors">Benefits of Intermittent Fasting</h4>
                                        <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">8 min read</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-5 bg-[#214a32] text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-green-900/10 flex items-center justify-center gap-2">
                            Explore library <ArrowRight size={16} />
                        </button>
                    </div>

                    {/* Related Video */}
                    <div className="bg-[#1E1B4B] p-10 rounded-[4rem] text-white shadow-xl shadow-indigo-900/10 space-y-6 group cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20" />
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="size-24 bg-white/10 rounded-[2.5rem] flex items-center justify-center mb-8 border border-white/5 shadow-inner">
                                <PlayCircle size={48} className="group-hover:scale-125 transition-transform duration-700" />
                            </div>
                            <h4 className="text-md font-black uppercase tracking-tight mb-2">Water & Metabolism</h4>
                            <p className="text-white/60 text-[10px] font-bold leading-relaxed uppercase tracking-[0.2em] px-4">Watch Dr. Armin explain the metabolic benefits of daily hydration.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
