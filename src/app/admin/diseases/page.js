"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ShieldCheck, 
    Search, 
    Plus, 
    MoreVertical, 
    Trash2, 
    Edit2, 
    Globe, 
    BarChart3, 
    Eye, 
    Database,
    Zap,
    Heart,
    Flame,
    Droplets,
    Activity,
    ChevronDown,
    Filter,
    Layers,
    Share2,
    Settings2
} from 'lucide-react';

export default function AdminDiseasesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const diseases = [
        { id: 1, name: 'Diabetes (Type 2)', category: 'Chronic', users: '1.2k', risk: 'High', status: 'Published', icon: Activity, color: 'text-rose-500', bg: 'bg-rose-50' },
        { id: 2, name: 'PCOS / PCOD', category: 'Digestive', users: '2.5k', risk: 'Medium', status: 'Published', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
        { id: 3, name: 'Hypertension', category: 'Chronic', users: '850', risk: 'High', status: 'Draft', icon: Heart, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { id: 4, name: 'Fatty Liver', category: 'Digestive', users: '1.1k', risk: 'Low', status: 'Published', icon: Layers, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { id: 5, name: 'Eczema / Psoriasis', category: 'Autoimmune', users: '600', risk: 'Medium', status: 'Published', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
    ];

    const categories = ['All', 'Chronic', 'Digestive', 'Autoimmune', 'Skin', 'Other'];

    const stats = [
        { label: 'Total Diseases', val: '42', icon: Database, color: 'text-[#122A1A]' },
        { label: 'Avg Users/Disease', val: '842', icon: Eye, color: 'text-indigo-600' },
        { label: 'Critical Risks', val: '8', icon: ShieldCheck, color: 'text-rose-500' },
    ];

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-[#122A1A] text-white rounded-[2rem] shadow-xl shadow-green-900/10 transition-transform hover:scale-110">
                        <Database size={28} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 font-outfit uppercase tracking-tight">Disease Master Center</h2>
                        <p className="text-gray-500 font-medium tracking-tight">Managing global medical database and user-mapping.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <a href="/admin/reports" className="p-4 bg-white border border-gray-100 rounded-3xl text-gray-400 hover:text-green-600 transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-2"><BarChart3 size={18} /> Global Analytics</a>
                    <a href="/admin/portal" className="bg-[#122A1A] text-white px-8 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-black/10">
                        <Plus size={18} /> Add New Disease
                    </a>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm flex items-center justify-between group cursor-pointer hover:shadow-xl transition-all">
                        <div className="space-y-1">
                            <h3 className={`text-3xl font-black font-outfit uppercase ${stat.color} group-hover:scale-105 transition-transform origin-left`}>{stat.val}</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">{stat.label}</p>
                        </div>
                        <div className={`p-4 bg-gray-50 rounded-2xl group-hover:bg-[#122A1A] group-hover:text-white transition-all text-gray-200`}><stat.icon size={28} /></div>
                    </div>
                ))}
            </div>

            {/* Main Content Section */}
            <div className="bg-white p-8 md:p-12 rounded-[4rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                    <div className="relative group/search flex-1 lg:max-w-md w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-[#122A1A] transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Find disease code or name..." 
                            className="w-full pl-16 pr-6 py-5 bg-gray-50 border-none rounded-3xl text-[10px] font-black uppercase tracking-widest shadow-inner focus:ring-2 focus:ring-[#122A1A] transition-all placeholder:text-gray-300"
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-8 py-3 rounded-[1.5rem] text-[9px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-[#122A1A] text-white shadow-lg' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                            >
                                {cat}
                            </button>
                        ))}
                        <button className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-[#122A1A] transition-all"><Settings2 size={18} /></button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {diseases.map((dis) => (
                        <motion.div
                            key={dis.id}
                            whileHover={{ y: -8 }}
                            className="bg-white p-8 rounded-[3.5rem] border border-gray-50 group hover:border-gray-200 hover:shadow-2xl hover:shadow-gray-100 transition-all flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className={`${dis.bg} ${dis.color} p-4 rounded-[2rem] transition-transform group-hover:rotate-12`}>
                                    <dis.icon size={28} />
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 bg-gray-50 rounded-xl text-gray-300 hover:text-[#122A1A] hover:bg-white shadow-sm transition-all"><Edit2 size={14} /></button>
                                    <button className="p-2 bg-gray-50 rounded-xl text-gray-300 hover:text-rose-500 hover:bg-white shadow-sm transition-all"><Trash2 size={14} /></button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-xl font-black font-outfit uppercase tracking-tight text-gray-900 group-hover:text-[#122A1A] transition-colors">{dis.name}</h4>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 flex items-center gap-2 mt-2">
                                        <Layers size={12} /> {dis.category}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 py-6 border-t border-gray-50 border-dashed">
                                    <div>
                                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Impacted Users</p>
                                        <h5 className="text-[11px] font-black uppercase text-[#122A1A]">{dis.users} Users</h5>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Risk Assessment</p>
                                        <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${dis.risk === 'High' ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-500'}`}>{dis.risk}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                <div className="flex items-center gap-2">
                                    <div className={`size-1.5 rounded-full ${dis.status === 'Published' ? 'bg-emerald-500' : 'bg-gray-300 animate-pulse'}`} />
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{dis.status}</p>
                                </div>
                                <a href="/diseases" className="p-3 bg-[#122A1A] text-white rounded-2xl group-hover:scale-110 transition-transform block"><Share2 size={14} /></a>
                            </div>
                        </motion.div>
                    ))}

                    {/* Add New Placeholder Card */}
                    <a href="/admin/portal" className="border-4 border-dashed border-gray-50 rounded-[3.5rem] flex flex-col items-center justify-center p-12 text-center group hover:bg-gray-50 hover:border-gray-100 transition-all cursor-pointer block">
                        <div className="size-20 bg-gray-50 rounded-[2.5rem] flex items-center mx-auto justify-center mb-6 text-gray-200 group-hover:translate-y-[-5px] transition-transform">
                            <Plus size={42} strokeWidth={1} />
                        </div>
                        <h4 className="text-[11px] font-black text-gray-100 group-hover:text-gray-400 uppercase tracking-[0.2em] transition-colors">Expand Medical Library</h4>
                    </a>
                </div>

                <div className="mt-12 pt-12 border-t border-gray-50 flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Global Taxonomy Version: 4.2.0 (Stable)</p>
                    <a href="/admin/portal" className="px-10 py-5 bg-gray-900 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-black/10 hover:bg-black transition-all flex items-center gap-2 group">
                        Update All Schema <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
}
