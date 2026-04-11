"use client"

import React, { useState, useEffect } from 'react';
import { 
    Plus, 
    ArrowLeft,
    CheckCircle2,
    ShieldAlert,
    Database,
    Zap,
    Heart,
    Flame,
    Droplets,
    Activity,
    Layers,
    Save
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AddDiseasePage() {
    const [categories, setCategories] = useState([]);
    const [toast, setToast] = useState(null);
    const [form, setForm] = useState({
        name: '',
        category: '',
        risk: 'Low',
        status: 'Published'
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();
                if (Array.isArray(data)) {
                    const catNames = data.map(c => c.name);
                    setCategories(catNames);
                    if (catNames.length > 0) setForm(prev => ({ ...prev, category: catNames[0] }));
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.category) {
            showToast("Please fill all required fields!");
            return;
        }
        
        try {
            const res = await fetch('/api/diseases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                showToast("Disease profile added to database!");
                setForm({ name: '', category: categories[0] || '', risk: 'Low', status: 'Published' });
            } else {
                showToast("Failed to save disease profile.");
            }
        } catch (error) {
            showToast("Network error");
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {toast && (
                <div className="fixed top-24 right-10 z-[500] animate-in slide-in-from-right-10 duration-300">
                    <div className="bg-[#214a32] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20">
                        <CheckCircle2 size={20} className="text-[#a4d9bc]" />
                        <span className="text-sm font-bold tracking-tight">{toast}</span>
                    </div>
                </div>
            )}

            {/* Header Content */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <Link href="/admin/diseases" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#214a32] transition-colors mb-2">
                        <ArrowLeft size={14} /> Back to Database
                    </Link>
                    <h1 className="text-3xl font-black text-[#122A1A] uppercase tracking-tight">Add Disease Profile</h1>
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest max-w-lg">Create a new entry in the medical database for organic holistic treatment plans.</p>
                </div>
                <div className="flex items-center gap-3">
                     <button onClick={handleSubmit} className="px-10 py-5 bg-[#214a32] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#214a32]/20 hover:bg-[#1a3a28] transition-all flex items-center gap-3">
                         <Save size={18} /> Register Profile
                     </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-8">
                
                {/* Main Form Fields */}
                <div className="space-y-8 bg-white p-10 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#a4d9bc]/30"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Disease Name <span className="text-rose-500">*</span></label>
                            <input 
                                type="text"
                                name="name"
                                value={form.name}
                                required
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="e.g. Type 2 Diabetes"
                                className="w-full px-6 py-5 bg-gray-50 border border-transparent rounded-2xl text-[12px] font-bold text-[#214a32] focus:ring-4 focus:ring-[#a4d9bc]/10 focus:border-[#a4d9bc] focus:bg-white transition-all placeholder:text-gray-200"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Taxonomy Category <span className="text-rose-500">*</span></label>
                            <select 
                                name="category"
                                value={form.category}
                                required
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="w-full px-6 py-5 bg-gray-50 border border-transparent rounded-2xl text-[12px] font-bold text-[#214a32] focus:ring-4 focus:ring-[#a4d9bc]/10 focus:border-[#a4d9bc] focus:bg-white transition-all outline-none"
                            >
                                <option value="" disabled>Choose Taxonomy Node</option>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>

                        <div className="md:col-span-2 space-y-3">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Diagnostic Protocol Summary</label>
                            <textarea
                                className="w-full px-6 py-5 bg-gray-50 border border-transparent rounded-2xl text-[12px] font-bold text-[#214a32] focus:ring-4 focus:ring-[#a4d9bc]/10 focus:border-[#a4d9bc] focus:bg-white transition-all placeholder:text-gray-200 resize-none h-40"
                                placeholder="Describe the diagnostic procedures and general information..."
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info Blocks */}
                <div className="space-y-6">
                    {/* Risk Level Node */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <ShieldAlert size={18} className="text-amber-500" />
                            <h3 className="text-[11px] font-black text-[#122A1A] uppercase tracking-widest">Risk Assessment</h3>
                        </div>
                        <div className="space-y-3">
                            {['Low', 'Medium', 'High'].map(level => (
                                <button
                                    key={level}
                                    type="button"
                                    onClick={() => setForm({ ...form, risk: level })}
                                    className={`w-full py-4 px-6 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border ${form.risk === level ? 'bg-[#214a32] text-white border-transparent' : 'bg-gray-50 text-gray-400 border-gray-50 hover:bg-gray-100'}`}
                                >
                                    {level} Priority
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Status Node */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Layers size={18} className="text-[#a4d9bc]" />
                            <h3 className="text-[11px] font-black text-[#122A1A] uppercase tracking-widest">Database Visibility</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {['Published', 'Draft'].map(status => (
                                <button
                                    key={status}
                                    type="button"
                                    onClick={() => setForm({ ...form, status })}
                                    className={`py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border ${form.status === status ? 'bg-[#214a32] text-white border-transparent shadow shadow-black/10' : 'bg-gray-50 text-gray-400 border-gray-100 hover:bg-gray-100'}`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
