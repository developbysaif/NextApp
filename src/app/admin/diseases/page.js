"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ShieldCheck, 
    Users,
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
    const [diseases, setDiseases] = useState([]);

    const fetchDiseases = async () => {
        try {
            const res = await fetch('/api/diseases');
            const data = await res.json();
            if (Array.isArray(data)) setDiseases(data);
        } catch (error) {
            console.error("Error fetching diseases:", error);
        }
    };

    useEffect(() => {
        fetchDiseases();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this disease profile?")) return;
        try {
            const res = await fetch(`/api/diseases?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setDiseases(diseases.filter(d => d._id !== id));
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const filteredDiseases = diseases.filter(dis => {
        return dis.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const getIcon = (type) => {
        const icons = {
            'Activity': Activity,
            'Zap': Zap,
            'Heart': Heart,
            'Flame': Flame,
            'Layers': Layers,
            'ShieldCheck': ShieldCheck
        };
        return icons[type] || Activity;
    };

    return (
        <div className="space-y-6 pb-10">
            {/* Header & Search Bar at the Top */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-black text-[#122A1A] uppercase tracking-tight">Diseases</h1>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Medical Taxonomy Database</p>
                </div>
                
                <div className="relative group/search flex-1 md:max-w-md">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-[#214a32] transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search diseases..." 
                        className="w-full pl-16 pr-6 py-4 bg-gray-50 border border-transparent rounded-xl text-[11px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-[#a4d9bc]/30 focus:border-[#a4d9bc] focus:bg-white transition-all placeholder:text-gray-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3">
                    <a href="/admin/diseases/category" className="px-6 py-3.5 bg-gray-50 text-gray-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100">
                        Manage Categories
                    </a>
                    <a href="/admin/diseases/add" className="bg-[#214a32] text-white px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-[#1a3a28] transition-all shadow-lg shadow-[#214a32]/10">
                        <Plus size={18} /> Add Disease
                    </a>
                </div>
            </div>

            {/* Main Disease List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDiseases.map((dis) => {
                    const DiseaseIcon = getIcon(dis.iconType || 'Activity');
                    return (
                        <motion.div
                            key={dis._id}
                            whileHover={{ y: -5 }}
                            className="bg-white p-6 rounded-2xl border border-gray-100 group hover:border-[#a4d9bc] hover:shadow-xl transition-all flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`${dis.bg || 'bg-[#f0f9f4]'} ${dis.color || 'text-[#214a32]'} p-4 rounded-xl transition-transform group-hover:rotate-6`}>
                                        <DiseaseIcon size={24} />
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 text-gray-400 hover:text-[#214a32] hover:bg-gray-50 rounded-lg transition-all"><Edit2 size={14} /></button>
                                        <button className="p-2 text-gray-400 hover:text-rose-500 hover:bg-gray-50 rounded-lg transition-all" onClick={() => handleDelete(dis._id)}><Trash2 size={14} /></button>
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight leading-tight group-hover:text-[#214a32] transition-colors">{dis.name}</h4>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">{dis.category}</span>
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${dis.risk === 'High' ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-500'}`}>{dis.risk} Risk</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Users size={14} className="text-gray-300" />
                                    <p className="text-[10px] font-bold text-gray-400 leading-none">{dis.usersCount || '0'} Users</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`size-1.5 rounded-full ${dis.status === 'Published' ? 'bg-[#10b981]' : 'bg-gray-300'}`} />
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{dis.status}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                {/* Add New Placeholder Card */}
                <a href="/admin/diseases/add" className="border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center p-10 text-center group hover:bg-white hover:border-[#a4d9bc] hover:shadow-xl transition-all cursor-pointer block min-h-[220px]">
                    <div className="size-16 bg-gray-50 rounded-xl flex items-center mx-auto justify-center mb-4 text-gray-300 group-hover:scale-110 group-hover:bg-[#f0f9f4] group-hover:text-[#214a32] transition-all">
                        <Plus size={32} />
                    </div>
                    <h4 className="text-[11px] font-black text-gray-300 group-hover:text-[#214a32] uppercase tracking-[0.2em] transition-colors">Add New Disease</h4>
                </a>
            </div>
        </div>
    );
}
