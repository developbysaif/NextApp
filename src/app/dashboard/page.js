"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Activity, 
    Droplets, 
    Moon, 
    Zap, 
    TrendingDown, 
    CheckCircle2, 
    ChevronRight,
    Utensils,
    Dumbbell,
    Flame,
    Target,
    Clock
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function HealthDashboard() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-12 w-48 bg-white rounded-xl" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-white rounded-3xl" />)}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 h-80 bg-white rounded-3xl" />
                    <div className="h-80 bg-white rounded-3xl" />
                </div>
            </div>
        );
    }

    const metrics = [
        { name: 'Current Weight', value: '78', unit: 'kg', target: '65', icon: TrendingDown, color: 'text-rose-500', bg: 'bg-rose-50', progress: 13/20 * 100 },
        { name: 'Steps Taken', value: '8,050', unit: 'steps', target: '10,000', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-50', progress: 80.5 },
        { name: 'Sleep Quality', value: '6.5', unit: 'hours', target: '8.0', icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50', progress: 81.25 },
        { name: 'Water Intake', value: '1.3', unit: 'L', target: '2.0', icon: Droplets, color: 'text-sky-500', bg: 'bg-sky-50', progress: 65 },
    ];

    const mealSuggestions = [
        { name: 'Grilled Chicken Salad', calories: 350, time: '20 min', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop' },
        { name: 'Quinoa Bowl with Tofu', calories: 420, time: '15 min', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&h=100&fit=crop' },
    ];

    return (
        <div className="space-y-8 pb-10">
            {/* Header Greeting */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 font-outfit uppercase tracking-tight">
                        Hello, {user?.name || 'Adam'}! 🥰
                    </h1>
                    <p className="text-gray-500 font-medium">Here's what's happening with your health today.</p>
                </div>
                <div className="bg-white px-6 py-2 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                    <div className="size-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-widest text-gray-600">Syncing Data...</span>
                </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-100 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`${metric.bg} ${metric.color} p-3 rounded-2xl`}>
                                <metric.icon size={24} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Target: {metric.target}{metric.unit}</span>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-baseline gap-1">
                                <h3 className="text-3xl font-black font-outfit">{metric.value}</h3>
                                <span className="text-sm font-bold text-gray-400">{metric.unit}</span>
                            </div>
                            <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">{metric.name}</p>
                        </div>
                        <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${metric.progress}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`absolute inset-y-0 left-0 rounded-full ${metric.bg.replace('bg-', 'bg-').replace('-50', '-500')} ${metric.color.replace('text-', 'bg-')}`}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calories Analysis */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black font-outfit uppercase tracking-tight">Calories Intake</h3>
                                <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                                    <Flame size={20} />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-4">
                                    <div className="text-center md:text-left">
                                        <div className="flex items-baseline justify-center md:justify-start gap-1">
                                            <span className="text-4xl font-black font-outfit">1,750</span>
                                            <span className="text-sm font-bold text-gray-400 uppercase">kcal</span>
                                        </div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Eaten Today</p>
                                    </div>
                                    <div className="text-center md:text-left">
                                        <div className="flex items-baseline justify-center md:justify-start gap-1">
                                            <span className="text-4xl font-black font-outfit">510</span>
                                            <span className="text-sm font-bold text-gray-400 uppercase">kcal</span>
                                        </div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Burned (Lost)</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center justify-center relative py-10">
                                    <svg className="w-40 h-40 transform -rotate-90">
                                        <circle
                                            cx="80" cy="80" r="70"
                                            className="stroke-gray-100" strokeWidth="12" fill="transparent"
                                        />
                                        <motion.circle
                                            cx="80" cy="80" r="70"
                                            className="stroke-orange-500" strokeWidth="12" fill="transparent"
                                            strokeDasharray={440}
                                            initial={{ strokeDashoffset: 440 }}
                                            animate={{ strokeDashoffset: 440 * (1 - 1750/2200) }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-black font-outfit">450</span>
                                        <span className="text-[10px] font-black text-gray-400 uppercase">Left</span>
                                    </div>
                                </div>

                                <div className="space-y-6 self-center">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span>Protein</span>
                                            <span className="text-emerald-600">120g / 93%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full w-[93%] bg-emerald-500 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span>Carbs</span>
                                            <span className="text-amber-600">37%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full w-[37%] bg-amber-500 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span>Fats</span>
                                            <span className="text-rose-600">45%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full w-[45%] bg-rose-500 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Workout Progress */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                                    <Activity size={20} />
                                </div>
                                <h4 className="text-md font-black font-outfit uppercase tracking-tight">Workout Status</h4>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                                            <Target size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest">Running</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">10km Track</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-emerald-600">75%</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full w-3/4 bg-emerald-500 rounded-full" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                                    <Dumbbell size={20} />
                                </div>
                                <h4 className="text-md font-black font-outfit uppercase tracking-tight">Strength Goal</h4>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                                            <Target size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest">Squats</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">50kg Max</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-indigo-600">60%</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full w-[60%] bg-indigo-600 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    {/* Recommended Menu */}
                    <div className="bg-[#2E7D32] p-8 rounded-[2.5rem] shadow-lg shadow-green-900/10 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 transform translate-x-4 -translate-y-4 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                            <Utensils size={120} strokeWidth={1} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-black font-outfit uppercase tracking-tight mb-6">Recommended Menu</h3>
                            <div className="space-y-4">
                                {mealSuggestions.map((meal, idx) => (
                                    <motion.div 
                                        key={idx}
                                        whileHover={{ x: 5 }}
                                        className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 border border-white/10 cursor-pointer"
                                    >
                                        <img src={meal.image} alt={meal.name} className="size-12 rounded-xl object-cover shrink-0" />
                                        <div className="flex-1 overflow-hidden">
                                            <h4 className="text-sm font-black truncate">{meal.name}</h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-[10px] font-bold text-white/60 flex items-center gap-1"><Flame size={10} /> {meal.calories} kcal</span>
                                                <span className="text-[10px] font-bold text-white/60 flex items-center gap-1"><Clock size={10} /> {meal.time}</span>
                                            </div>
                                        </div>
                                        <ChevronRight size={16} className="text-white/40" />
                                    </motion.div>
                                ))}
                            </div>
                            <Link href="/dashboard/menu" className="mt-6 flex items-center justify-center gap-2 w-full py-4 bg-white text-green-800 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-50 transition-colors">
                                View Full Menu
                            </Link>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                        <h3 className="text-xl font-black font-outfit uppercase tracking-tight mb-6">Activity Feed</h3>
                        <div className="space-y-6">
                            {[1, 2, 3].map((_, idx) => (
                                <div key={idx} className="flex gap-4 group cursor-pointer">
                                    <div className="relative">
                                        <div className="size-10 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-[#2E7D32] group-hover:text-white transition-all">
                                            <CheckCircle2 size={18} />
                                        </div>
                                        {idx !== 2 && <div className="absolute top-10 left-1/2 w-px h-8 bg-gray-100 -translate-x-1/2" />}
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-gray-900">Morning Yoga Complete</p>
                                        <p className="text-[10px] font-bold text-gray-400 mt-1">30 min • Today, 7:00 AM</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
