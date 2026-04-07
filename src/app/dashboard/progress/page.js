"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Search, Bell, ChevronDown, Award,
    Camera, Plus, ArrowUpRight, ArrowDownRight,
    Droplets, Moon, Flame, LayoutDashboard,
    Calendar, MessageSquare, Utensils, 
    ShoppingCart, Notebook, TrendingUp,
    Dumbbell, Heart, LogOut, MoreHorizontal, Sparkles
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, AreaChart, Area, Cell, PieChart, Pie
} from 'recharts';
import Link from 'next/link';

// Mock data to match the screenshot's values
const weightData = [
    { name: 'Apr', weight: 85 },
    { name: 'May', weight: 83 },
    { name: 'Jun', weight: 80 },
    { name: 'Jul', weight: 73 },
    { name: 'Aug', weight: 80 },
    { name: 'Sep', weight: 78 },
];

const calorieData = [
    { day: 'Mon', consumed: 1700, burned: 1200 },
    { day: 'Tue', consumed: 2100, burned: 1500 },
    { day: 'Wed', consumed: 1800, burned: 1100 },
    { day: 'Thu', consumed: 1755, burned: 1400 },
];

const sleepData = [
    { day: 'Sun', deep: 3, light: 4, rem: 2, awake: 1, total: '6h 45m' },
    { day: 'Mon', deep: 4, light: 3, rem: 1, awake: 0.5, total: '7h 25m' },
    { day: 'Tue', deep: 2, light: 5, rem: 3, awake: 1, total: '7h 55m' },
    { day: 'Wed', deep: 3, light: 2, rem: 1, awake: 0.5, total: '6h 0m' },
    { day: 'Thu', deep: 4, light: 3, rem: 2, awake: 1, total: '6h 50m' },
];

const hydrationData = [
    { day: 'Mon', val: 2.0 },
    { day: 'Tue', val: 1.8 },
    { day: 'Wed', val: 2.2 },
    { day: 'Thu', val: 1.6 },
    { day: 'Fri', val: 2.0 },
    { day: 'Sat', val: 1.9 },
    { day: 'Sun', val: 2.1 },
];

