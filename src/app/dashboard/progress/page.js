"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    TrendingUp, 
    TrendingDown, 
    Plus, 
    Activity, 
    Droplets, 
    Moon, 
    Scale, 
    Camera, 
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    BarChart3,
    Clock,
    Zap,
    Target
} from 'lucide-react';

export default function ProgressPage() {
    const [activeTab, setActiveTab] = useState('weight');

    const measurements = [
        { name: 'Chest', value: 93.0, unit: 'cm', change: '-1.5' },
        { name: 'Waist', value: 77.5, unit: 'cm', change: '-3.2' },
        { name: 'Arm', value: 28.5, unit: 'cm', change: '+1.2' },
        { name: 'Hips', value: 98.0, unit: 'cm', change: '-2.1' },
        { name: 'Thigh', value: 58.5, unit: 'cm', change: '-1.8' },
    ];

    const sleepStats = [
        { label: 'Deep Sleep', val: '2h 15m', perc: 35, color: 'bg-indigo-600' },
        { label: 'Light Sleep', val: '3h 45m', perc: 45, color: 'bg-indigo-400' },
        { label: 'REM Phase', val: '1h 30m', perc: 20, color: 'bg-indigo-200' },
    ];

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 font-outfit uppercase tracking-tight">Your Progress</h2>
                    <p className="text-gray-500 font-medium tracking-tight">Visualizing your journey to a healthier you.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-white border border-gray-100 p-4 rounded-2xl text-gray-400 hover:text-green-600 shadow-sm transition-all"><BarChart3 size={18} /></button>
                    <button className="bg-[#2E7D32] text-white px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-green-900 transition-all shadow-xl shadow-green-900/10">
                        <Plus size={18} /> Log Measurement
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Weight Tracking & Chart Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Weight Status Card */}
                    <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute -right-6 top-0 p-10 text-black/5 rotate-12 transition-transform duration-700 group-hover:rotate-0">
                            <Scale size={180} strokeWidth={1} />
                        </div>
                        <div className="relative z-10 space-y-10">
                            <h3 className="text-xl font-black font-outfit uppercase tracking-tight">Weight Tracking</h3>
                            <div className="flex flex-wrap items-end gap-12">
                                {[
                                    { label: 'Start Weight', val: 85, unit: 'kg', color: 'text-gray-400' },
                                    { label: 'Current Weight', val: 78, unit: 'kg', color: 'text-[#2E7D32]' },
                                    { label: 'Weight Goal', val: 65, unit: 'kg', color: 'text-indigo-600' },
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</h4>
                                        <div className="flex items-baseline gap-1">
                                            <span className={`text-4xl font-black font-outfit ${stat.color}`}>{stat.val}</span>
                                            <span className="text-sm font-bold text-gray-400 uppercase">{stat.unit}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.2em] mb-2 px-1">
                                    <span className="text-emerald-600">Progress to Goal</span>
                                    <span className="text-gray-400">7kg Lost / 13kg Remaining</span>
                                </div>
                                <div className="h-4 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: '53.8%' }} // (85-78)/(85-65) * 100
                                        transition={{ duration: 1.5 }}
                                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full shadow-lg"
                                    />
                                </div>
                            </div>

                            {/* Weight Chart Placeholder */}
                            <div className="h-48 w-full bg-gray-50/50 rounded-[2rem] border border-gray-100 flex items-center justify-center relative group/chart">
                                <TrendingDown size={32} strokeWidth={1} className="text-emerald-500 opacity-20 absolute top-4 right-4" />
                                <div className="flex items-end gap-6 h-full px-10 pb-6">
                                    {[70, 75, 45, 85, 30, 40].map((h, i) => (
                                        <motion.div 
                                            key={i} 
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ delay: i * 0.1, duration: 1 }}
                                            className="w-8 md:w-16 bg-emerald-100/50 rounded-t-xl group-hover/chart:bg-emerald-500/10 transition-all relative"
                                        >
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                <div className="size-2 bg-emerald-500 rounded-full" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="absolute bottom-6 left-10 right-10 flex justify-between text-[10px] font-black text-gray-300 uppercase tracking-widest bg-white/80 p-2 rounded-xl backdrop-blur-md">
                                    <span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Photos Gallery */}
                    <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black font-outfit uppercase tracking-tight">Progress Photos</h3>
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#2E7D32]">Add New <Camera size={14} /></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {[
                                { date: 'July 2028', weight: '82 kg', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=600&fit=crop', label: 'Before' },
                                { date: 'Sept 2028', weight: '78 kg', img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=600&fit=crop', label: 'After' },
                            ].map((photo, i) => (
                                <div key={i} className="space-y-4 group">
                                    <div className="relative rounded-[2.5rem] overflow-hidden aspect-[3/4] shadow-xl group-hover:scale-[1.02] transition-transform duration-700">
                                        <img src={photo.img} className="w-full h-full object-cover" />
                                        <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-[9px] font-black uppercase tracking-[0.2em]">{photo.label}</div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                                            <p className="text-white text-xs font-black uppercase tracking-[0.2em] mb-2">{photo.date}</p>
                                            <p className="text-emerald-400 text-2xl font-black font-outfit">{photo.weight}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between px-2">
                                        <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{photo.date}</h4>
                                        <Plus size={16} className="text-gray-200 cursor-pointer hover:text-green-600 transition-colors" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Body Measurements & Other Stats Column */}
                <div className="space-y-8">
                    {/* Measurements List */}
                    <div className="bg-white p-8 md:p-10 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-8">
                        <h3 className="text-sm font-black font-outfit uppercase tracking-wider mb-2">Body Measurements</h3>
                        <div className="space-y-2">
                            {measurements.map((m, i) => (
                                <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-all cursor-pointer border border-transparent hover:border-gray-100 group">
                                    <h4 className="text-[11px] font-black uppercase text-gray-400">{m.name}</h4>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-md font-black font-outfit">{m.value}</span>
                                            <span className="text-[9px] font-bold text-gray-400 uppercase">{m.unit}</span>
                                        </div>
                                        <span className={`text-[10px] font-black uppercase flex items-center gap-1 ${m.change.includes('-') ? 'text-emerald-500' : 'text-indigo-500'}`}>
                                            {m.change.includes('-') ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                                            {m.change.replace('-', '')}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
                            Add Measurement
                        </button>
                    </div>

                    {/* Sleep Statistics Card */}
                    <div className="bg-[#1E1B4B] p-8 md:p-10 rounded-[3.5rem] text-white shadow-xl shadow-indigo-900/10 space-y-8 group transition-all hover:bg-[#1e1b4bfa] relative overflow-hidden">
                        <div className="absolute -right-6 top-0 p-8 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                            <Moon size={100} strokeWidth={1} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-md font-black font-outfit uppercase tracking-tight">Sleep Statistics</h3>
                                <div className="p-3 bg-indigo-500/20 rounded-2xl"><Moon size={20} className="text-indigo-200" /></div>
                            </div>
                            
                            <div className="flex flex-col items-center justify-center py-10 relative">
                                <svg className="size-48 transform -rotate-90">
                                    <circle cx="96" cy="96" r="80" className="stroke-indigo-900/50" strokeWidth="20" fill="transparent" />
                                    <circle cx="96" cy="96" r="80" className="stroke-indigo-500" strokeWidth="20" fill="transparent" strokeDasharray={502.4} strokeDashoffset={502.4 * (1 - 0.72)} strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-black font-outfit">7h 35m</span>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mt-1">Average Sleep</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {sleepStats.map((stat, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em] text-indigo-300">
                                            <span>{stat.label}</span>
                                            <span>{stat.val}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-indigo-900/50 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${stat.perc}%` }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                className={`h-full ${stat.color} rounded-full shadow-lg`} 
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Hydration Card */}
                    <div className="bg-[#0284c7] p-8 md:p-10 rounded-[3.5rem] text-white shadow-xl shadow-sky-900/10 group relative overflow-hidden">
                        <div className="absolute -right-6 top-6 p-8 text-white/5 rotate-12 transition-transform duration-700 group-hover:rotate-0">
                            <Droplets size={120} strokeWidth={1} />
                        </div>
                        <div className="relative z-10 flex items-center justify-between gap-6">
                            <div className="space-y-4">
                                <h3 className="text-md font-black font-outfit uppercase tracking-tight">Daily Hydration</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black font-outfit">2.0</span>
                                    <span className="text-sm font-bold text-sky-200">Liters</span>
                                </div>
                                <div className="px-5 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 font-black text-[9px] uppercase tracking-widest w-fit">Normal Level</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className={`w-1.5 h-6 rounded-full ${i <= 5 ? 'bg-sky-200' : 'bg-sky-900/50'}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
