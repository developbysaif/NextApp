"use client"

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Utensils, Sunrise, Sun, Sunset, Moon, Leaf, Flame, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserDietPlan() {
    const { user } = useAuth();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, this would fetch the specific plan assigned to user.dietPlan
        // For simulation, we show a default plan based on their disease or placeholder
        const timer = setTimeout(() => {
            setPlan({
                name: "Clinical Recovery Diet",
                calories: 1850,
                meals: {
                    breakfast: "Greek Yogurt with Berries & Nuts",
                    lunch: "Grilled Chicken Breast with Steamed Broccoli",
                    dinner: "Salmon with Quinoa and Sautéed Spinach",
                    snacks: "Apple Slices with Almond Butter"
                }
            });
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, [user]);

    if (loading) return <div className="p-20 text-center text-gray-400 font-bold uppercase tracking-widest animate-pulse">Designing your meal plan...</div>

    return (
        <div className="max-w-6xl mx-auto space-y-10 pb-20">
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Daily Nutrition Plan</h1>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Based on your condition: <span className="text-[#214a32]">Diabetes Control</span></p>
                </div>
                <div className="bg-[#214a32] text-white px-8 py-3 rounded-2xl flex items-center gap-3 shadow-xl shadow-[#214a32]/20">
                    <Flame size={20} className="text-[#a4d9bc]" />
                    <div className="flex flex-col leading-none">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Daily Target</span>
                        <span className="text-xl font-black">{plan.calories} kcal</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10">
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Breakfast */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-6 text-amber-500/10 group-hover:rotate-12 transition-transform">
                               <Sunrise size={80} strokeWidth={1} />
                           </div>
                           <div className="relative z-10">
                                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2 block">Breakfast</span>
                                <h3 className="text-lg font-black text-gray-900 mb-6">{plan.meals.breakfast}</h3>
                                <button className="text-[9px] font-black uppercase tracking-widest bg-gray-50 text-gray-400 px-4 py-2 rounded-lg hover:bg-[#214a32] hover:text-white transition-all">Mark as Completed</button>
                           </div>
                        </motion.div>

                        {/* Lunch */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-6 text-orange-500/10 group-hover:rotate-12 transition-transform">
                               <Sun size={80} strokeWidth={1} />
                           </div>
                           <div className="relative z-10">
                                <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-2 block">Lunch</span>
                                <h3 className="text-lg font-black text-gray-900 mb-6">{plan.meals.lunch}</h3>
                                <button className="text-[9px] font-black uppercase tracking-widest bg-gray-50 text-gray-400 px-4 py-2 rounded-lg hover:bg-[#214a32] hover:text-white transition-all">Mark as Completed</button>
                           </div>
                        </motion.div>

                        {/* Dinner */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-6 text-rose-500/10 group-hover:rotate-12 transition-transform">
                               <Sunset size={80} strokeWidth={1} />
                           </div>
                           <div className="relative z-10">
                                <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-2 block">Dinner</span>
                                <h3 className="text-lg font-black text-gray-900 mb-6">{plan.meals.dinner}</h3>
                                <button className="text-[9px] font-black uppercase tracking-widest bg-gray-50 text-gray-400 px-4 py-2 rounded-lg hover:bg-[#214a32] hover:text-white transition-all">Mark as Completed</button>
                           </div>
                        </motion.div>

                        {/* Snacks */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-6 text-indigo-500/10 group-hover:rotate-12 transition-transform">
                               <Moon size={80} strokeWidth={1} />
                           </div>
                           <div className="relative z-10">
                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2 block">Snacks</span>
                                <h3 className="text-lg font-black text-gray-900 mb-6">{plan.meals.snacks}</h3>
                                <button className="text-[9px] font-black uppercase tracking-widest bg-gray-50 text-gray-400 px-4 py-2 rounded-lg hover:bg-[#214a32] hover:text-white transition-all">Mark as Completed</button>
                           </div>
                        </motion.div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#F3F7F2] p-8 rounded-[2rem] border border-[#DCE8DB] relative overflow-hidden">
                        <div className="absolute top-0 right-0 size-24 bg-[#DCE8DB] rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#214a32] mb-6">Expert Tips</h4>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <Activity className="text-[#214a32] shrink-0" size={20} />
                                <p className="text-xs font-bold text-[#124126] leading-relaxed">Wait 30 mins after your snack before light walking to maintain glucose levels.</p>
                            </div>
                            <div className="flex gap-4">
                                <Leaf className="text-[#214a32] shrink-0" size={20} />
                                <p className="text-xs font-bold text-[#124126] leading-relaxed">Eat smaller, more frequent meals. Avoid sugary beverages.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
