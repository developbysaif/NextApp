"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Notebook, 
    Search, 
    Plus, 
    Clock, 
    Flame, 
    ChevronLeft, 
    ChevronRight, 
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Utensils,
    Info,
    CheckCircle2,
    Filter,
    Activity,
    Settings2
} from 'lucide-react';

export default function FoodDiaryPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const stats = [
        { name: 'Total Calories', value: '12,615', unit: 'kcal', trend: '+1.45%', isPositive: false, icon: Flame, color: 'text-amber-500', bg: 'bg-amber-50' },
        { name: 'Total Carbs', value: '2,100', unit: 'gr', trend: '+0.78%', isPositive: false, icon: Activity, color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { name: 'Total Proteins', value: '498', unit: 'gr', trend: '-2.84%', isPositive: true, icon: Utensils, color: 'text-[#2E7D32]', bg: 'bg-green-50' },
        { name: 'Total Fats', value: '285', unit: 'gr', trend: '+4.16%', isPositive: false, icon: Flame, color: 'text-rose-500', bg: 'bg-rose-50' },
    ];

    const diaryEntries = [
        { id: 1, date: '2028-09-01', time: '7:30 AM', category: 'Breakfast', name: 'Scrambled Eggs with Spinach', amount: '1 bowl', calories: 250 },
        { id: 2, date: '2028-09-01', time: '12:30 PM', category: 'Lunch', name: 'Grilled Chicken with Brown Rice', amount: '1 plate', calories: 550 },
        { id: 3, date: '2028-09-01', time: '4:00 PM', category: 'Snacks', name: 'Greek Yogurt with Berries', amount: '1 cup', calories: 150 },
        { id: 4, date: '2028-09-01', time: '7:00 PM', category: 'Dinner', name: 'Baked Salmon with Broccoli', amount: '1 plate', calories: 450 },
        { id: 5, date: '2028-09-02', time: '8:00 AM', category: 'Breakfast', name: 'Avocado Toast', amount: '2 slices', calories: 320 },
        { id: 6, date: '2028-09-02', time: '1:00 PM', category: 'Lunch', name: 'Quinoa Bowl with Tofu', amount: '1 bowl', calories: 420 },
        { id: 7, date: '2028-09-02', time: '4:30 PM', category: 'Snacks', name: 'Handful of Mixed Nuts', amount: '30g', calories: 180 },
        { id: 8, date: '2028-09-02', time: '7:30 PM', category: 'Dinner', name: 'Grilled Turkey Breast', amount: '1 plate', calories: 400 },
        { id: 9, date: '2028-09-03', time: '7:45 AM', category: 'Breakfast', name: 'Protein Smoothie Bowl', amount: '1 bowl', calories: 350 },
        { id: 10, date: '2028-09-03', time: '12:45 PM', category: 'Lunch', name: 'Shrimp Tacos with Veggies', amount: '3 tacos', calories: 480 },
    ];

    const categories = ['All', 'Breakfast', 'Lunch', 'Snacks', 'Dinner'];

    return (
        <div className="space-y-8 pb-10">
            {/* Header & Stats */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 font-outfit uppercase tracking-tight">Food Diary</h2>
                    <p className="text-gray-500 font-medium tracking-tight">Track every bite and understand your nutrition better.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-white border border-gray-100 p-4 rounded-2xl text-gray-400 hover:text-green-600 shadow-sm transition-all"><Calendar size={18} /></button>
                    <button className="bg-[#2E7D32] text-white px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-green-900 transition-all shadow-xl shadow-green-900/10">
                        <Plus size={18} /> Add Entry
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm group"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                                <stat.icon size={20} />
                            </div>
                            <div className={`flex items-center gap-1 text-[9px] font-black uppercase tracking-widest ${stat.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {stat.isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                                {stat.trend}
                            </div>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <h3 className="text-2xl font-black font-outfit uppercase">{stat.value}</h3>
                            <span className="text-[10px] font-black text-gray-400 uppercase">{stat.unit}</span>
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">{stat.name}</p>
                    </motion.div>
                ))}
            </div>

            {/* Entries Table */}
            <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                    <div className="flex flex-wrap items-center gap-2 bg-gray-50/50 p-2 rounded-[2rem]">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`
                                    px-8 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all
                                    ${activeCategory === cat ? 'bg-white text-green-700 shadow-sm' : 'text-gray-400 hover:text-gray-600'}
                                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative group/search">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-green-600 transition-colors" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search entries..." 
                                className="pl-12 pr-6 py-4 bg-gray-50 border-none rounded-3xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-green-500 transition-all w-64 placeholder:text-gray-300"
                            />
                        </div>
                        <button className="p-4 bg-gray-50 rounded-3xl text-gray-400 hover:text-green-600 transition-all border border-transparent hover:border-gray-100"><Filter size={20} /></button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">
                                <th className="pb-8 text-left px-4">Date</th>
                                <th className="pb-8 text-left px-4">Time</th>
                                <th className="pb-8 text-left px-4">Category</th>
                                <th className="pb-8 text-left px-4">Menu Item Name</th>
                                <th className="pb-8 text-left px-4">Amount</th>
                                <th className="pb-8 text-right px-4">Calories</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {diaryEntries.map((entry) => (
                                <tr key={entry.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="py-8 px-4 text-[11px] font-black text-gray-400 font-outfit uppercase">{entry.date}</td>
                                    <td className="py-8 px-4 text-[11px] font-black text-gray-400 font-outfit uppercase">
                                        <div className="flex items-center gap-2"><Clock size={12} className="text-gray-200" /> {entry.time}</div>
                                    </td>
                                    <td className="py-8 px-4">
                                        <span className={`
                                            px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest
                                            ${entry.category === 'Breakfast' ? 'bg-amber-50 text-amber-600' : ''}
                                            ${entry.category === 'Lunch' ? 'bg-emerald-50 text-emerald-600' : ''}
                                            ${entry.category === 'Snacks' ? 'bg-rose-50 text-rose-600' : ''}
                                            ${entry.category === 'Dinner' ? 'bg-indigo-50 text-indigo-600' : ''}
                                        `}>
                                            {entry.category}
                                        </span>
                                    </td>
                                    <td className="py-8 px-4 text-[11px] font-black text-gray-900 uppercase group-hover:text-[#2E7D32] transition-colors">{entry.name}</td>
                                    <td className="py-8 px-4 text-[11px] font-black text-gray-500 uppercase tracking-widest">{entry.amount}</td>
                                    <td className="py-8 px-4 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className="text-sm font-black font-outfit text-gray-900">{entry.calories} kcal</span>
                                            <div className="h-1 w-12 bg-gray-100 rounded-full mt-1 overflow-hidden">
                                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(entry.calories/600)*100}%` }} />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-50 pt-10">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Showing 10 out of 84 entries</p>
                    <div className="flex gap-2">
                        <button className="px-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black uppercase text-gray-400 hover:text-green-600 group transition-all"><ChevronLeft size={16} className="inline mr-1 group-hover:-translate-x-1 transition-transform" /> Previous</button>
                        <button className="px-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black uppercase text-gray-400 hover:text-green-600 group transition-all">Next <ChevronRight size={16} className="inline ml-1 group-hover:translate-x-1 transition-transform" /></button>
                    </div>
                </div>
            </div>

            {/* Quick Summary Card */}
            <div className="bg-[#2E7D32] p-8 md:p-12 rounded-[3.5rem] text-white shadow-2xl shadow-green-900/20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 text-white/5 rotate-12 transition-transform duration-700 group-hover:rotate-0">
                    <Notebook size={180} strokeWidth={1} />
                </div>
                <div className="space-y-6 relative z-10 max-w-xl">
                    <h3 className="text-2xl font-black font-outfit uppercase tracking-tight">Your Weekly Insight</h3>
                    <p className="text-white/60 text-xs font-bold leading-relaxed uppercase tracking-widest">Great work, Adam! You consumed 498g of protein this week, which is perfectly aligned with your muscle-gain goal. Consider adding more fiber in your dinner tomorrow.</p>
                    <div className="flex gap-4">
                        <button className="px-10 py-5 bg-white text-green-900 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-green-50 transition-all shadow-xl shadow-black/10">Download Monthly Report</button>
                        <button className="p-5 bg-white/10 backdrop-blur-md text-white rounded-[2rem] hover:bg-white/20 transition-all border border-white/10"><Settings2 size={18} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
