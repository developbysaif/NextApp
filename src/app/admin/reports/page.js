"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    BarChart3, 
    TrendingUp, 
    TrendingDown, 
    Download, 
    Calendar, 
    Filter, 
    ArrowUpRight, 
    ArrowDownRight, 
    Clock, 
    Users, 
    Activity, 
    Zap,
    Heart,
    Flame,
    Droplets,
    PieChart as PieIcon,
    Layers,
    ChevronDown,
    Globe
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts';

export default function AdminReportsPage() {
    const userGrowthData = [
        { name: 'Mon', total: 4200, premium: 1200 },
        { name: 'Tue', total: 4500, premium: 1350 },
        { name: 'Wed', total: 4800, premium: 1500 },
        { name: 'Thu', total: 5100, premium: 1800 },
        { name: 'Fri', total: 5600, premium: 2100 },
        { name: 'Sat', total: 6000, premium: 2400 },
        { name: 'Sun', total: 6500, premium: 2800 },
    ];

    const healthEngagementData = [
        { name: 'Kalonji Oil', volume: 450, trend: 'up' },
        { name: 'Moringa', volume: 380, trend: 'up' },
        { name: 'Dates', volume: 520, trend: 'down' },
        { name: 'Honey', volume: 290, trend: 'up' },
        { name: 'Olive Oil', volume: 410, trend: 'up' },
    ];

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-[#122A1A] text-white rounded-[2rem] shadow-xl shadow-green-900/10">
                        <BarChart3 size={28} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 font-outfit uppercase tracking-tight">Ecosystem Reports</h2>
                        <p className="text-gray-500 font-medium tracking-tight">In-depth behavioral and financial performance metrics.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-4 bg-white border border-gray-100 rounded-3xl text-gray-400 hover:text-[#122A1A] shadow-sm transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><Calendar size={18} /> Aug 2028 - Sept 2028</button>
                    <button onClick={() => {
                        let csvStr = "Health Engagement Report\nName,Volume,Trend\n";
                        csvStr += healthEngagementData.map(d => `${d.name},${d.volume},${d.trend}`).join("\n");
                        csvStr += "\n\nUser Growth Data\nDay,Total Users,Premium Users\n";
                        csvStr += userGrowthData.map(d => `${d.name},${d.total},${d.premium}`).join("\n");
                        const blob = new Blob([csvStr], { type: 'text/csv' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'analytics_master_report.csv';
                        a.click();
                    }} className="bg-[#122A1A] text-white px-8 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-black/10">
                        <Download size={18} /> Export CSV Master
                    </button>
                </div>
            </div>

            {/* Performance Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Retention Rate', val: '84.2%', change: '+4.5%', isPos: true, sub: 'Daily active users' },
                    { label: 'LTV (Avg)', val: '$420.50', change: '+12.8%', isPos: true, sub: 'Lifetime user value' },
                    { label: 'Conversion', val: '12.4%', change: '-1.2%', isPos: false, sub: 'Free to Premium' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute -right-4 top-0 p-8 text-black/5 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                             <Layers size={140} strokeWidth={1} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">{stat.label}</p>
                                <div className={`flex items-center gap-1 text-[10px] font-black ${stat.isPos ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {stat.isPos ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {stat.change}
                                </div>
                            </div>
                            <h3 className="text-4xl font-black font-outfit text-[#122A1A] uppercase tracking-tight">{stat.val}</h3>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-2">{stat.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Growth Chart Column */}
                <div className="lg:col-span-8 bg-white p-10 md:p-14 rounded-[4rem] border border-gray-100 shadow-sm space-y-12 relative overflow-hidden group">
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <h3 className="text-xl font-black font-outfit uppercase tracking-tight">Growth Vectors</h3>
                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-2">Aggregated user acquisition metrics</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#122A1A]">
                                <span className="w-8 h-1 bg-[#122A1A] rounded-full"></span> Total Users
                            </div>
                            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-emerald-500">
                                <span className="w-8 h-1 bg-emerald-500 rounded-full"></span> Premium
                            </div>
                        </div>
                    </div>

                    <div className="h-[350px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={userGrowthData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 9, fontWeight: 700, fill: '#CBD5E1' }}
                                    dy={15}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 9, fontWeight: 700, fill: '#CBD5E1' }}
                                    dx={-10}
                                />
                                <Tooltip />
                                <Bar dataKey="total" fill="#122A1A" radius={[10, 10, 0, 0]} barSize={40} />
                                <Bar dataKey="premium" fill="#10B981" radius={[10, 10, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Popular Interest Sidebar Column */}
                <div className="lg:col-span-4 bg-[#F8F7F4] p-10 rounded-[4rem] border border-gray-100 shadow-inner flex flex-col justify-between group">
                    <div>
                        <h3 className="text-sm font-black font-outfit uppercase tracking-[0.2em] mb-10">Popular Consult Topics</h3>
                        <div className="space-y-8">
                            {healthEngagementData.map((item, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-[11px] font-black uppercase tracking-tight text-[#122A1A]">{item.name}</h4>
                                        <div className={`flex items-center gap-1 text-[9px] font-black ${item.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {item.volume} Requests {item.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                        </div>
                                    </div>
                                    <div className="h-2 w-full bg-white rounded-full overflow-hidden shadow-inner flex">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(item.volume / 600) * 100}%` }}
                                            transition={{ duration: 1.5, delay: i * 0.1 }}
                                            className={`h-full rounded-full ${item.trend === 'up' ? 'bg-[#122A1A]' : 'bg-rose-400'}`} 
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="pt-10 mt-10 border-t border-gray-200">
                         <div className="p-8 bg-white rounded-[2.5rem] text-center border border-white shadow-sm hover:shadow-xl transition-all cursor-pointer">
                            <PieIcon size={32} className="mx-auto mb-4 text-[#122A1A]" />
                            <h4 className="text-[11px] font-black uppercase tracking-widest text-[#122A1A]">Breakdown Categories</h4>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-2">View detailed segmentation</p>
                         </div>
                    </div>
                </div>
            </div>

            {/* Strategic Insights Area */}
            <div className="bg-[#122A1A] p-12 md:p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute right-0 top-0 p-10 text-white/5 rotate-12 transition-transform duration-700 group-hover:rotate-0">
                    <Zap size={250} strokeWidth={1} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 items-center">
                    <div className="space-y-8">
                        <div className="inline-block px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">Platform Intelligence</div>
                        <h3 className="text-4xl font-black font-outfit uppercase tracking-tight leading-tight">Predictive Health Trends <br /><span className="text-emerald-400">Quarterly Insight</span></h3>
                        <p className="text-[#A5C3A5] font-bold text-sm uppercase leading-relaxed tracking-tight opacity-80">
                            Our AI models predict a 14% increase in respiratory-related consultations for the upcoming winter season in Pakistan. Strategic stock of herbal remedies is advised.
                        </p>
                        <div className="flex gap-4">
                            <button className="px-10 py-5 bg-white text-[#122A1A] rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-emerald-50 transition-all font-sans">Full Market Analysis</button>
                            <button className="px-10 py-5 bg-white/5 text-[#A5C3A5] border border-white/5 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all font-sans">View Data Sets</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                         {[
                            { label: 'Active Sessions', val: '1.2M', icon: Activity },
                            { label: 'Hearts Healed', val: '84k', icon: Heart },
                            { label: 'Global Reach', val: '124', icon: Globe },
                            { label: 'AI Optimization', val: '92%', icon: Zap },
                         ].map((bx, k) => (
                             <div key={k} className="p-8 bg-white/5 border border-white/5 rounded-[3rem] backdrop-blur-md hover:bg-white/10 transition-all text-center space-y-4">
                                 <bx.icon size={28} className="mx-auto text-emerald-500" />
                                 <h4 className="text-2xl font-black font-outfit">{bx.val}</h4>
                                 <p className="text-[9px] font-black text-[#A5C3A5] uppercase tracking-widest opacity-60">{bx.label}</p>
                             </div>
                         ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Added missing icons
import { ArrowRight } from 'lucide-react';