export default function ProgressDashboard() {
    const [completedExercises, setCompletedExercises] = useState(0);

    useEffect(() => {
        const updateHealthEval = () => {
             const storedStr = localStorage.getItem('userExercises');
             if (storedStr) {
                 const exers = JSON.parse(storedStr);
                 const completeCount = exers.filter(e => e.status === 'Completed').length;
                 setCompletedExercises(completeCount);
             }
        };
        updateHealthEval();
        
        const interval = setInterval(updateHealthEval, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4 md:p-8 bg-[#F8F9FA] min-h-screen text-gray-800 font-sans">
            {/* Top Navigation / Header */}
            <header className="flex items-center justify-between mb-8 px-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Progress</h1>
                
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Search size={20} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 relative transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-white pr-4 pl-2 py-2 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-all">
                        <img 
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop" 
                            alt="User" 
                            className="w-10 h-10 rounded-xl object-cover border-2 border-[#a4d9bc]/20"
                        />
                        <div className="hidden sm:block text-left">
                            <p className="text-xs font-bold text-gray-900 leading-tight">Adam Vasylenko</p>
                            <p className="text-[10px] font-medium text-gray-400">Member</p>
                        </div>
                        <ChevronDown size={14} className="text-gray-400" />
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* LEFT & CENTER CONTENT */}
                <div className="xl:col-span-9 space-y-8">
                    
                    {/* AI Health Evaluation Banner */}
                    <div className="bg-[#1E1B4B] rounded-[3rem] p-8 md:p-10 text-white relative overflow-hidden flex flex-col xl:flex-row items-center justify-between gap-8 shadow-2xl shadow-indigo-900/10 border border-indigo-900/50 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-transparent" />
                        
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
                        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />
                        
                        <div className="relative z-10 flex-1 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md border border-white/10 text-indigo-300 shadow-inner">
                                    <Sparkles size={18} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300">AI Health Evaluation</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black font-outfit uppercase tracking-tight leading-tight">
                                Your diet and exercise are perfectly aligned.
                            </h2>
                            <p className="text-white/70 text-xs font-medium leading-relaxed max-w-2xl">
                                We analyzed your recent meals from the <strong className="text-white">Diet Plan</strong> and your activity in <strong className="text-white">Exercises</strong>. With <strong className="text-[#a4d9bc]">{completedExercises > 0 ? completedExercises : 4} completed exercises</strong> actively tracked, your high protein intake is optimally supporting your strength training recovery. Great job maintaining the 400 kcal deficit!
                            </p>
                        </div>
                        
                        <div className="relative z-10 flex flex-col sm:flex-row xl:flex-col gap-3 shrink-0 w-full sm:w-auto">
                            <Link href="/dashboard/menu" className="w-full xl:w-auto px-6 py-4 bg-white text-indigo-950 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all flex items-center gap-3 justify-center shadow-xl shadow-black/10 group-hover:scale-105">
                                <Utensils size={14} /> Sync Diet
                            </Link>
                            <Link href="/dashboard/exercises" className="w-full xl:w-auto px-6 py-4 bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-3 justify-center group-hover:scale-105 group-hover:delay-75">
                                <Dumbbell size={14} /> Sync Workout
                            </Link>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Body Anatomy Card */}
                        <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-gray-100 relative min-h-[500px]">
                            <div className="flex items-center justify-between mb-2">
                                <button className="bg-[#a4d9bc]/20 text-[#214a32] px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                    Today <ChevronDown size={12} />
                                </button>
                            </div>
                            
                            <div className="relative flex justify-center items-center py-4">
                                <img 
                                    src="/human_measurement_model_1775483916386.png" 
                                    alt="Human Anatomy Model" 
                                    className="h-[400px] object-contain opacity-95"
                                />
                                
                                <AnatomyLabel label="Chest" value="93.0 cm" position={{ top: '20%', right: '0%' }} side="right" />
                                <AnatomyLabel label="Waist" value="77.5 cm" position={{ top: '40%', right: '0%' }} side="right" />
                                <AnatomyLabel label="Thigh" value="58.5 cm" position={{ top: '65%', right: '5%' }} side="right" />
                                <AnatomyLabel label="Arm" value="28.5 cm" position={{ top: '28%', left: '0%' }} side="left" />
                                <AnatomyLabel label="Hips" value="98.0 cm" position={{ top: '55%', left: '0%' }} side="left" />
                                
                                <div className="absolute top-[26%] left-[48%] w-3 h-3 bg-orange-400 border-2 border-white rounded-full shadow-lg"></div>
                                <div className="absolute top-[34%] left-[46%] w-3 h-3 bg-orange-400 border-2 border-white rounded-full shadow-lg"></div>
                                <div className="absolute top-[48%] left-[50%] w-3 h-3 bg-orange-400 border-2 border-white rounded-full shadow-lg"></div>
                                <div className="absolute top-[68%] left-[44%] w-3 h-3 bg-orange-400 border-2 border-white rounded-full shadow-lg"></div>
                                <div className="absolute top-[36%] left-[36%] w-3 h-3 bg-orange-400 border-2 border-white rounded-full shadow-lg"></div>
                            </div>
                        </div>

                        {/* Weight & Progress Photos */}
                        <div className="space-y-8 flex flex-col">
                            <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-gray-100 flex-1">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-gray-900">Weight Tracking</h3>
                                    <button className="text-gray-300 hover:text-gray-600"><MoreHorizontal size={20} /></button>
                                </div>
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Start Weight</p>
                                        <p className="text-xl font-bold text-gray-900">85 <span className="text-xs text-gray-400 ml-0.5">Kg</span></p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Current Weight</p>
                                        <p className="text-xl font-bold text-[#214a32]">78 <span className="text-xs text-gray-400 ml-0.5">Kg</span></p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Weight Goal</p>
                                        <p className="text-xl font-bold text-gray-900">65 <span className="text-xs text-gray-400 ml-0.5">Kg</span></p>
                                    </div>
                                </div>
                                
                                <div className="h-[180px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={weightData}>
                                            <defs>
                                                <linearGradient id="colorWt" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#214a32" stopOpacity={0.2}/>
                                                    <stop offset="95%" stopColor="#214a32" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <Area type="monotone" dataKey="weight" stroke="#214a32" strokeWidth={3} fillOpacity={1} fill="url(#colorWt)" />
                                            <XAxis dataKey="name" hide />
                                            <Tooltip content={<CustomTooltip />} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                    <div className="flex justify-between mt-4 px-2">
                                        {weightData.map(d => (
                                            <span key={d.name} className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{d.name}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-gray-900">Progress Photos</h3>
                                    <button className="bg-[#a4d9bc] text-[#214a32] px-4 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-[#a3d45c] transition-all">View All</button>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1 rounded-3xl overflow-hidden relative h-[160px] shadow-sm">
                                        <img src="/progress_before_after_photos_1775483974784.png" className="w-full h-full object-cover" alt="Before" />
                                        <div className="absolute top-3 left-4 bg-white/90 px-2 py-1 rounded-md text-[8px] font-bold text-gray-800 uppercase tracking-widest shadow-sm">July 2028</div>
                                        <div className="absolute top-3 right-4 bg-[#a4d9bc] px-2 py-1 rounded-md text-[8px] font-bold text-[#214a32] uppercase tracking-widest">82 Kg</div>
                                    </div>
                                    <div className="flex-1 rounded-3xl overflow-hidden relative h-[160px] shadow-sm">
                                        <img src="/progress_before_after_photos_1775483974784.png" className="w-full h-full object-cover object-right" alt="After" />
                                        <div className="absolute top-3 left-4 bg-white/90 px-2 py-1 rounded-md text-[8px] font-bold text-gray-800 uppercase tracking-widest shadow-sm">Sept 2028</div>
                                        <div className="absolute bottom-3 right-4 bg-white p-2 rounded-full shadow-lg">
                                            <Award size={14} className="text-[#214a32]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-gray-100 overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <button className="flex items-center gap-2 text-gray-900 border border-gray-100 rounded-xl px-4 py-2 text-[11px] font-bold bg-[#F8F9FA] hover:bg-gray-100 transition-colors">
                                September 2028 <ChevronDown size={14} />
                            </button>
                            <div className="flex gap-12 text-[10px] font-bold text-gray-300 uppercase tracking-widest hidden lg:flex px-10">
                                <span>Chest (cm)</span>
                                <span>Arm (cm)</span>
                                <span>Waist (cm)</span>
                                <span>Hips (cm)</span>
                                <span>Thigh (cm)</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                             {[
                                { w: 'Week 1', d: [95.0, 30.0, 80.0, 100.0, 60.0] },
                                { w: 'Week 2', d: [94.0, 29.5, 79.0, 99.0, 59.5], active: true },
                                { w: 'Week 3', d: [93.5, 29.0, 78.0, 98.5, 59.0] },
                                { w: 'Week 4', d: [93.0, 28.5, 77.5, 98.0, 58.5] }
                             ].map((row, i) => (
                                <div key={i} className={`flex items-center justify-between p-5 rounded-2xl transition-all ${row.active ? 'bg-[#FDF7ED] border border-[#FADCC0]/30 transition-all' : 'hover:bg-gray-50'}`}>
                                    <span className="text-[11px] font-bold text-gray-900 w-24 tracking-wide">{row.w}</span>
                                    <div className="flex flex-1 justify-end gap-10 md:gap-16 lg:pr-6">
                                        {row.d.map((val, idx) => (
                                            <span key={idx} className="text-[11px] font-black text-gray-900 w-12 text-center tabular-nums">{val.toFixed(1)}</span>
                                        ))}
                                    </div>
                                </div>
                             ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT ANALYTICS SIDEBAR */}
                <div className="xl:col-span-3 space-y-8">
                    <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-gray-900">Calories Activities</h3>
                            <button className="bg-[#a4d9bc]/20 text-[#214a32] px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                                Last 4 Days <ChevronDown size={10} />
                            </button>
                        </div>
                        <div className="flex items-end justify-between gap-4 mb-4">
                            <div>
                                <p className="text-xl font-black text-gray-900">450 <span className="text-[10px] text-gray-400 font-bold uppercase ml-0.5">kcal left</span></p>
                                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mt-1">Daily Goal: 2,500 kcal</p>
                            </div>
                        </div>

                        <div className="h-[180px] w-full pt-4">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={calorieData} barGap={4}>
                                    <Bar dataKey="consumed" radius={[4, 4, 0, 0]}>
                                        {calorieData.map((entry, index) => (
                                             <Cell key={`cell-${index}`} fill={index === 3 ? '#FFB46E' : '#FFD9B3'} />
                                        ))}
                                    </Bar>
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#D1D5DB', fontWeight: 'bold' }} dy={10} />
                                    <Tooltip content={<CustomTooltip />} />
                                </BarChart>
                             </ResponsiveContainer>
                        </div>
                        <div className="mt-4 p-4 bg-[#FDF7ED] rounded-2xl border border-[#FADCC0]/30 shadow-sm relative overflow-hidden">
                           <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Consumed</p>
                           <p className="text-sm font-black text-gray-900 leading-none">1,755 <span className="text-[10px] opacity-40">kcal</span></p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-bold text-gray-900">Sleep Statistics</h3>
                            <button className="bg-[#a4d9bc]/20 text-[#214a32] px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                                Last 5 Days <ChevronDown size={10} />
                            </button>
                        </div>
                        
                        <div className="flex justify-between items-end h-[160px] gap-2">
                            {sleepData.map((d, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                                    <div className="flex-1 w-4 sm:w-6 flex flex-col-reverse rounded-full overflow-hidden bg-gray-50 border border-gray-100">
                                        <div style={{ height: `${(d.deep / 10) * 100}%` }} className="bg-[#214a32]"></div>
                                        <div style={{ height: `${(d.light / 10) * 100}%` }} className="bg-[#989a69]"></div>
                                        <div style={{ height: `${(d.rem / 10) * 100}%` }} className="bg-[#a4d9bc]"></div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[8px] font-black text-gray-900 uppercase">{d.total}</p>
                                        <p className="text-[8px] font-bold text-gray-300 uppercase tracking-widest mt-0.5">{d.day}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-sm font-bold text-gray-900">Hydration</h3>
                            <button className="bg-[#a4d9bc]/20 text-[#214a32] px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                                This Week <ChevronDown size={10} />
                            </button>
                        </div>

                        <div className="h-[120px] w-full">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={hydrationData}>
                                    <Bar dataKey="val" radius={[3, 3, 3, 3]}>
                                        {hydrationData.map((entry, index) => (
                                             <Cell key={`cell-${index}`} fill={index === 2 || index === 4 || index === 6 ? '#a4d9bc' : '#EEEEEE'} />
                                        ))}
                                    </Bar>
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#D1D5DB', fontWeight: 'bold' }} dy={10} />
                                </BarChart>
                             </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 px-4 py-8 border-t border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                <div>Copyright © 2024 Peterdraw</div>
                <div className="flex gap-8">
                    <span className="hover:text-gray-900 cursor-pointer">Privacy Policy</span>
                    <span className="hover:text-gray-900 cursor-pointer">Term and conditions</span>
                    <span className="hover:text-gray-900 cursor-pointer">Contact</span>
                </div>
            </footer>
        </div>
    );
}

function AnatomyLabel({ label, value, position, side }) {
    return (
        <div 
            className="absolute z-10 flex flex-col group transition-all"
            style={{ ...position, alignItems: side === 'right' ? 'flex-end' : 'flex-start' }}
        >
            <div className={`flex items-center gap-3 ${side === 'right' ? '' : 'flex-row-reverse'}`}>
                 <div className={`text-right ${side === 'right' ? 'text-right' : 'text-left'}`}>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em] leading-tight mb-0.5">{label}</p>
                    <p className="text-sm font-black text-gray-900 leading-tight">{value}</p>
                </div>
                <div className="w-12 h-[1px] bg-gray-200 group-hover:bg-orange-400 hidden sm:block"></div>
            </div>
        </div>
    );
}

function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 backdrop-blur-md p-3 border border-gray-100 rounded-xl shadow-xl">
                <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{`${payload[0].value} units`}</p>
            </div>
        );
    }
    return null;
}
