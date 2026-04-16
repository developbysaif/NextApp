"use client"

import React, { useState } from 'react';
import { ClipboardList, Search, Plus, Filter, Sunrise, Sun, Sunset, Moon, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DoctorDietPlansPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');

    const templates = [
        { id: 1, name: 'Diabetic Control Protocol', category: 'Diabetes Diet', rating: '4.8', uses: 342, bg: 'bg-[#eaf1ef]', color: 'text-[#125B50]', meals: { breakfast: 'Oatmeal & Almonds', lunch: 'Grilled Fish & Quinoa', dinner: 'Leafy Salad & Tofu', snacks: 'Greek Yogurt' }},
        { id: 2, name: 'Weight Loss Accelerator', category: 'Weight Loss', rating: '4.9', uses: 890, bg: 'bg-orange-50', color: 'text-orange-500', meals: { breakfast: 'Green Smoothie', lunch: 'Grilled Chicken Salad', dinner: 'Steamed Veg & Salmon', snacks: 'Apple Slices' }},
        { id: 3, name: 'Hypertension Safe-Diet', category: 'General Health', rating: '4.7', uses: 215, bg: 'bg-blue-50', color: 'text-blue-500', meals: { breakfast: 'Berries & Walnuts', lunch: 'Turkey Wrap', dinner: 'Baked Chicken & Beans', snacks: 'Unsalted Nuts' }},
        { id: 4, name: 'PCOS Balancing Plan', category: 'Hormonal', rating: '4.9', uses: 450, bg: 'bg-purple-50', color: 'text-purple-500', meals: { breakfast: 'Eggs & Avocado', lunch: 'Lentil Soup', dinner: 'Zucchini Noodles', snacks: 'Pumpkin Seeds' }},
    ];

    const categories = ['All', 'Weight Loss', 'Diabetes Diet', 'General Health', 'Hormonal'];

    const filtered = templates.filter(t => 
        (filter === 'All' || t.category === filter) && 
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Diet Templates</h1>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Manage clinical nutrition plans</p>
                </div>
                
                <div className="relative group/search flex-1 max-w-md">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-[#125B50] transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search diet plans..." 
                        className="w-full pl-12 pr-6 py-3.5 bg-gray-50 border border-transparent rounded-[1.2rem] text-[13px] font-bold focus:ring-4 focus:ring-[#125B50]/10 focus:border-[#125B50] focus:bg-white transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex bg-gray-50 p-1.5 rounded-xl border border-gray-100 shrink-0 overflow-x-auto no-scrollbar">
                    {categories.map(c => (
                        <button 
                            key={c}
                            onClick={() => setFilter(c)}
                            className={`px-4 py-2 rounded-lg text-[10px] whitespace-nowrap font-black uppercase tracking-widest transition-all ${filter === c ? 'bg-white text-[#125B50] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
                
                <button className="bg-[#125B50] text-white size-12 rounded-xl flex items-center justify-center hover:bg-[#0e483e] transition-all shadow-lg shadow-[#125B50]/20 shrink-0">
                    <Plus size={20} />
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filtered.map((plan, idx) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={plan.id}
                        className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#125B50]/20 transition-all flex flex-col group"
                    >
                        <div className="flex items-start justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className={`size-14 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6 ${plan.bg} ${plan.color}`}>
                                    <Leaf size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 tracking-tight group-hover:text-[#125B50] transition-colors">{plan.name}</h3>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#a4d9bc]">{plan.category}</span>
                                </div>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg">
                                Used {plan.uses}x
                            </span>
                        </div>

                        {/* Meals Matrix */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100/50 flex flex-col items-center text-center gap-2">
                                <Sunrise size={18} className="text-amber-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Breakfast</span>
                                <p className="text-xs font-bold text-gray-700 leading-tight">{plan.meals.breakfast}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100/50 flex flex-col items-center text-center gap-2">
                                <Sun size={18} className="text-orange-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Lunch</span>
                                <p className="text-xs font-bold text-gray-700 leading-tight">{plan.meals.lunch}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100/50 flex flex-col items-center text-center gap-2">
                                <Sunset size={18} className="text-rose-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Dinner</span>
                                <p className="text-xs font-bold text-gray-700 leading-tight">{plan.meals.dinner}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100/50 flex flex-col items-center text-center gap-2">
                                <Moon size={18} className="text-indigo-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Snacks</span>
                                <p className="text-xs font-bold text-gray-700 leading-tight">{plan.meals.snacks}</p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                            <span className="text-sm font-bold text-amber-500 flex items-center gap-1">★ {plan.rating} Rating</span>
                            <div className="flex gap-2">
                                <button className="px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest text-[#125B50] bg-[#eaf1ef] hover:bg-gray-100 transition-colors">Edit</button>
                                <button className="px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest text-white bg-[#125B50] hover:bg-[#0e483e] transition-colors shadow-lg shadow-[#125B50]/20">Assign to Patient</button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
