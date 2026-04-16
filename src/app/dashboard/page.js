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
        { name: 'Steps Taken', value: '8,050', unit: 'steps', target: '10,000', icon: Activity, color: 'text-[#214a32]', bg: 'bg-[#a4d9bc]', progress: 80.5 },
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
                {/* Calories & Disease Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black font-outfit uppercase tracking-tight text-gray-900">Health Intake</h3>
                                <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                                    <Flame size={20} />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-4">
                                    <div className="text-center md:text-left">
                                        <div className="flex items-baseline justify-center md:justify-start gap-1">
                                            <span className="text-4xl font-black font-outfit text-gray-900">1,750</span>
                                            <span className="text-sm font-bold text-gray-400 uppercase">kcal</span>
                                        </div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Today's Intake</p>
                                    </div>
                                    <div className="text-center md:text-left pt-4 border-t border-gray-50">
                                        <div className="flex items-center gap-3 justify-center md:justify-start">
                                            <div className="size-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                                <Target size={16} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-gray-900">85%</p>
                                                <p className="text-[9px] font-bold text-gray-400 uppercase">Compliance</p>
                                            </div>
                                        </div>
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
                                            className="stroke-[#214a32]" strokeWidth="12" fill="transparent"
                                            strokeDasharray={440}
                                            initial={{ strokeDashoffset: 440 }}
                                            animate={{ strokeDashoffset: 440 * (1 - 1750/2200) }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-black font-outfit text-gray-900">450</span>
                                        <span className="text-[10px] font-black text-gray-400 uppercase italic">Left</span>
                                    </div>
                                </div>

                                <div className="space-y-6 self-center">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span className="text-gray-400">Protein</span>
                                            <span className="text-[#214a32]">120g / 93%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full w-[93%] bg-[#214a32] rounded-full" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span className="text-gray-400">Carbs</span>
                                            <span className="text-amber-600">37%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full w-[37%] bg-amber-500 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span className="text-gray-400">Fats</span>
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

                    {/* Today's Diet Plan */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black font-outfit uppercase tracking-tight text-gray-900">Today's Diet Plan</h3>
                            <Link href="/dashboard/diet-plan" className="text-[10px] font-black text-[#214a32] uppercase tracking-widest hover:underline">Full Plan</Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { name: 'Breakfast', menu: 'Oats & Berries', icon: '🌅', color: 'bg-amber-50 text-amber-600' },
                                { name: 'Lunch', menu: 'Grilled Fish', icon: '☀️', color: 'bg-orange-50 text-orange-600' },
                                { name: 'Dinner', menu: 'Leafy Salad', icon: '🌙', color: 'bg-indigo-50 text-indigo-600' },
                            ].map((meal, idx) => (
                                <div key={idx} className={`${meal.color} p-5 rounded-3xl border border-transparent hover:border-current/10 transition-all`}>
                                    <span className="text-2xl mb-2 block">{meal.icon}</span>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">{meal.name}</p>
                                    <p className="text-xs font-black mt-1">{meal.menu}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    {/* Disease Info Card */}
                    <div className="bg-[#214a32] p-8 rounded-[2.5rem] shadow-lg shadow-green-900/10 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 transform translate-x-4 -translate-y-4 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                            <Activity size={120} strokeWidth={1} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-4 text-[#a4d9bc]">Active Monitoring</h3>
                            <h2 className="text-2xl font-black font-outfit mb-2">Diabetes Control</h2>
                            <p className="text-xs text-[#a4d9bc] font-bold leading-relaxed mb-6">Monitoring blood sugar levels and insulin sensitivity through clinical diet.</p>
                            
                            <div className="space-y-3">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Primary Symptoms</p>
                                <div className="flex flex-wrap gap-2">
                                    {['Fatigue', 'Thirst', 'Blurred Vision'].map(s => (
                                        <span key={s} className="bg-white/10 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity Feed */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <h3 className="text-xl font-black font-outfit uppercase tracking-tight mb-6 text-gray-900">Activity Feed</h3>
                        <div className="space-y-6">
                            {[
                                { title: 'Diet Logged', time: '10:00 AM', icon: Utensils, color: 'text-emerald-500' },
                                { title: 'Weight Synced', time: '08:30 AM', icon: Activity, color: 'text-blue-500' },
                                { title: 'Water Goal Met', time: 'Yesterday', icon: Droplets, color: 'text-sky-500' }
                            ].map((act, idx) => (
                                <div key={idx} className="flex gap-4 group">
                                    <div className="size-10 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-[#214a32] group-hover:text-white transition-all text-gray-400">
                                        <act.icon size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-gray-900">{act.title}</p>
                                        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase italic">{act.time}</p>
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
